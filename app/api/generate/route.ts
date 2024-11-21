import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  console.log('Received POST request');

  try {
    const data: { prompt: string, type: string } = await req.json();
    console.log('Parsed request data:', JSON.stringify(data));

    // Validate input data
    if (!data.prompt || data.type !== 'image') {
      console.error('Invalid input data: Missing prompt or incorrect type');
      return NextResponse.json(
        { error: 'Invalid input data. Prompt and correct type are required.' },
        { status: 400 }
      );
    }

    // Sanitize input data
    const sanitizedData: VoiceCommandInput = {
      voiceCommand: data.prompt.trim(),
    };

    // Call OpenAI API
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: sanitizedData.voiceCommand,
    });

    console.log('Generated image URL:', response.data[0].url);

    return NextResponse.json({ imageUrl: response.data[0].url });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

interface VoiceCommandInput {
  voiceCommand: string; // Voice command issued by the user
}

interface VoiceChatOutput {
  response: string; // The AI's response to the user's command
  feedback: string; // Additional feedback for the user regarding the command
  isAvatarFlashing: boolean; // Indicates if the avatar should flash while speaking
}

// Function to generate a response from OpenAI's GPT-4o model
async function generateChatResponse(data: VoiceCommandInput): Promise<VoiceChatOutput> {
  console.log('Generating chat response with data:', JSON.stringify(data));

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o', // Updated to use GPT-4o model
      messages: [
        {
          role: 'user',
          content: data.voiceCommand,
        },
      ],
    });

    console.log('OpenAI API response:', JSON.stringify(response));

    // Construct output based on the API response and define feedback for user
    const output: VoiceChatOutput = {
      response: response.choices[0].message.content || "I'm sorry, I couldn't generate a response.",
      feedback: 'The AI has processed your command.',
      isAvatarFlashing: true, // Indicates the avatar should flash while speaking
    };

    return output;
  } catch (error) {
    console.error('Error in generateChatResponse:', error);
    throw new Error('Failed to get a response from OpenAI.');
  }
}
