"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Palette, Image, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Navigation() {
  const pathname = usePathname();
  
  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Palette className="w-6 h-6" />
            <span className="font-bold text-xl">AI Art Game</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link href="/create">
              <Button
                variant="ghost"
                className={cn(
                  "flex items-center space-x-2",
                  pathname === "/create" && "bg-accent"
                )}
              >
                <Palette className="w-4 h-4" />
                <span>Create</span>
              </Button>
            </Link>
            
            <Link href="/gallery">
              <Button
                variant="ghost"
                className={cn(
                  "flex items-center space-x-2",
                  pathname === "/gallery" && "bg-accent"
                )}
              >
                <Image className="w-4 h-4" />
                <span>Gallery</span>
              </Button>
            </Link>
            
            <Link href="/profile">
              <Button
                variant="ghost"
                className={cn(
                  "flex items-center space-x-2",
                  pathname === "/profile" && "bg-accent"
                )}
              >
                <User className="w-4 h-4" />
                <span>Profile</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}