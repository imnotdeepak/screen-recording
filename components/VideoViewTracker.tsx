"use client";

import { useEffect, useRef } from "react";
import { incrementVideoViews } from "@/lib/actions/video";

interface VideoViewTrackerProps {
  videoId: string;
  children: React.ReactNode;
}

const VideoViewTracker = ({ videoId, children }: VideoViewTrackerProps) => {
  const hasIncremented = useRef(false);

  useEffect(() => {
    // Only increment once per component instance
    if (!hasIncremented.current) {
      hasIncremented.current = true;
      incrementVideoViews(videoId);
    }
  }, [videoId]);

  return <>{children}</>;
};

export default VideoViewTracker;
