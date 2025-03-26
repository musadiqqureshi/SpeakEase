import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { CloudUpload, FileAudio } from "lucide-react";

interface FileUploaderProps {
  onFileSelected: (file: File) => void;
  accept?: string;
  maxSizeMB?: number;
}

export function FileUploader({
  onFileSelected,
  accept = ".wav,.mp3,.ogg",
  maxSizeMB = 10
}: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const validateFile = (file: File): boolean => {
    // Check file size
    if (file.size > maxSizeBytes) {
      toast({
        title: "File too large",
        description: `File size exceeds the ${maxSizeMB}MB limit.`,
        variant: "destructive"
      });
      return false;
    }

    // Check file type
    const fileType = file.type.toLowerCase();
    if (!fileType.includes("audio")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an audio file (.wav, .mp3, or .ogg).",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const processFile = (file: File) => {
    if (validateFile(file)) {
      setSelectedFile(file);
      onFileSelected(file);
      
      console.log("File selected:", file.name, "Size:", (file.size / 1024 / 1024).toFixed(2) + "MB");
      
      toast({
        title: "File selected",
        description: `${file.name} was successfully selected.`
      });
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      processFile(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      processFile(file);
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-10 text-center transition-colors ${
        isDragging
          ? "border-primary-400 bg-primary-50"
          : selectedFile
          ? "border-green-400 bg-green-50"
          : "border-gray-300 hover:border-primary-300 hover:bg-gray-50"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {selectedFile ? (
        <div>
          <div className="flex items-center justify-center mb-4">
            <FileAudio className="h-10 w-10 text-green-500" />
          </div>
          <p className="text-green-600 font-medium mb-2">{selectedFile.name}</p>
          <p className="text-gray-500 text-sm mb-4">
            {(selectedFile.size / 1024 / 1024).toFixed(2)}MB
          </p>
          <Button 
            variant="outline" 
            onClick={handleButtonClick}
            className="mt-2"
          >
            Change File
          </Button>
        </div>
      ) : (
        <>
          <motion.div
            className="flex items-center justify-center mb-4"
            animate={{ y: isDragging ? -10 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <CloudUpload className="h-12 w-12 text-gray-400" />
          </motion.div>
          <p className="text-gray-600 mb-4">
            Drag and drop your audio file here, or click to browse
          </p>
          <p className="text-xs text-gray-500 mb-4">
            Supports .wav, .mp3, and .ogg files up to {maxSizeMB}MB
          </p>
          <Button onClick={handleButtonClick}>Browse Files</Button>
        </>
      )}
      <input
        type="file"
        className="hidden"
        accept={accept}
        onChange={handleFileChange}
        ref={fileInputRef}
      />
    </div>
  );
}
