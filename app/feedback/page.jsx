"use client";
import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const FeedbackForm = () => {
  const { data: session } = useSession();
  const router = useRouter();
  // Create a handler function for submitting the form data
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.target);
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        alert("Something went wrong");
        throw new Error(`response status: ${response.status}`);
      }
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Response is not JSON");
      }
      const data = await response.json();
      // console.log(data["message"]);
      router.push("/");
      alert("Message sent succesfully");
      // Reset the form fields
      // e.target.reset();
    } catch (error) {
      console.log(error);
      alert("Please try to resubmit the form");
    }
  };
  return (
    <section className="w-full max-w-full flex-start flex-col mb-10">
      <h3 className="text-3xl text-white font-semibold text-left">
        We value your <span className="orange_gradient">feedback!!</span>
      </h3>
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-3xl flex flex-col gap-7 glassmorphism bg-blue-100"
      >
        <label className="">
          <span className="font-satoshi">Name</span>
          <input
            type="text"
            name="name"
            autoComplete="name"
            id="form-name"
            required
            placeholder="Enter your name here..."
            className="form_input"
          />
        </label>
        <label className="">
          <span className="font-satoshi">Email</span>
          <input
            id="form-email"
            type="Email"
            required
            name="email"
            autoComplete="email"
            placeholder="Enter your email here..."
            className="form_input"
          />
        </label>
        <label className="">
          <span className="font-satoshi">Subject</span>
          <input
            id="form-subject"
            name="subject"
            type="text"
            required
            placeholder="Enter your subject here..."
            className="form_input"
          />
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Share your Feedback
          </span>
          <textarea
            id="form-message"
            name="message"
            required
            maxLength="1000"
            placeholder="Write your feedback here"
            className="form_textarea"
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Found a bug?, Have an Idea?, Just want to say hi <br />
            Let us know!!
          </span>
        </label>
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link
            href="/"
            className="text-gray-800 text-sm font-semibold tracking-wider 
          "
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white font-semibold tracking-wider"
            disabled={!session?.user}
          >
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default FeedbackForm;
