"use client";

import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import { DumbbellIcon, HomeIcon, UserIcon, ZapIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

const Navbar = () => {
  const { isSignedIn } = useUser();

  return (
    <div className="fixed top-0 w-full rounded-2xl z-50 bg-zinc-900 border-b border-zinc-800 shadow-lg">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        {/* LOGO */}
        <Link href="/" className="flex items-center">
          <DumbbellIcon className="w-6 h-6 mr-2 text-red-500" />
          <div className="flex flex-col">
            <div className="flex items-center">
              <span className="text-xl font-bold bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                Muscle AI
              </span>
              <span className="ml-2 px-1.5 py-0.5 text-xs font-bold text-zinc-900 bg-gradient-to-r from-red-400 to-red-500 rounded-md">
                BETA
              </span>
            </div>
            <span className="text-xs text-zinc-400">in its power</span>
          </div>
        </Link>

        {/* NAVIGATION */}
        <div className="flex items-center space-x-1 md:space-x-4">
          {isSignedIn ? (
            <>
              <Link href="/">
                <Button variant="ghost" className="flex items-center gap-1 hover:text-red-500 hover:bg-zinc-800">
                  <HomeIcon className="w-4 h-4" />
                  <span className="hidden md:inline">Home</span>
                </Button>
              </Link>
              <Link href="/generate">
                <Button variant="ghost" className="flex items-center gap-1 hover:text-red-500 hover:bg-zinc-800">
                  <ZapIcon className="w-4 h-4" />
                  <span className="hidden md:inline">Generate</span>
                </Button>
              </Link>
              <Link href="/profile">
                <Button variant="ghost" className="flex items-center gap-1 hover:text-red-500 hover:bg-zinc-800">
                  <UserIcon className="w-4 h-4" />
                  <span className="hidden md:inline">Profile</span>
                </Button>
              </Link>
              <Button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white border-none">
                Get Started
              </Button>
              <UserButton afterSignOutUrl="/" />
            </>
          ) : (
            <>
              <SignInButton mode="modal">
                <Button variant="ghost" className="hover:text-red-500 hover:bg-zinc-800">
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white border-none">
                  Sign Up
                </Button>
              </SignUpButton>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;