
import React from 'react';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";

interface VideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  aspectRatio?: number;
  className?: string;
}

const Video = React.forwardRef<HTMLVideoElement, VideoProps>(
  ({ src, aspectRatio = 16 / 9, className, ...props }, ref) => {
    return (
      <AspectRatio ratio={aspectRatio} className={className}>
        <video
          ref={ref}
          src={src}
          className={cn("w-full h-full object-cover rounded-lg", className)}
          {...props}
        />
      </AspectRatio>
    );
  }
);

Video.displayName = "Video";

export { Video };
