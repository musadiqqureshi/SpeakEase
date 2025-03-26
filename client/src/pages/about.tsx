import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AlertCircle } from "lucide-react";

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

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="text-center mb-8"
      >
        <motion.h1 variants={fadeIn} className="font-bold text-3xl mb-4">About SpeakEase</motion.h1>
        <motion.p variants={fadeIn} className="text-gray-600">
          Learn how our AI-powered system works to detect speech disorders in children.
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="font-bold text-2xl mb-4 text-gray-800">Our Technology</h2>
                <p className="text-gray-600 mb-4">
                  SpeakEase uses a sophisticated deep learning model built with TensorFlow to analyze speech patterns and detect potential speech disorders.
                </p>
                <p className="text-gray-600 mb-4">
                  The AI model has been trained on diverse speech samples from children of various ages, accents, and speech patterns to ensure accurate and unbiased results.
                </p>
                <p className="text-gray-600">
                  Our system extracts MFCC (Mel-frequency cepstral coefficients) features from audio samples and processes them through a Convolutional Neural Network (CNN) to identify speech patterns associated with different speech disorders.
                </p>
              </div>
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1581092921461-fd3e8da32e45?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
                  alt="AI technology visualization" 
                  className="rounded-lg shadow-sm w-full h-[300px] object-cover"
                />
              </div>
            </div>

            <Separator className="my-8" />

            <h2 className="font-bold text-2xl mb-4 text-gray-800">Training Datasets</h2>
            <p className="text-gray-600 mb-6">
              Our AI model has been trained on several high-quality speech datasets to ensure robust performance:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2 text-gray-800">LibriSpeech</h3>
                <p className="text-gray-600 text-sm">
                  A large corpus of read English speech, providing baseline speech patterns for our model.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2 text-gray-800">TIMIT</h3>
                <p className="text-gray-600 text-sm">
                  Acoustic-phonetic continuous speech corpus designed to provide speech data for acoustic-phonetic studies.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2 text-gray-800">Google Speech Commands</h3>
                <p className="text-gray-600 text-sm">
                  Dataset of short spoken words, helping our model understand various speech patterns.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="bg-primary-50 rounded-xl p-6 mb-8"
      >
        <h2 className="font-bold text-2xl mb-4 text-primary-800 flex items-center gap-2">
          <AlertCircle size={24} />
          Important Disclaimer
        </h2>
        <p className="text-gray-700 mb-4">
          While SpeakEase uses advanced AI technology to analyze speech patterns, it is not a substitute for professional medical advice, diagnosis, or treatment.
        </p>
        <p className="text-gray-700">
          If you have concerns about your child's speech development, please consult with a qualified speech-language pathologist or healthcare professional.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-center"
      >
        <h2 className="font-bold text-2xl mb-6 text-gray-800">Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-24 h-24 rounded-full bg-gray-300 mx-auto mb-4"></div>
            <h3 className="font-semibold text-lg">Dr. Jane Smith</h3>
            <p className="text-gray-600 text-sm">Speech Pathologist</p>
          </div>
          <div className="text-center">
            <div className="w-24 h-24 rounded-full bg-gray-300 mx-auto mb-4"></div>
            <h3 className="font-semibold text-lg">Dr. Alex Johnson</h3>
            <p className="text-gray-600 text-sm">AI Researcher</p>
          </div>
          <div className="text-center">
            <div className="w-24 h-24 rounded-full bg-gray-300 mx-auto mb-4"></div>
            <h3 className="font-semibold text-lg">Sarah Williams</h3>
            <p className="text-gray-600 text-sm">UX Designer</p>
          </div>
          <div className="text-center">
            <div className="w-24 h-24 rounded-full bg-gray-300 mx-auto mb-4"></div>
            <h3 className="font-semibold text-lg">Michael Lee</h3>
            <p className="text-gray-600 text-sm">Software Engineer</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
