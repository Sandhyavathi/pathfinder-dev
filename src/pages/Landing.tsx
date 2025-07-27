import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  Code2,
  MessageSquare,
  BookOpen,
  Trophy,
  Users,
  Zap,
  CheckCircle,
  ArrowRight,
  Star,
  Target,
  Brain,
  Rocket,
  Clock,
  Award,
  TrendingUp
} from "lucide-react";

const features = [
  {
    icon: MessageSquare,
    title: "AI-Powered Mentoring",
    description: "Get personalized guidance from an intelligent AI mentor that adapts to your learning style and pace."
  },
  {
    icon: Code2,
    title: "Hands-on Projects",
    description: "Build real-world applications with step-by-step guidance and immediate feedback on your code."
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description: "Visualize your growth with detailed analytics, skill assessments, and achievement milestones."
  },
  {
    icon: Target,
    title: "Personalized Learning",
    description: "Curriculum adapts to your background, goals, and learning preferences for optimal results."
  },
  {
    icon: Users,
    title: "Expert Community",
    description: "Connect with fellow learners and get support from experienced backend developers."
  },
  {
    icon: Award,
    title: "Industry Recognition",
    description: "Earn certificates and badges that showcase your skills to potential employers."
  }
];

const projects = [
  {
    title: "Task Manager API",
    description: "Build a RESTful API with authentication, CRUD operations, and real-time updates.",
    difficulty: "Beginner",
    duration: "2 weeks",
    technologies: ["Node.js", "Express", "MongoDB"]
  },
  {
    title: "E-commerce Backend",
    description: "Create a scalable e-commerce platform with payment processing and inventory management.",
    difficulty: "Intermediate",
    duration: "4 weeks",
    technologies: ["Python", "Django", "PostgreSQL"]
  },
  {
    title: "Social Media Platform",
    description: "Develop a complete social platform with feeds, messaging, and content moderation.",
    difficulty: "Advanced",
    duration: "6 weeks",
    technologies: ["Go", "GraphQL", "Redis"]
  }
];

const stats = [
  { label: "Students Trained", value: "10,000+" },
  { label: "Projects Completed", value: "25,000+" },
  { label: "Success Rate", value: "94%" },
  { label: "Average Salary Increase", value: "$35,000" }
];

export default function Landing() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-subtle overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25" />
        <div className="container relative">
          <div className="mx-auto max-w-4xl text-center">
            <Badge variant="secondary" className="mb-6 px-4 py-2">
              <Zap className="h-4 w-4 mr-2" />
              AI-Powered Learning Platform
            </Badge>
            
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl mb-6 animate-fade-in">
              Master Backend Development with{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Your AI Mentor
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-slide-up">
              Transform into a professional backend developer through personalized AI mentoring, 
              hands-on projects, and real-world experience. Learn at your own pace with intelligent guidance.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-slide-up">
              <Button size="xl" variant="hero" asChild>
                <Link to="/dashboard">
                  Start Learning Free
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button size="xl" variant="outline" asChild>
                <Link to="/projects">
                  Explore Projects
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
              {stats.map((stat, index) => (
                <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose DevMentor?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered platform provides everything you need to become a skilled backend developer
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 bg-card/50 backdrop-blur">
                  <CardContent className="p-0">
                    <div className="flex items-center mb-4">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mr-4">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold">{feature.title}</h3>
                    </div>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 lg:py-32 bg-muted/50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Hands-on Learning Projects</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Build real-world applications that prepare you for professional development
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant={project.difficulty === "Beginner" ? "secondary" : project.difficulty === "Intermediate" ? "default" : "destructive"}>
                      {project.difficulty}
                    </Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />
                      {project.duration}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  
                  <Button className="w-full" variant="outline">
                    Start Project
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-gradient-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of developers who have transformed their careers with DevMentor
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="xl" variant="secondary" asChild>
              <Link to="/dashboard">
                Get Started Free
                <Rocket className="h-5 w-5" />
              </Link>
            </Button>
            <Button size="xl" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
              <Link to="/chat">
                Talk to AI Mentor
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}