"use client";

import Image from "next/image";

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  video?: string;
  impact: {
    users?: string;
    performance?: string;
    engagement?: string;
  };
  featured?: boolean;
  slug: string;
}

const projects: Project[] = [
  {
    id: "1",
    title: "SwiftGuard",
    description: "AI-powered security system for real-time threat detection and response",
    category: "AI/ML",
    image: "/images/project/chilledcoco3.png",
    video: "/videos/swiftguard-preview.mp4",
    impact: {
      users: "10K+",
      performance: "99.9%",
      engagement: "85%"
    },
    featured: true,
    slug: "swiftguard"
  },
  {
    id: "2",
    title: "Desi Flavors Katy",
    description: "Food truck management system with real-time inventory and order tracking",
    category: "Web App",
    image: "/images/project/chilledcocoabout.png",
    impact: {
      users: "500+",
      performance: "95%",
      engagement: "92%"
    },
    slug: "desi-flavors-katy"
  },
  {
    id: "3",
    title: "DataViz Dashboard",
    description: "Interactive data visualization platform for business analytics",
    category: "Data Science",
    image: "/images/project/chilledcocoevent.png",
    impact: {
      users: "2K+",
      performance: "98%",
      engagement: "78%"
    },
    slug: "dataviz-dashboard"
  }
];

export default function Portfolio() {
  const featuredProject = projects.find(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  return (
    <section id="portfolio" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-saans">
            Featured Work
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-saans">
            A collection of projects that showcase my expertise in data science, 
            web development, and AI/ML solutions.
          </p>
        </div>

        {/* Featured Project */}
        {featuredProject && (
          <div className="mb-20">
            <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-500">
              <div className="aspect-video relative overflow-hidden">
                <Image
                  src={featuredProject.image}
                  alt={featuredProject.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Featured Badge */}
                <div className="absolute top-6 left-6">
                  <span className="px-3 py-1 bg-purple-600 text-white text-sm font-medium rounded-full font-saans">
                    Featured Project
                  </span>
                </div>
              </div>

              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-purple-600 uppercase tracking-wide font-saans">
                    {featuredProject.category}
                  </span>
                </div>
                
                <h3 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors font-saans">
                  {featuredProject.title}
                </h3>
                
                <p className="text-lg text-gray-600 mb-6 font-saans">
                  {featuredProject.description}
                </p>

                {/* Impact Indicators */}
                <div className="flex flex-wrap gap-6">
                  {Object.entries(featuredProject.impact).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="text-2xl font-bold text-purple-600 font-saans">{value}</div>
                      <div className="text-sm text-gray-500 capitalize font-saans">{key}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {otherProjects.map((project, index) => (
            <div key={project.id}>
              <div className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500">
                <div className="aspect-video relative overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>

                <div className="p-6">
                  <span className="text-sm font-medium text-purple-600 uppercase tracking-wide font-saans">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mt-2 mb-3 group-hover:text-purple-600 transition-colors font-saans">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4 font-saans">
                    {project.description}
                  </p>
                  
                  {/* Impact Indicators */}
                  <div className="flex gap-4">
                    {Object.entries(project.impact).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="text-lg font-bold text-purple-600 font-saans">{value}</div>
                        <div className="text-xs text-gray-500 capitalize font-saans">{key}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 