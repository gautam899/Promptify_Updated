"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const FeedbackBtn = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const handleClick = () => {
    //check if the user is logged in.
    if (session?.user) {
      router.push("/feedback");
    } else {
      alert("Please Sign In first to give Feedback");
    }
  };
  return (
    <button
      type="submit"
      className="text-white rounded-full bg-slate-900 py-3 px-6 absolute bottom-3 right-3 hover:bg-slate-800 z-10 hover:scale-[1.03]"
      onClick={handleClick}
    >
      Feedback
    </button>
  );
};

export default FeedbackBtn;
