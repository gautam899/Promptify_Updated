"use client";
// To update and delete the prompt we need to have a state
import { useState, useEffect } from "react";
// To check whether the user is signed in or not.
import { useSession } from "next-auth/react";
//To navigate back to home.
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`, {
        headers: {
          "Cache-Control": "no-cache, no-store, max-age=0, must-revalidate",
        },
      });
      const data = await response.json();
      //   console.log(data);
      setPosts(data);
    };
    // call the function fetch post. This is will be called only on the starting of the app since there is only one dependency.
    if (session?.user.id) fetchPosts();
  }, [session?.user.id]);

  const handleEdit = (post) => {
    // We do not want to edit the post immidiatelly but rather we
    // want to send the user to a different page where they can edit in a proper enviornment
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete the prompt ?"
    );
    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });
        // Now the post has been deleted from the database but there are existing post. We also need to filter out the
        // deleted post from the existing post.
        const filteredPosts = posts.filter((p) => p._id !== post._id);
        // After getting the filtered post
        setPosts(filteredPosts);
      } catch (error) {
        console.error("Failed to delete the prompt:", error);
      }
    }
  };
  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
