import { useState } from "react";
import { motion } from "framer-motion";
import { useAudioRecorder } from "@/hooks/use-audio-recorder";
import { Waveform } from "./waveform";
import { Button } from "./button";
import { Microphone, StopCircle, Play, Pause, RefreshCw } from "lucide-react";

interface AudioRecorderProps {
  onAudioRecorded: (audioBlob: Blob) => void;
}

export function AudioRecorder({ onAudioRecorded }: AudioRecorderProps) {
  const [recorded, setRecorded] = useState(false);
  
  const {
    isRecording,
    recordingTime,
    audioBlob,
    audioUrl,
    isPlaying,
    startRecording,
    stopRecording,
    playAudio,
    pauseAudio,
    resetRecording,
    formatTime
  } = useAudioRecorder({
    onRecordingComplete: (blob) => {
      setRecorded(true);
      onAudioRecorded(blob);
    }
  });

  const handleStartRecording = () => {
    setRecorded(false);
    startRecording();
  };

  return (
    <div className="border-2 border-dashed border-primary-300 rounded-lg p-6 bg-primary-50 text-center">
      <Waveform isRecording={isRecording} />
      
      <div className="flex justify-center gap-4 mb-6 mt-6">
        {!isRecording && !recorded ? (
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={handleStartRecording}
              className="w-16 h-16 rounded-full bg-secondary-500 hover:bg-secondary-600 shadow-lg"
              size="icon"
            >
              <Microphone size={24} />
            </Button>
          </motion.div>
        ) : isRecording ? (
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={stopRecording}
              className="w-16 h-16 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 shadow"
              size="icon"
              variant="outline"
            >
              <StopCircle size={24} />
            </Button>
          </motion.div>
        ) : (
          <div className="flex gap-4">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isPlaying ? (
                <Button
                  onClick={pauseAudio}
                  className="w-12 h-12 rounded-full"
                  size="icon"
                >
                  <Pause size={20} />
                </Button>
              ) : (
                <Button
                  onClick={playAudio}
                  className="w-12 h-12 rounded-full"
                  size="icon"
                >
                  <Play size={20} />
                </Button>
              )}
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={resetRecording}
                className="w-12 h-12 rounded-full"
                size="icon"
                variant="outline"
              >
                <RefreshCw size={20} />
              </Button>
            </motion.div>
          </div>
        )}
      </div>
      
      <div className="text-sm text-gray-500">
        {isRecording ? (
          <p>Recording... <span>{formatTime(recordingTime)}</span></p>
        ) : recorded ? (
          <p>Audio recorded successfully! <span>{formatTime(recordingTime)}</span></p>
        ) : (
          <p>Click the microphone to start recording</p>
        )}
        <p className="mt-2">Speak clearly into your microphone. Try to minimize background noise.</p>
      </div>

      {audioBlob && audioUrl && recorded && (
        <div className="mt-6 bg-gray-100 rounded-lg p-4">
          <div className="flex items-center gap-4">
            <Button
              onClick={isPlaying ? pauseAudio : playAudio}
              className="w-10 h-10 rounded-full"
              size="icon"
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </Button>
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full" 
                  style={{ width: "100%" }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0:00</span>
                <span>{formatTime(recordingTime)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
