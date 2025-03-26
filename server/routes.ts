import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

// Get directory name for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure multer for file uploads
const uploadDir = path.join(__dirname, "uploads");
const storage_config = multer.memoryStorage();
const upload = multer({
  storage: storage_config,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB max file size
  },
  fileFilter: (_req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    // Accept only audio files
    if (file.mimetype.startsWith("audio/")) {
      cb(null, true);
    } else {
      cb(new Error("Only audio files are allowed"));
    }
  },
});

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoint for speech prediction
  app.post("/api/predict", upload.single("file"), (req: Request & { file?: Express.Multer.File }, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No audio file uploaded" });
      }

      console.log("File received:", req.file.originalname, req.file.mimetype, req.file.size);

      // Mock AI prediction response
      // In a real implementation, this would process the audio file and run it through a TensorFlow model
      const mockPredictions = [
        {
          prediction: "Speech Delay",
          confidence: 0.87,
          top_alternatives: ["Pronunciation Error", "Stuttering"]
        },
        {
          prediction: "Pronunciation Error",
          confidence: 0.76,
          top_alternatives: ["Speech Delay", "Articulation Disorder"]
        },
        {
          prediction: "Stuttering",
          confidence: 0.65,
          top_alternatives: ["Speech Delay", "Fluency Disorder"]
        },
        {
          prediction: "Normal Speech",
          confidence: 0.92,
          top_alternatives: ["Mild Pronunciation Error", "Age-Appropriate Pauses"]
        }
      ];

      // Choose a random prediction from our mock data
      const randomPrediction = mockPredictions[Math.floor(Math.random() * mockPredictions.length)];

      // Add a small delay to simulate processing time
      setTimeout(() => {
        res.json(randomPrediction);
      }, 1500);
    } catch (error) {
      console.error("Error processing audio file:", error);
      res.status(500).json({
        message: error instanceof Error ? error.message : "Failed to process audio file"
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
