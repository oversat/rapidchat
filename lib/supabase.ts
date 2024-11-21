import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function saveImageToGallery(userId: string, imageUrl: string, prompt: string, style: string, subject: string, mood: string) {
  console.log('Saving image to gallery:', { userId, imageUrl, prompt, style, subject, mood });
  const { error } = await supabase
    .from('artworks')
    .insert([
      {
        user_id: userId,
        image_url: imageUrl,
        prompt: prompt,
        style: style,
        subject: subject,
        mood: mood,
      },
    ]);

  if (error) {
    console.error('Error saving image to gallery:', error);
    throw error;
  }
  console.log('Image saved successfully');
}