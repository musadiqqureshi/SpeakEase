export interface PredictionResult {
  prediction: string;
  confidence: number;
  top_alternatives: string[];
}
