import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request) => {
  try {
    await connectToDB();
    const prompts = await Prompt.find({}).populate("creator");
    const data = JSON.stringify(prompts);
    // console.log(data);
    return new Response(JSON.stringify(prompts), {
      status: 200,
      headers: {
        "Cache-Control": "no-cache, no-store, max-age=0, must-revalidate",
      },
    });
  } catch (error) {
    return new Response("Failed to fetch prompts", {
      status: 500,
    });
  }
};
