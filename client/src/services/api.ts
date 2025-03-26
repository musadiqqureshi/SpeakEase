import axios from "axios";
import { PredictionResult } from "@/types/prediction";

const API_URL = "/api";

// Helper function to create form data from a file
const createFormData = (file: File): FormData => {
  const formData = new FormData();
  formData.append("file", file);
  return formData;
};

/**
 * Submit audio file for analysis
 * @param file Audio file to analyze
 * @returns Prediction result
 */
export const submitAudioForAnalysis = async (file: File): Promise<PredictionResult> => {
  try {
    console.log("Sending audio file to backend for analysis");
    
    const formData = createFormData(file);
    
    const response = await axios.post<PredictionResult>(
      `${API_URL}/predict`, 
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    
    console.log("Received prediction:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error submitting audio for analysis:", error);
    
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(`Analysis failed: ${error.response.data.message || error.message}`);
    }
    
    throw new Error("Failed to analyze audio. Please try again.");
  }
};
