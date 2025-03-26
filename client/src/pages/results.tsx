import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, MessageSquare, Book, PaintBrush, RotateCw } from "lucide-react";
import { PredictionResult } from "@/types/prediction";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function ResultsPage() {
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [, navigate] = useLocation();

  useEffect(() => {
    // Get results from localStorage
    const storedResults = localStorage.getItem("speakEase_results");
    
    if (storedResults) {
      try {
        const parsedResults = JSON.parse(storedResults) as PredictionResult;
        setResult(parsedResults);
      } catch (error) {
        console.error("Error parsing results:", error);
      }
    }
    
    setLoading(false);
    
    // If no results, redirect to upload page
    if (!storedResults) {
      navigate("/upload");
    }
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">No Results Found</h2>
        <p className="text-gray-600 mb-6">Please upload or record an audio sample first.</p>
        <Link href="/upload">
          <Button className="gap-2">
            Go to Upload <ArrowRight size={16} />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="text-center mb-8"
      >
        <motion.h1 variants={fadeIn} className="font-bold text-3xl mb-4">Analysis Results</motion.h1>
        <motion.p variants={fadeIn} className="text-gray-600">
          Here's what our AI model detected based on the speech sample provided.
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="text-center mb-6">
              <h2 className="font-bold text-2xl text-primary mb-2">Primary Detection</h2>
              <div className="inline-block bg-primary-100 text-primary-800 text-2xl font-bold py-2 px-6 rounded-full">
                {result.prediction}
              </div>
              <div className="mt-4 max-w-md mx-auto">
                <div className="flex items-center mb-1">
                  <span className="text-sm font-medium text-gray-700 mr-2">Confidence:</span>
                  <span className="text-sm font-bold text-primary">
                    {Math.round(result.confidence * 100)}%
                  </span>
                </div>
                <Progress value={result.confidence * 100} className="h-4" />
              </div>
            </div>

            <Separator className="my-6" />

            <h3 className="font-semibold text-lg mb-4">Alternative Possibilities</h3>
            <div className="space-y-4">
              {result.top_alternatives.map((alt, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-gray-700">{alt}</span>
                    <span className="text-gray-700 font-medium">
                      {Math.round(Math.max(0.2, 0.5 - (index * 0.2)) * 100)}%
                    </span>
                  </div>
                  <Progress 
                    value={Math.max(0.2, 0.5 - (index * 0.2)) * 100} 
                    className="h-2"
                    indicatorClassName="bg-secondary-400" 
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="font-bold text-2xl mb-6 text-gray-800">Recommended Activities</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-accent-50 p-5 rounded-lg">
                <div className="w-12 h-12 bg-accent-200 text-accent-700 rounded-full flex items-center justify-center mb-4">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-accent-800">Tongue Twisters</h3>
                <p className="text-gray-700 text-sm">
                  Practice simple tongue twisters to improve articulation and speech clarity.
                </p>
              </div>
              
              <div className="bg-primary-50 p-5 rounded-lg">
                <div className="w-12 h-12 bg-primary-200 text-primary rounded-full flex items-center justify-center mb-4">
                  <Book className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-primary-800">Reading Aloud</h3>
                <p className="text-gray-700 text-sm">
                  Practice reading simple sentences aloud to improve fluency and pronunciation.
                </p>
              </div>
              
              <div className="bg-secondary-50 p-5 rounded-lg">
                <div className="w-12 h-12 bg-secondary-200 text-secondary-700 rounded-full flex items-center justify-center mb-4">
                  <PaintBrush className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-secondary-800">Draw and Name</h3>
                <p className="text-gray-700 text-sm">
                  Draw objects and practice naming them to improve speech association.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="font-bold text-2xl mb-6 text-gray-800">Recommended Care Centers</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2">Speech Therapy Center</h3>
                <p className="text-gray-600 text-sm mb-2">123 Main Street, Anytown, USA</p>
                <p className="text-gray-600 text-sm mb-4">(555) 123-4567</p>
                <div className="flex gap-2">
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Speech Delay</span>
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Language Therapy</span>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2">Children's Communication Clinic</h3>
                <p className="text-gray-600 text-sm mb-2">456 Oak Avenue, Somecity, USA</p>
                <p className="text-gray-600 text-sm mb-4">(555) 987-6543</p>
                <div className="flex gap-2">
                  <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">Articulation</span>
                  <span className="bg-pink-100 text-pink-800 text-xs font-medium px-2.5 py-0.5 rounded">Fluency</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="flex justify-center"
      >
        <Link href="/upload">
          <Button size="lg" className="gap-2 bg-gradient-to-r from-primary to-primary/80 shadow-md hover:shadow-lg">
            Try Another Test <RotateCw size={18} />
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
