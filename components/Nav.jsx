"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useRouter } from "next/navigation";

const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggle, setToggle] = useState(false);
  const router = useRouter();
  useEffect(() => {
    (async () => {
      const response = await getProviders();
      setProviders(response);
    })();
  }, []);

  const handleSignOut = async () => {
    setToggle(false);
    await signOut();
    // console.log("Redirecting to home");
    router.push("/");
  };
  return (
    <nav className="flex-between w-full mb-16 py-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="logo"
          width={40}
          height={40}
          className="object-contain"
        />
        <p className="logo_text">
          Promt
          <span className="blue_gradient text-3xl">ify</span>
        </p>
      </Link>
      {/* {alert(session?.user)} */}
      {/* {alert(providers)} */}

      {/* Desktop size screen navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            {/* <ThemeToggle /> */}
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button
              type="button"
              className="outline_btn"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src={session?.user.image}
                width={45}
                height={45}
                className="rounded-full"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <div className="flex justify-between gap-5">
                  {/* <ThemeToggle /> */}
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className="black_btn"
                  >
                    SignIn
                  </button>
                </div>
              ))}
          </>
        )}
      </div>
      {/* Mobile screen naviagation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex ">
            <Image
              src={session?.user.image}
              alt="logo"
              width={40}
              height={40}
              className="object-contain rounded-full"
              onClick={() => setToggle((prev) => !prev)}
            />
            {/* <ThemeToggle /> */}
            {toggle && (
              <div className="dropdown">
                <Link
                  href="./profile"
                  className="dropdown_link"
                  onClick={() => setToggle(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="./create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggle(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <div className="flex gap-2">
                  {/* <ThemeToggle /> */}
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className="black_btn"
                  >
                    SignIn
                  </button>
                </div>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
