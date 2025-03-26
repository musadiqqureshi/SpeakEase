# SpeakEase - Early Speech Disability Detection App

![SpeakEase](generated-icon.png)

## Project Overview

SpeakEase is a web application designed to detect early signs of speech disabilities in children using advanced AI technology. The platform provides an accessible and user-friendly interface for parents, educators, and healthcare professionals to record or upload speech samples and receive instant analysis with actionable insights.

## Features

- **Audio Recording**: Record speech samples directly through the application
- **File Upload**: Upload pre-recorded audio samples for analysis
- **Real-time Visualization**: View audio waveforms during recording for visual feedback
- **AI-Powered Analysis**: Utilize a TensorFlow model to analyze speech patterns
- **Results Dashboard**: View detailed analysis results with confidence scores
- **Resource Center**: Access educational materials about speech development

## Tech Stack

### Frontend
- React.js (with TypeScript)
- TanStack Query for data fetching
- Tailwind CSS for styling
- Shadcn UI components
- Wouter for routing

### Backend
- Express.js server
- Multer for file uploads
- In-memory storage for development (can be extended to database solutions)

### ML/AI
- TensorFlow model for speech analysis

## Application Structure

```
├── client/                 # Frontend application
│   ├── src/                # Source code
│   │   ├── components/     # UI components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utility libraries
│   │   ├── pages/          # Application pages
│   │   ├── services/       # API service layer
│   │   └── types/          # TypeScript type definitions
├── server/                 # Backend application
│   ├── index.ts            # Server entry point
│   ├── routes.ts           # API route definitions
│   ├── storage.ts          # Data storage implementation
│   └── vite.ts             # Vite server configuration
└── shared/                 # Shared code between frontend and backend
    └── schema.ts           # Data models and validation schemas
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/musadiqqureshi/SpeakEase.git
   cd SpeakEase
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. The application will be available at:
   - Frontend: http://localhost:5000
   - Backend API: http://localhost:5000/api

## Usage Guide

### Recording Audio
1. Navigate to the Upload page
2. Click the "Record" button
3. Speak clearly into your microphone
4. Click "Stop" when finished
5. Review the recording and click "Analyze" to submit

### Uploading Audio Files
1. Navigate to the Upload page
2. Click the "Upload" button
3. Select an audio file from your device (.mp3, .wav formats supported)
4. Click "Analyze" to submit the file for processing

### Viewing Results
1. After analysis is complete, you'll be redirected to the Results page
2. Review the detected speech patterns and confidence scores
3. Access recommended resources based on the analysis

## Development Roadmap

### Phase 1: Prototype (Current)
- Core recording and upload functionality
- Basic speech analysis integration
- Essential UI components

### Phase 2: Enhanced Analysis
- Expanded detection categories
- Improved model accuracy
- Detailed progress tracking

### Phase 3: User Management
- User accounts and authentication
- Personalized dashboards
- History tracking and progress reports

### Phase 4: Professional Portal
- Specialist access and management
- Collaborative assessment tools
- Integration with healthcare systems

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Project Link: [https://github.com/musadiqqureshi/SpeakEase](https://github.com/musadiqqureshi/SpeakEase)

---

Developed with ❤️ to help identify speech disabilities early and empower children's communication development.