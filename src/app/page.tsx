import LoginForm from "@/components/LoginForm";
import WavesSvg from "@/components/WavesSvg";

export default function Home() {
  return (
    <main className="h-screen w-full flex flex-col bg-sky-300">
      <div className="w-full mx-auto flex justify-center items-center flex-1 px-4">
        <WavesSvg />
        <LoginForm />
      </div>
    </main>
  );
}
