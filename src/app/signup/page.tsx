import SignupForm from "@/components/SignupForm";

const SignupPage = () => {
  return (
    <main className="h-screen w-full flex flex-col">
      <div className="w-full mx-auto flex justify-center items-center flex-1 px-4">
        <SignupForm />
      </div>
    </main>
  );
};

export default SignupPage;
