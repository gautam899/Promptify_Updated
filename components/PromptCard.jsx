"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
const PromptCard = ({ post, handleEdit, handleDelete, handleTagClick }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [copied, setCopied] = useState("");
  // console.log(post);
  const handleCopy = () => {
    setCopied(post.prompt);
    // Copy to the clipboard using the navigator option.
    navigator.clipboard.writeText(post.prompt);
    // Reset the setCopied to empty string "" after 3 seconds of copying.
    setTimeout(() => setCopied(""), 3000);
  };

  const handleProfileClick = () => {
    // console.log(post);
    // Check if the post creators id is same as the id of session user. If yes then
    // navigate to the profile page of the user itself.

    if (post.creator._id === session?.user.id) {
      return router.push("/profile");
    }

    // but if that is not the case then naviage to the respective users profile.
    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };
  return (
    <div className="prompt_card hover:scale-y-[1.03]">
      <div className="flex justify-between items-start gap-5">
        <div
          className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
          onClick={handleProfileClick}
        >
          <Image
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500 dark_text">
              {post.creator.email}
            </p>
          </div>
        </div>

        <div className="copy_btn" onClick={handleCopy}>
          {/* Display a small btn to copy the content. How the image will look will depend on whether the content is already copied or not. We need a state */}
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
            width={12}
            height={12}
          />
        </div>
      </div>

      <p className="my-5 font-satoshi text-sm text-gray-700 dark_text">
        {post.prompt}
      </p>

      <p
        className="font-inter text-sm cursor-pointer text-blue-95 font-semibold"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        #{post.tag}
      </p>
      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-400 pt-3">
          <p
            className="font-inter text-sm text-green-900 cursor-pointer font-semibold dark:text-blue-900"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm text-red-900 cursor-pointer font-semibold"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
