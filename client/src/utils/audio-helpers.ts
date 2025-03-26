/**
 * Converts an audio file to a web-compatible format if needed
 * @param file Original audio file
 * @returns Promise with processed audio file
 */
export const processAudioFile = async (
  file: File
): Promise<File> => {
  // For now, just return the original file
  // In a more complete implementation, we could convert formats if needed
  return file;
};

/**
 * Validates an audio file for size and format
 * @param file Audio file to validate
 * @param maxSizeMB Maximum size in MB
 * @returns Object with validation result and error message if any
 */
export const validateAudioFile = (
  file: File,
  maxSizeMB = 10
): { valid: boolean; message?: string } => {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  // Check file size
  if (file.size > maxSizeBytes) {
    return {
      valid: false,
      message: `File size exceeds the ${maxSizeMB}MB limit.`
    };
  }

  // Check file type
  const fileType = file.type.toLowerCase();
  
  if (!fileType.includes("audio")) {
    return {
      valid: false,
      message: "Please upload an audio file (.wav, .mp3, or .ogg)."
    };
  }

  return { valid: true };
};

/**
 * Format seconds into MM:SS format
 * @param seconds Number of seconds
 * @returns Formatted time string
 */
export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
};
