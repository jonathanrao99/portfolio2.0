export type Project = {
  title: string;
  icon: string;
  slug: string;
  category: string;
  keywords: string[];
  summary: string[];
  year: number;
  url: string | null;
  backgroundImageUrl: string;
  videoUrl: string;
  media: {
    type: "image" | "video";
    url: string;
  }[];
};

export const projects: Project[] = [
  {
    title: "NYC Collisions Dashboard",
    icon: "/images/project/dfk.png",
    slug: "nyc-collisions",
    category: "Data Analytics",
    keywords: [
      "Python",
      "Streamlit",
      "Pandas",
      "Data Visualization",
      "Machine Learning",
      "Risk Analysis",
      "Geospatial Analysis",
      "Statistical Modeling",
    ],
    summary: [
      "Built an interactive dashboard analyzing NYC traffic collision data to identify high-risk areas and predict accident probability using machine learning models and geospatial analysis.",
    ],
    year: 2024,
    url: null,
    backgroundImageUrl: "/images/project/dfk.png",
    videoUrl: "/videos/NYCCollisions.mp4",
    media: [
      {
        type: "video",
        url: "/videos/NYCCollisions.mp4",
      },
    ],
  },
  {
    title: "Sky Sentiment Analysis",
    icon: "/images/project/chilledcoco3.png",
    slug: "sky-sentiment",
    category: "AI/ML",
    keywords: [
      "Natural Language Processing",
      "Sentiment Analysis",
      "Python",
      "Machine Learning",
      "Data Science",
      "Text Analytics",
      "AI Models",
      "Visualization",
    ],
    summary: [
      "Developed a comprehensive sentiment analysis system for social media data, utilizing advanced NLP techniques to extract insights from large-scale text datasets.",
    ],
    year: 2024,
    url: null,
    backgroundImageUrl: "/images/project/chilledcoco3.png",
    videoUrl: "/videos/SkySentiment.mp4",
    media: [
      {
        type: "video",
        url: "/videos/SkySentiment.mp4",
      },
    ],
  },
  {
    title: "McDonald's Analytics",
    icon: "/images/project/dfkmain.png",
    slug: "mcdonalds-analytics",
    category: "Business Intelligence",
    keywords: [
      "Business Analytics",
      "Dashboard Design",
      "Data Visualization",
      "KPI Tracking",
      "Performance Metrics",
      "SQL",
      "Power BI",
      "Data Mining",
    ],
    summary: [
      "Created a comprehensive business intelligence dashboard for McDonald's operational data, providing real-time insights into sales performance, customer behavior, and operational efficiency.",
    ],
    year: 2024,
    url: null,
    backgroundImageUrl: "/images/project/dfkmain.png",
    videoUrl: "/videos/McdonaldsDashboard.mp4",
    media: [
      {
        type: "video",
        url: "/videos/McdonaldsDashboard.mp4",
      },
    ],
  },
  {
    title: "ChilledCoco Website",
    icon: "/images/project/chilledcocomain.png",
    slug: "chilledcoco-website",
    category: "Web Development",
    keywords: [
      "React",
      "Next.js",
      "TypeScript",
      "Responsive Design",
      "UI/UX",
      "Modern Web",
      "Performance",
      "SEO",
    ],
    summary: [
      "Designed and developed a modern, responsive website for ChilledCoco, focusing on user experience, performance optimization, and conversion-driven design.",
    ],
    year: 2024,
    url: null,
    backgroundImageUrl: "/images/project/chilledcocomain.png",
    videoUrl: "/videos/ChilledCoco.mp4",
    media: [
      {
        type: "video",
        url: "/videos/ChilledCoco.mp4",
      },
    ],
  },
];
