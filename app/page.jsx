import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        A Community for
        <br className="max-md:hidden" />
        <span className="blue_gradient text-center"> AI Prompts</span>
        <span className=""> Creation and</span>
        <span className="text-slate-100 blue_gradient"> sharing</span>
      </h1>
      <p className="desc text-center dark:text-gray-100">
        Promptify is an open-source AI prompting tool for modern tool for world
        to discover, create and share creative prompts
      </p>
      {/* Feed compoents */}
      <Feed />
    </section>
  );
};

export default Home;
