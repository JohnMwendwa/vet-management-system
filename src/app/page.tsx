import LoginForm from "@/components/LoginForm";

export default function Home() {
  return (
    <main className="h-screen w-full flex flex-col">
      <div className="w-full mx-auto flex justify-center items-center flex-1 px-4">
        <LoginForm />
      </div>
    </main>
  );
}
