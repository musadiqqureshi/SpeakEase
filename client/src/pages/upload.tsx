import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { AudioRecorder } from "@/components/ui/audio-recorder";
import { FileUploader } from "@/components/ui/file-uploader";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Mic, Upload, RotateCcw, SendHorizontal, InfoIcon } from "lucide-react";
import { submitAudioForAnalysis } from "@/services/api";

export default function UploadPage() {
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState("record");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [, navigate] = useLocation();
  const { toast } = useToast();

  const handleAudioRecorded = (blob: Blob) => {
    setAudioBlob(blob);
    setAudioFile(null);
    console.log("Audio recorded:", blob.size, "bytes");
  };

  const handleFileSelected = (file: File) => {
    setAudioFile(file);
    setAudioBlob(null);
    console.log("File selected:", file.name);
  };

  const handleReset = () => {
    setAudioBlob(null);
    setAudioFile(null);
    toast({
      title: "Reset",
      description: "Audio input has been cleared."
    });
  };

  const handleSubmit = async () => {
    if (!audioBlob && !audioFile) {
      toast({
        title: "No Audio",
        description: "Please record or upload an audio file first.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const file = audioFile || new File([audioBlob!], "recording.wav", { type: "audio/wav" });
      console.log("Submitting audio for analysis:", file.name);
      
      const result = await submitAudioForAnalysis(file);
      
      // Store result in localStorage for the results page
      localStorage.setItem("speakEase_results", JSON.stringify(result));
      
      toast({
        title: "Analysis Complete",
        description: "Your audio has been successfully analyzed."
      });
      
      // Navigate to results page
      navigate("/results");
    } catch (error) {
      console.error("Error submitting audio:", error);
      toast({
        title: "Submission Error",
        description: error instanceof Error ? error.message : "Failed to analyze audio. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="font-bold text-3xl mb-4">Upload or Record Speech Sample</h1>
        <p className="text-gray-600">
          For accurate results, we recommend a clear audio sample of your child speaking for at least 15 seconds.
        </p>
      </motion.div>

      <Card>
        <CardContent className="p-6">
          <div className="mb-6">
            <h2 className="font-semibold text-xl mb-4">Choose Your Input Method</h2>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="record" className="flex gap-2 items-center">
                  <Mic size={16} /> Record Audio
                </TabsTrigger>
                <TabsTrigger value="upload" className="flex gap-2 items-center">
                  <Upload size={16} /> Upload File
                </TabsTrigger>
              </TabsList>

              <TabsContent value="record">
                <AudioRecorder onAudioRecorded={handleAudioRecorded} />
              </TabsContent>

              <TabsContent value="upload">
                <FileUploader onFileSelected={handleFileSelected} />
              </TabsContent>
            </Tabs>
          </div>

          <div className="mt-8 flex justify-between">
            <Button
              variant="outline"
              onClick={handleReset}
              disabled={isSubmitting}
              className="flex items-center gap-2"
            >
              <RotateCcw size={16} /> Reset
            </Button>
            
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || (!audioBlob && !audioFile)}
              className="flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full mr-2"></span>
                  Processing...
                </>
              ) : (
                <>
                  <SendHorizontal size={16} /> Submit for Analysis
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-md mt-8"
      >
        <div className="flex">
          <div className="flex-shrink-0">
            <InfoIcon className="h-5 w-5 text-blue-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              For best results, record your child speaking naturally. You might ask them to describe their day, tell a story, or name objects in a picture.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
