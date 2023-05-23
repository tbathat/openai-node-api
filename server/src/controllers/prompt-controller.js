import InputPrompt from "../models/input-prompt";
import { configuration, textCompletion } from "../config/openai";

export async function sendText(req, res) {
  const openaiAPI = configuration();
  const inputModel = new InputPrompt(req.body);

  try {
    const response = await openaiAPI.createCompletion(
      textCompletion(inputModel)
    );
    return res.status(200).json({
      sucess: true,
      data: response.data.choices[0].text,
    });
  } catch (error) {
    return res.status(400).json({
      sucess: false,
      error: error.response ? error.response : "server error, try again!",
    });
  }
}
