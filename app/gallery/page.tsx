import { Card } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';

// This would normally come from your database
const mockArtworks = [
  {
    id: 1,
    imageUrl: 'https://source.unsplash.com/random/800x600?art=1',
    title: 'Dreamy Landscape',
    creator: 'Artist1',
  },
  {
    id: 2,
    imageUrl: 'https://source.unsplash.com/random/800x600?art=2',
    title: 'Abstract Thoughts',
    creator: 'Artist2',
  },
  // Add more mock data as needed
];

export default function GalleryPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Community Gallery</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockArtworks.map((artwork) => (
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
              <p className="text-sm text-muted-foreground">by {artwork.creator}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}