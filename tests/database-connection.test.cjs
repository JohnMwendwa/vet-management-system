const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const path = require("node:path");
const { test } = require("node:test");
const vm = require("node:vm");
const ts = require("typescript");

function loadConnection(t, nodeEnv, connect) {
  const filename = path.resolve(__dirname, "../src/database/connection.ts");
  const { outputText } = ts.transpileModule(readFileSync(filename, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true,
    },
  });
  const module = { exports: {} };
  const logs = [];
  const mongoose = { set: t.mock.fn(), connect: t.mock.fn(connect) };
  const exit = t.mock.fn(() => { throw new Error("process.exit was called"); });
  vm.runInNewContext(outputText, {
    module,
    exports: module.exports,
    require: () => mongoose,
    console: { log: (...args) => logs.push(args) },
    process: {
      env: {
        NODE_ENV: nodeEnv,
        LOCAL_URL: "mongodb://local/test",
        MONGO_URL: "mongodb://production/test",
      },
      exit,
    },
  }, { filename });
  return { connectDB: module.exports.default, mongoose, exit, logs };
}

for (const [environment, expectedUrl] of [
  ["development", "mongodb://local/test"],
  ["test", "mongodb://local/test"],
  ["production", "mongodb://production/test"],
]) {
  test(`connects to the configured database in ${environment}`, async (t) => {
    const { connectDB, mongoose, exit, logs } = loadConnection(
      t, environment, async () => ({ connection: { host: "test-host" } })
    );
    await connectDB();
    assert.equal(mongoose.connect.mock.calls[0].arguments[0], expectedUrl);
    assert.deepEqual(Array.from(mongoose.set.mock.calls[0].arguments), ["strictQuery", true]);
    assert.equal(logs[0][0], "connected to database - test-host");
    assert.equal(exit.mock.callCount(), 0);
  });
}

test("propagates a connection failure and allows a later retry", async (t) => {
  const failure = new Error("database is temporarily unavailable");
  let attempts = 0;
  const { connectDB, mongoose, exit } = loadConnection(t, "development", async () => {
    if (attempts++ === 0) throw failure;
    return { connection: { host: "recovered-host" } };
  });
  await assert.rejects(connectDB(), (error) => error === failure);
  assert.equal(exit.mock.callCount(), 0);
  await connectDB();
  assert.equal(mongoose.connect.mock.callCount(), 2);
});
