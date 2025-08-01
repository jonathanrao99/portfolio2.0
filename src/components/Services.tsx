"use client";

interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  caseStudy?: {
    title: string;
    description: string;
    result: string;
  };
}

const services: Service[] = [
  {
    id: "1",
    title: "Web Development",
    description: "Full-stack web applications with modern technologies and best practices",
    features: [
      "React, Next.js, and TypeScript",
      "Responsive design and mobile-first approach",
      "Performance optimization and SEO",
      "Database design and API development",
      "Deployment and CI/CD pipelines"
    ],
    caseStudy: {
      title: "E-commerce Platform",
      description: "Built a complete online store with payment processing and inventory management",
      result: "Increased conversion rate by 40% and reduced load times by 60%"
    }
  },
  {
    id: "2",
    title: "App Development",
    description: "Cross-platform mobile applications for iOS and Android",
    features: [
      "React Native and Flutter development",
      "Native iOS and Android apps",
      "Push notifications and offline functionality",
      "App store optimization and deployment",
      "Performance monitoring and analytics"
    ],
    caseStudy: {
      title: "Food Delivery App",
      description: "Developed a real-time food delivery app with GPS tracking",
      result: "Processed 10,000+ orders with 99.9% uptime"
    }
  },
  {
    id: "3",
    title: "UI/UX Design",
    description: "User-centered design solutions that enhance user experience",
    features: [
      "User research and persona development",
      "Wireframing and prototyping",
      "Visual design and brand identity",
      "Usability testing and iteration",
      "Design systems and component libraries"
    ],
    caseStudy: {
      title: "Banking App Redesign",
      description: "Redesigned a banking app to improve user engagement and reduce support calls",
      result: "Increased user satisfaction by 85% and reduced support tickets by 60%"
    }
  }
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-saans">
            Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-saans">
            Comprehensive solutions for your digital needs, from concept to deployment.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.id} className="group">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 h-full">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors font-saans">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 mb-6 font-saans">
                  {service.description}
                </p>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3 font-saans">What's included:</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-purple-600 mt-1">•</span>
                        <span className="text-sm text-gray-600 font-saans">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Case Study */}
                {service.caseStudy && (
                  <div className="bg-purple-50 rounded-xl p-4">
                    <h5 className="text-sm font-semibold text-purple-900 mb-2 font-saans">
                      Case Study: {service.caseStudy.title}
                    </h5>
                    <p className="text-xs text-purple-800 mb-2 font-saans">
                      {service.caseStudy.description}
                    </p>
                    <p className="text-xs font-medium text-purple-900 font-saans">
                      Result: {service.caseStudy.result}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 