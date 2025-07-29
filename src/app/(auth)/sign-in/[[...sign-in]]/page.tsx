"use client";
import { SignIn } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import AuthRedirect from "@/components/AuthRedirect";

const SignInPage = () => {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect_url") || "/generate";

  return (
    <main className="flex h-screen w-full items-center justify-center">
      <AuthRedirect />
      <SignIn redirectUrl={redirectUrl} />
    </main>
  );
};
export default SignInPage;
