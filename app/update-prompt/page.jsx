"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Form from "@components/Form";
import { useSession } from "next-auth/react";

const EditPrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();
  // Since we are updating a prompt belonging to a user we can
  // use the useSearchParams from the next to get the id of the user from the url
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  // We need a state to keep track of wheter we are usbmitting the form or not.
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // console.log("Hello. Edit me there");
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();

      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };
    // if the promptId is truthy then we invoke the function.
    if (promptId) getPromptDetails();
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault(); //no reload
    // if (!session) {
    //   post.prompt = "";
    //   post.tag = "";
    //   alert("Please sign in first!!");
    //   return;
    // }
    setSubmitting(true); //loader

    if (!promptId) return alert("Prompt Id not found");

    try {
      // We will passing the data that we have in the front-end to the following route using the post request
      // On this particual route we have defined the route handler and we will
      // pass the request body containing the new prompt and the tag
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default EditPrompt;
