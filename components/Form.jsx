import React from "react";
import Link from "next/link";
const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col mb-10">
      <h1 className="head_text text-left">
        <span className="blue_gradient ">{type}</span> Post
      </h1>
      <p className="desc text-left max-w-md dark:text-gray-100">
        {type} and share amazing prompts with the world, let your imagination
        run wild with any AI-powered platform
      </p>
      <form
        action=""
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism bg-blue-100"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your AI prompt
          </span>
          <textarea
            value={post.prompt}
            required
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder="Write your prompt here"
            className="form_textarea"
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag {` `}
            <span className="font-normal dark:text-gray-900">
              (#product, #webdevelopment, #idea)
            </span>
          </span>
          <input
            value={post.tag}
            required
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            placeholder="#tag"
            className="form_input"
          />
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
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white font-semibold tracking-wider"
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
