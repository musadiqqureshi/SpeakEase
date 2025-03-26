import { Link } from "wouter";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  MessageCircle, 
  Mail, 
  Phone 
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4 flex items-center">
              <MessageCircle className="mr-2" size={18} />
              SpeakEase
            </h3>
            <p className="text-gray-400 text-sm">
              Early speech disability detection for children using advanced AI technology.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-base mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/">
                  <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">Home</span>
                </Link>
              </li>
              <li>
                <Link href="/upload">
                  <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">Upload</span>
                </Link>
              </li>
              <li>
                <Link href="/results">
                  <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">Results</span>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">About</span>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-base mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Speech Development
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Find a Specialist
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Research Papers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-base mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center text-gray-400">
                <Mail className="w-5 mr-2" size={18} />
                info@speakease.ai
              </li>
              <li className="flex items-center text-gray-400">
                <Phone className="w-5 mr-2" size={18} />
                (555) 123-4567
              </li>
              <li className="text-gray-400 mt-4">
                <div className="flex space-x-4">
                  <a href="#" className="hover:text-white transition-colors">
                    <Twitter size={18} />
                  </a>
                  <a href="#" className="hover:text-white transition-colors">
                    <Facebook size={18} />
                  </a>
                  <a href="#" className="hover:text-white transition-colors">
                    <Instagram size={18} />
                  </a>
                  <a href="#" className="hover:text-white transition-colors">
                    <Linkedin size={18} />
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} SpeakEase. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
