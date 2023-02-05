const { Configuration, OpenAIApi } = require('openai');
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generatePrompt = (person, gender) => {
  return `Suggest 5 pickup lines for ${person} ${gender}`;
}

const generateLines = async (req, res) => {
  const { prompt } = req.body;
  const { gender } = req.params;
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(prompt, gender),
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });

    res.status(200).json({
      success: true,
      data: completion.data.choices[0].text,
    });

  } catch (error) {
    console.log("error - ", error);
    res.status(400).json({
      success: false,
      error: 'The text could not be generated',
    });
  }
};



module.exports = { generateLines };
