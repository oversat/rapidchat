import { Button } from '@/components/ui/button';
import { Palette } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-8">
      <div className="text-center space-y-4">
        <Palette className="w-24 h-24 mx-auto text-primary" />
        <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl">
          Create AI Art with Ease
        </h1>
        <p className="text-xl text-muted-foreground max-w-[600px] mx-auto">
          Generate stunning artwork using our intuitive button-based interface.
          No typing required - just click and create!
        </p>
      </div>
      
      <div className="flex gap-4">
        <Link href="/create">
          <Button size="lg" className="text-lg">
            Start Creating
          </Button>
        </Link>
        <Link href="/gallery">
          <Button size="lg" variant="outline" className="text-lg">
            View Gallery
          </Button>
        </Link>
      </div>
    </div>
  );
}