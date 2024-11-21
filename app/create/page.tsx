"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { supabase, saveImageToGallery } from '@/lib/supabase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const subjects = [
  "landscape", "portrait", "abstract", "fantasy", "sci-fi",
  "nature", "urban", "space", "underwater", "surreal"
];

const styles = [
  "oil painting", "watercolor", "digital art", "pencil sketch",
  "3D render", "pixel art", "pop art", "minimalist", "impressionist",
  "cyberpunk"
];

const moods = [
  "peaceful", "energetic", "mysterious", "dreamy", "dark",
  "bright", "melancholic", "whimsical", "epic", "serene"
];

export default function CreatePage() {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");
  const [selectedMood, setSelectedMood] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const generatePrompt = () => {
    if (!selectedSubject || !selectedStyle || !selectedMood) {
      toast.error("Incomplete Selection: Please select one option from each category");
      return;
    }

    return `Create a ${selectedStyle} of a ${selectedSubject} with a ${selectedMood} atmosphere. Make it highly detailed and visually striking.`;
  };

  const handleGenerate = async () => {
    const prompt = generatePrompt();
    if (!prompt) return;

    setIsGenerating(true);
    console.log('Generating art with prompt:', prompt);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, type: 'image' }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate image');
      }

      const data = await response.json();
      setGeneratedImage(data.imageUrl);
      console.log('Generated image URL:', data.imageUrl);
      
      toast.success("Art Generated! Your unique artwork has been created.");

      try {
        const { data: userData } = await supabase.auth.getUser();
        if (!userData.user) {
          toast.error("Authentication Required: Please sign in to save artwork to your gallery");
          return;
        }

        await saveImageToGallery(
          userData.user.id,
          data.imageUrl,
          prompt,
          selectedStyle,
          selectedSubject,
          selectedMood
        );

        toast.success("Saved! Your artwork has been saved to your gallery");
      } catch (error) {
        console.error('Error saving to gallery:', error);
        toast.error("Save Failed: There was an error saving your artwork");
      }
    } catch (error) {
      console.error('Error generating art:', error);
      toast.error("Generation Failed: There was an error generating your artwork.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = async () => {
    try {
      console.log('Downloading image:', generatedImage);
      const response = await fetch(generatedImage!);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'artwork.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading image:', error);
      toast.error("Download Failed: There was an error downloading your artwork");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8" suppressHydrationWarning={true}>
      <ToastContainer />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-4">
          <h3 className="font-semibold mb-4">Subject</h3>
          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-2">
              {subjects.map((subject) => (
                <Button
                  key={subject}
                  variant={selectedSubject === subject ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => setSelectedSubject(subject)}
                >
                  {subject}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </Card>

        <Card className="p-4">
          <h3 className="font-semibold mb-4">Style</h3>
          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-2">
              {styles.map((style) => (
                <Button
                  key={style}
                  variant={selectedStyle === style ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => setSelectedStyle(style)}
                >
                  {style}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </Card>

        <Card className="p-4">
          <h3 className="font-semibold mb-4">Mood</h3>
          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-2">
              {moods.map((mood) => (
                <Button
                  key={mood}
                  variant={selectedMood === mood ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => setSelectedMood(mood)}
                >
                  {mood}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </Card>
      </div>

      <div className="flex justify-center">
        <Button
          size="lg"
          onClick={handleGenerate}
          disabled={isGenerating || !selectedSubject || !selectedStyle || !selectedMood}
        >
          {isGenerating ? "Generating..." : "Generate Art"}
        </Button>
      </div>

      {generatedImage && (
        <Card className="p-6">
          <div className="aspect-video relative">
            <img
              src={generatedImage}
              alt="Generated artwork"
              className="rounded-lg object-cover w-full h-full"
            />
          </div>
          <Separator className="my-4" />
          <div className="flex justify-end space-x-4">
            <Button variant="outline" onClick={handleDownload}>
              Download
            </Button>
            <Button onClick={handleGenerate}>
              Save to Gallery
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
