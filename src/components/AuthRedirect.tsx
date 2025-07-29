"use client";

import { useAuth } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const AuthRedirect = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      const redirectUrl = searchParams.get("redirect_url") || "/generate";
      router.replace(redirectUrl);
    }
  }, [isLoaded, isSignedIn, router, searchParams]);

  return null;
};

export default AuthRedirect; 