import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface WaveformProps {
  isRecording: boolean;
  audioData?: Uint8Array;
}

export function Waveform({ isRecording, audioData }: WaveformProps) {
  // Create a set of bars for visualization
  const bars = Array.from({ length: 15 }, (_, i) => {
    const initialHeight = Math.random() * 30 + 5;
    return {
      id: i,
      height: initialHeight,
      delay: i * 0.1
    };
  });

  if (!isRecording && !audioData) {
    return (
      <div className="waveform-container h-[100px] w-full relative">
        <div className="waveform-line absolute bottom-1/2 w-full h-[2px] bg-primary/20"></div>
        <div className="audio-wave flex items-center justify-center h-full">
          {bars.map((bar) => (
            <div 
              key={bar.id} 
              className="w-[6px] mx-[2px] rounded-full bg-gray-300"
              style={{ height: `${bar.height}px` }} 
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="waveform-container h-[100px] w-full relative">
      <div className="waveform-line absolute bottom-1/2 w-full h-[2px] bg-primary/20"></div>
      <div className="audio-wave flex items-center justify-center h-full">
        {bars.map((bar) => (
          <motion.div
            key={bar.id}
            className="w-[6px] mx-[2px] rounded-full bg-primary"
            initial={{ height: 10 }}
            animate={isRecording ? { 
              height: [10, Math.random() * 50 + 20, 10],
            } : { height: bar.height }}
            transition={{
              duration: 1,
              repeat: isRecording ? Infinity : 0,
              delay: bar.delay,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </div>
  );
}
