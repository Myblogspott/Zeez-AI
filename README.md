# Zeez AI

Zeez AI is an innovative platform designed to provide users with an intelligent and seamless experience for learning, exploration, and assessment. The application integrates state-of-the-art technologies like AWS, OpenAI, Google Vision, LangChain, and Flask to deliver a highly interactive and responsive platform.

## Key Features

### **Authorization**
- **Secure Authentication**: Powered by AWS, Zeez AI ensures secure user login and data protection.
- **Session Management**: Provides robust authentication features, ensuring user data integrity.

### **Home Page Navigation**
- **Intuitive Design**: The homepage offers a clear entry point with seamless navigation.
- **Routes**:
  - Clicking the **Zeez AI** logo always redirects to the homepage.
  - Header links include:
    - **Generate Text from Image**
    - **Text to Speech**
    - **Sign Out**
  - Homepage buttons include:
    - **Take a Quiz**
    - **Research a Topic**
  - Footer includes essential components like copyrights.

### **Image to Text Conversion**
- Utilizes **OpenAI** and **Google Vision API** for accurate and fast image-to-text extraction.
- Supports multi-language text recognition, enabling users to process diverse document formats efficiently.

### **Custom Quiz Generation**
- Powered by **OpenAI** and built on **LangChain**, enabling personalized quizzes tailored to user input.
- Provides interactive learning tools to assess and enhance user knowledge.

### **Text-to-Speech**
- Converts extracted text from documents and images into natural-sounding speech using OpenAI.
- Integrated with LangChain's chat framework for enhanced user interaction.
- Developed with **AWS Amplify** to deliver a sleek and responsive interface.

### **Research a Topic**
- Employs an advanced chatbot powered by **OpenAI LLM**, delivering responses 10x faster than traditional models.
- Allows users to extract text from images and documents for research purposes.
- Combines LangChain's chat framework with AWS Amplify for superior UI/UX design.

### **API Communication**
- Uses **Axios** for smooth and efficient communication between the frontend and backend.

### **Backend Framework**
- Built on **Flask**, ensuring efficient and reliable data flow between frontend and backend systems.

### **Navigation**
- Implemented with **React Router** for intuitive and smooth transitions across app sections.

### **UI/UX**
- Enhanced with **AWS Amplify** for a visually appealing, responsive, and optimized user experience across devices.

## Technology Stack
- **Frontend**: React, HTML5, CSS3, JavaScript (ES6), Bootstrap 5.
- **Backend**: Flask.
- **APIs**:
  - Google Vision API for text detection.
  - OpenAI for quiz and text-to-speech functionalities.
- **Frameworks**:
  - LangChain for quiz and chat frameworks.
  - AWS Amplify for secure authentication and enhanced UI/UX.

## How to Run the Application

### Clone the Repository
```bash
git clone https://github.com/your-repo/zeez-ai.git
cd zeez-ai
```

### Install Dependencies
```bash
npm install
```

### Start the Application
```bash
npm start
```
Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

### Build for Production
```bash
npm run build
```

### Run Backend
Ensure Flask is installed, then run:
```bash
flask run
```

### Host the Application
You can host Zeez AI on platforms like **Netlify**, **Vercel**, or your local server:
```bash
python -m http.server
```

## Future Enhancements
- Multi-language support for global accessibility.
- Offline mode using service workers.
- Advanced analytics and user profiles for personalized feedback.

## Credits
- **Frontend Framework**: React, AWS Amplify.
- **APIs**: Google Vision API, OpenAI.
- **Frameworks**: LangChain, Flask.

---

Enjoy learning and exploring with Zeez AI! 🚀
```

This README is tailored to Zeez AI and includes technical details while providing a clear structure for users and developers. Let me know if you’d like further refinements!
