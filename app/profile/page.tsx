"use client";

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { supabase } from '@/lib/supabase';

export default function ProfilePage() {
  const [artworks, setArtworks] = useState([
    {
      id: 1,
      imageUrl: 'https://source.unsplash.com/random/800x600?art=1',
      title: 'My First Creation',
      date: '2024-02-20',
    },
    {
      id: 2,
      imageUrl: 'https://source.unsplash.com/random/800x600?art=2',
      title: 'Abstract Dreams',
      date: '2024-02-19',
    },
  ]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card className="p-8">
        <div className="flex items-center space-x-4">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-4xl">🎨</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold">Your Profile</h1>
            <p className="text-muted-foreground">Member since February 2024</p>
          </div>
        </div>
      </Card>

      <Tabs defaultValue="gallery" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="gallery">My Gallery</TabsTrigger>
          <TabsTrigger value="stats">Stats</TabsTrigger>
        </TabsList>
        
        <TabsContent value="gallery">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {artworks.map((artwork) => (
              <Card key={artwork.id} className="overflow-hidden">
                <AspectRatio ratio={4/3}>
                  <img
                    src={artwork.imageUrl}
                    alt={artwork.title}
                    className="object-cover w-full h-full transition-transform hover:scale-105"
                  />
                </AspectRatio>
                <div className="p-4">
                  <h3 className="font-semibold">{artwork.title}</h3>
                  <p className="text-sm text-muted-foreground">{artwork.date}</p>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="stats">
          <Card className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <h3 className="text-3xl font-bold">12</h3>
                <p className="text-muted-foreground">Artworks Created</p>
              </div>
              <div className="text-center">
                <h3 className="text-3xl font-bold">45</h3>
                <p className="text-muted-foreground">Gallery Views</p>
              </div>
              <div className="text-center">
                <h3 className="text-3xl font-bold">8</h3>
                <p className="text-muted-foreground">Favorites</p>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}