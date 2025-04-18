import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight, Mic, Brain, Heart, ArrowRight } from "lucide-react";

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

export default function HomePage() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center pb-16">
        <motion.div variants={fadeIn}>
          <h1 className="font-bold text-4xl sm:text-5xl text-gray-800 mb-6 leading-tight">
            Early Speech Disability <span className="text-primary">Detection</span> for Children
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            SpeakEase uses advanced AI technology to help detect speech disorders in children at an early stage, 
            allowing for timely intervention and support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/upload">
              <Button size="lg" className="gap-2 bg-gradient-to-r from-primary to-primary/80 shadow-md hover:shadow-lg">
                Get Started <ArrowRight size={18} />
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </Link>
          </div>
        </motion.div>
        
        <motion.div 
          variants={fadeIn}
          className="lg:justify-self-end flex items-center justify-center"
        >
          <div className="w-full max-w-lg mx-auto bg-gradient-to-r from-primary-100 to-secondary-100 rounded-xl shadow-md p-10 h-[400px] flex flex-col items-center justify-center gap-8">
            <div className="flex gap-8 justify-center">
              <div className="text-primary p-6 bg-white rounded-full shadow-lg">
                <Mic size={64} />
              </div>
              <div className="text-secondary-600 p-6 bg-white rounded-full shadow-lg">
                <Brain size={64} />
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Speech Analysis Made Simple</h3>
              <p className="text-gray-600 text-lg">Record or upload audio samples for instant AI assessment</p>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12"
      >
        <motion.div 
          variants={fadeIn}
          className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
            <Mic className="text-primary" />
          </div>
          <h3 className="font-bold text-xl mb-2">Record Speech</h3>
          <p className="text-gray-600">Use our recorder to capture your child's speech directly from your browser.</p>
        </motion.div>
        
        <motion.div 
          variants={fadeIn}
          className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center mb-4">
            <Brain className="text-secondary-600" />
          </div>
          <h3 className="font-bold text-xl mb-2">AI Analysis</h3>
          <p className="text-gray-600">Our advanced AI model analyzes speech patterns to detect potential speech disorders.</p>
        </motion.div>
        
        <motion.div 
          variants={fadeIn}
          className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center mb-4">
            <Heart className="text-accent-600" />
          </div>
          <h3 className="font-bold text-xl mb-2">Get Support</h3>
          <p className="text-gray-600">Receive personalized activity suggestions and find professional resources.</p>
        </motion.div>
      </motion.div>

      <motion.div 
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 my-12"
      >
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-bold text-3xl mb-4">Why Early Detection Matters</h2>
          <p className="text-gray-700 mb-8">
            Research shows that early intervention for speech disorders can significantly improve outcomes. 
            The earlier a speech disorder is identified, the more effective therapy can be.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-primary font-bold text-4xl mb-2">94%</div>
              <p className="text-gray-600">of children show improvement with early intervention</p>
            </div>
            <div>
              <div className="text-primary font-bold text-4xl mb-2">2-4x</div>
              <p className="text-gray-600">faster progress with early detection</p>
            </div>
            <div>
              <div className="text-primary font-bold text-4xl mb-2">5+</div>
              <p className="text-gray-600">years of academic advantage</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
