import SignupForm from "@/components/SignupForm";
import WavesSvg from "@/components/WavesSvg";

const SignupPage = () => {
  return (
    <main className="h-screen w-full flex flex-col bg-sky-300">
      <div className="w-full mx-auto flex justify-center items-center flex-1 px-4">
        <WavesSvg />
        <SignupForm />
      </div>
    </main>
  );
};

export default SignupPage;
