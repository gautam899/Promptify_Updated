import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

//get(read)
export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const prompt = await Prompt.findById(params.id).populate("creator");

    // if the prompt does not exist then we can return a new Response saying that
    // the promp is not found.
    if (!prompt) {
      return new Response("Prompt not found", { status: 404 });
    }
    return new Response(JSON.stringify(prompt), {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to fetch prompts", {
      status: 500,
    });
  }
};

//patch(update)
export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();
  try {
    await connectToDB(); //connect o the db
    const existingPrompt = await Prompt.findById(params.id); //find the prompt by id

    // if prompt not found
    if (!existingPrompt) {
      return new Response("Prompt not found", { status: 404 });
    }
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();
    return new Response(JSON.stringify(prompt), {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to update prompt", { status: 500 });
  }
};
//delete(delete)

export const DELETE = async (request, { params }) => {
  console.log("DELETE request received for ID:", params.id); // Log the ID

  try {
    await connectToDB(); //connect to the db
    await Prompt.findByIdAndDelete(params.id);

    return new Response("Prompt deleted successfully", { status: 200 });
    // const result = await Prompt.findByIdAndRemove(new ObjectId(params.id));

    // if (!result) {
    //   return new Response("Prompt not found", { status: 404 });
    // }

    // return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting prompt:", error);
    // return new Response("Prompt could not be delete", { status: 500 });
    return new Response(`Prompt could not be deleted: ${error.message}`, {
      status: 500,
    });
  }
};
