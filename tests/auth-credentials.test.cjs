const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const path = require("node:path");
const { test } = require("node:test");
const vm = require("node:vm");
const ts = require("typescript");

// Compile the existing TypeScript modules without adding a test dependency.
function loadModule(relativePath, dependencies = {}) {
  const filename = path.resolve(__dirname, "..", relativePath);
  const { outputText } = ts.transpileModule(readFileSync(filename, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true,
    },
  });
  const module = { exports: {} };
  vm.runInNewContext(outputText, {
    module,
    exports: module.exports,
    require: (name) => dependencies[name] || require(name),
  }, { filename });
  return module.exports;
}

const User = loadModule("src/database/models/User.ts").default;
const { hashPassword } = loadModule("src/database/auth/index.ts");
const { authOptions } = loadModule("src/app/api/auth/[...nextauth]/route.ts", {
  "@/database/connection": async () => {},
  "@/database/models/User": User,
});
const authorize = authOptions.providers[0].options.authorize;

async function setUpUser(t, password) {
  const user = new User({
    firstName: "Test",
    lastName: "Client",
    email: "client@example.com",
    password: await hashPassword(password),
  });
  t.mock.method(User, "findOne", async ({ email }) => {
    return email === user.email ? user : null;
  });
  return user;
}

for (const [description, password] of [
  ["without surrounding whitespace", "password123"],
  ["with a leading space", " password123"],
  ["with a trailing space", "password123 "],
  ["with surrounding whitespace", "\t password123 \t"],
]) {
  test(`authenticates the exact password stored at signup ${description}`, async (t) => {
    const user = await setUpUser(t, password);
    const result = await authorize({ email: user.email, password });
    assert.equal(result.id, user._id.toString());
    assert.equal(result.email, user.email);
    assert.equal(result.role, "client");
  });
}

test("still trims surrounding whitespace from the email", async (t) => {
  const user = await setUpUser(t, "password123");
  const result = await authorize({
    email: ` ${user.email} `,
    password: "password123",
  });
  assert.equal(result.email, user.email);
});

test("rejects a password with whitespace removed", async (t) => {
  const user = await setUpUser(t, " password123 ");
  await assert.rejects(
    authorize({ email: user.email, password: "password123" }),
    /Invalid Credentials!/
  );
});

test("still rejects an incorrect password", async (t) => {
  const user = await setUpUser(t, "password123");
  await assert.rejects(
    authorize({ email: user.email, password: "wrong-password" }),
    /Invalid Credentials!/
  );
});
