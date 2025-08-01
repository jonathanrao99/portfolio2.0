"use client";

interface LabProject {
  id: string;
  title: string;
  description: string;
  status: "In Progress" | "Experimental" | "Completed";
  github?: string;
  live?: string;
  category: string;
}

const labProjects: LabProject[] = [
  {
    id: "1",
    title: "AI Chatbot",
    description: "Natural language processing chatbot for customer support",
    status: "In Progress",
    github: "https://github.com/jonathanrao99/ai-chatbot",
    category: "AI/ML"
  },
  {
    id: "2",
    title: "Data Visualization Tool",
    description: "Interactive charts and graphs for data analysis",
    status: "Experimental",
    github: "https://github.com/jonathanrao99/data-viz",
    live: "https://dataviz-demo.vercel.app",
    category: "Data Science"
  },
  {
    id: "3",
    title: "Portfolio Builder",
    description: "No-code portfolio creation tool for developers",
    status: "Completed",
    github: "https://github.com/jonathanrao99/portfolio-builder",
    live: "https://portfolio-builder.vercel.app",
    category: "Web App"
  },
  {
    id: "4",
    title: "Machine Learning Pipeline",
    description: "Automated ML model training and deployment",
    status: "In Progress",
    github: "https://github.com/jonathanrao99/ml-pipeline",
    category: "AI/ML"
  },
  {
    id: "5",
    title: "Real-time Analytics Dashboard",
    description: "Live data monitoring and visualization",
    status: "Experimental",
    github: "https://github.com/jonathanrao99/analytics-dashboard",
    category: "Data Science"
  },
  {
    id: "6",
    title: "API Gateway",
    description: "Microservices API management and routing",
    status: "In Progress",
    github: "https://github.com/jonathanrao99/api-gateway",
    category: "Backend"
  },
  {
    id: "7",
    title: "Mobile App Framework",
    description: "Cross-platform mobile development toolkit",
    status: "Experimental",
    github: "https://github.com/jonathanrao99/mobile-framework",
    category: "Mobile"
  },
  {
    id: "8",
    title: "Blockchain Explorer",
    description: "Cryptocurrency transaction visualization",
    status: "In Progress",
    github: "https://github.com/jonathanrao99/blockchain-explorer",
    category: "Blockchain"
  },
  {
    id: "9",
    title: "Computer Vision API",
    description: "Image recognition and processing service",
    status: "Experimental",
    github: "https://github.com/jonathanrao99/cv-api",
    category: "AI/ML"
  },
  {
    id: "10",
    title: "E-commerce Platform",
    description: "Full-stack online store solution",
    status: "Completed",
    github: "https://github.com/jonathanrao99/ecommerce-platform",
    live: "https://ecommerce-demo.vercel.app",
    category: "Web App"
  },
  {
    id: "11",
    title: "IoT Data Collector",
    description: "Sensor data aggregation and processing",
    status: "In Progress",
    github: "https://github.com/jonathanrao99/iot-collector",
    category: "IoT"
  },
  {
    id: "12",
    title: "Social Media Analytics",
    description: "Sentiment analysis and trend detection",
    status: "Experimental",
    github: "https://github.com/jonathanrao99/social-analytics",
    category: "Data Science"
  },
  {
    id: "13",
    title: "Game Engine",
    description: "2D game development framework",
    status: "In Progress",
    github: "https://github.com/jonathanrao99/game-engine",
    category: "Gaming"
  },
  {
    id: "14",
    title: "Voice Assistant",
    description: "Speech recognition and natural language processing",
    status: "Experimental",
    github: "https://github.com/jonathanrao99/voice-assistant",
    category: "AI/ML"
  },
  {
    id: "15",
    title: "Database ORM",
    description: "Object-relational mapping library",
    status: "Completed",
    github: "https://github.com/jonathanrao99/orm-library",
    category: "Backend"
  },
  {
    id: "16",
    title: "Cloud Storage Service",
    description: "Distributed file storage system",
    status: "In Progress",
    github: "https://github.com/jonathanrao99/cloud-storage",
    category: "Cloud"
  },
  {
    id: "17",
    title: "Recommendation Engine",
    description: "Machine learning-based product recommendations",
    status: "Experimental",
    github: "https://github.com/jonathanrao99/recommendation-engine",
    category: "AI/ML"
  },
  {
    id: "18",
    title: "Code Editor",
    description: "Web-based code editor with syntax highlighting",
    status: "In Progress",
    github: "https://github.com/jonathanrao99/code-editor",
    category: "Development"
  },
  {
    id: "19",
    title: "Task Management App",
    description: "Project management and team collaboration tool",
    status: "Completed",
    github: "https://github.com/jonathanrao99/task-manager",
    live: "https://task-manager-demo.vercel.app",
    category: "Web App"
  },
  {
    id: "20",
    title: "Neural Network Library",
    description: "Custom deep learning framework",
    status: "Experimental",
    github: "https://github.com/jonathanrao99/neural-network",
    category: "AI/ML"
  }
];

export default function Lab() {
  return (
    <section id="lab" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-saans">
            Lab
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-saans">
            Experimental projects and ongoing research in AI, data science, and web development.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {labProjects.map((project) => (
            <div key={project.id} className="group">
              <div className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-all duration-300 cursor-pointer">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-purple-600 uppercase tracking-wide font-saans">
                    {project.category}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full font-saans ${
                    project.status === "Completed" 
                      ? "bg-green-100 text-green-700" 
                      : project.status === "In Progress"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {project.status}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors font-saans">
                  {project.title}
                </h3>
                
                <p className="text-sm text-gray-600 mb-4 font-saans">
                  {project.description}
                </p>
                
                {/* Links */}
                <div className="flex gap-2">
                  {project.github && (
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-gray-500 hover:text-purple-600 transition-colors font-saans"
                    >
                      GitHub →
                    </a>
                  )}
                  {project.live && (
                    <a 
                      href={project.live} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-gray-500 hover:text-purple-600 transition-colors font-saans"
                    >
                      Live →
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 