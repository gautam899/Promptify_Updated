"use client";

// This page will render the other users profile page
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

const UserProfile = ({ params }) => {
  // params will have the id and the username

  //we need a state to store all the post of this respective
  //user
  const [userPosts, setUserPosts] = useState([]);
  const searchParams = useSearchParams();
  const username = searchParams.get("name");
  //useEffect to fetch the posts of the user
  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`/api/users/${params.id}/posts`);

      const data = await response.json();
      setUserPosts(data);

      setUserPosts(data);
    };

    if (params?.id) fetchPost();
  }, [params.id]);

  return (
    <Profile
      name={username}
      desc={`Welcome to ${username}'s peronalized profile page.
  Explore ${username}'s exceptional prompts and be inspired by the power of their imagination. `}
  data={userPosts}
    />
  );
};

export default UserProfile;
