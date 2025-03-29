import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return (
    <div className="flex justify-center items-center p-8">
      <SignIn />;
    </div>
  );
};

export default SignInPage;
