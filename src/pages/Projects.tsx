import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Clock,
  Users,
  Star,
  Search,
  Filter,
  Play,
  CheckCircle,
  Code2,
  Database,
  Server,
  Shield,
  Zap,
  TrendingUp,
  Award,
  BookOpen
} from "lucide-react";

const projects = [
  {
    id: "task-manager",
    title: "Task Manager API",
    description: "Build a complete RESTful API with user authentication, CRUD operations, and real-time updates using WebSocket connections.",
    difficulty: "Beginner",
    duration: "2 weeks",
    technologies: ["Node.js", "Express", "MongoDB", "JWT", "Socket.io"],
    category: "Web APIs",
    rating: 4.8,
    students: 1243,
    progress: 0,
    status: "available",
    features: [
      "User registration and authentication",
      "CRUD operations for tasks",
      "Real-time updates with WebSocket",
      "Input validation and error handling",
      "API documentation with Swagger"
    ],
    learningOutcomes: [
      "REST API design principles",
      "Authentication with JWT",
      "Database modeling with MongoDB",
      "Real-time communication",
      "API testing and documentation"
    ]
  },
  {
    id: "ecommerce-backend",
    title: "E-commerce Backend",
    description: "Create a scalable e-commerce platform with payment processing, inventory management, and order tracking.",
    difficulty: "Intermediate",
    duration: "4 weeks",
    technologies: ["Python", "Django", "PostgreSQL", "Redis", "Stripe"],
    category: "E-commerce",
    rating: 4.9,
    students: 856,
    progress: 45,
    status: "in-progress",
    features: [
      "Product catalog management",
      "Shopping cart and checkout",
      "Payment processing with Stripe",
      "Inventory tracking",
      "Order management system"
    ],
    learningOutcomes: [
      "Django framework mastery",
      "Database relationships and optimization",
      "Payment integration",
      "Caching strategies with Redis",
      "Security best practices"
    ]
  },
  {
    id: "social-platform",
    title: "Social Media Platform",
    description: "Develop a complete social platform with feeds, messaging, content moderation, and scalable architecture.",
    difficulty: "Advanced",
    duration: "6 weeks",
    technologies: ["Go", "GraphQL", "PostgreSQL", "Redis", "AWS"],
    category: "Social Media",
    rating: 4.7,
    students: 432,
    progress: 0,
    status: "available",
    features: [
      "User profiles and authentication",
      "News feed algorithm",
      "Real-time messaging",
      "Content moderation system",
      "Scalable microservices architecture"
    ],
    learningOutcomes: [
      "Microservices architecture",
      "GraphQL API design",
      "Real-time systems",
      "Content moderation",
      "Scalability patterns"
    ]
  },
  {
    id: "api-gateway",
    title: "API Gateway Service",
    description: "Build a robust API gateway with rate limiting, authentication, load balancing, and monitoring.",
    difficulty: "Advanced",
    duration: "3 weeks",
    technologies: ["Node.js", "Redis", "Docker", "NGINX", "Prometheus"],
    category: "Infrastructure",
    rating: 4.6,
    students: 324,
    progress: 0,
    status: "available",
    features: [
      "Request routing and load balancing",
      "Rate limiting and throttling",
      "Authentication and authorization",
      "API monitoring and analytics",
      "Circuit breaker pattern"
    ],
    learningOutcomes: [
      "API gateway patterns",
      "Load balancing strategies",
      "Monitoring and observability",
      "Docker containerization",
      "System reliability"
    ]
  },
  {
    id: "blockchain-api",
    title: "Blockchain Data API",
    description: "Create a high-performance API for blockchain data with caching, WebSocket feeds, and analytics.",
    difficulty: "Advanced",
    duration: "5 weeks",
    technologies: ["Rust", "PostgreSQL", "Redis", "WebSocket", "Docker"],
    category: "Blockchain",
    rating: 4.5,
    students: 198,
    progress: 0,
    status: "available",
    features: [
      "Blockchain data ingestion",
      "Real-time price feeds",
      "Historical data analytics",
      "High-performance caching",
      "WebSocket subscriptions"
    ],
    learningOutcomes: [
      "High-performance systems with Rust",
      "Blockchain data structures",
      "Real-time data streaming",
      "Performance optimization",
      "System monitoring"
    ]
  },
  {
    id: "ml-api",
    title: "Machine Learning API",
    description: "Build a scalable ML inference API with model versioning, A/B testing, and performance monitoring.",
    difficulty: "Intermediate",
    duration: "3 weeks",
    technologies: ["Python", "FastAPI", "TensorFlow", "Docker", "Kubernetes"],
    category: "Machine Learning",
    rating: 4.8,
    students: 567,
    progress: 0,
    status: "available",
    features: [
      "Model serving and inference",
      "A/B testing framework",
      "Model versioning",
      "Performance monitoring",
      "Auto-scaling with Kubernetes"
    ],
    learningOutcomes: [
      "ML model deployment",
      "FastAPI framework",
      "Container orchestration",
      "A/B testing strategies",
      "MLOps practices"
    ]
  }
];

const categories = ["All", "Web APIs", "E-commerce", "Social Media", "Infrastructure", "Blockchain", "Machine Learning"];
const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

export default function Projects() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [activeTab, setActiveTab] = useState("all");

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || project.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === "All" || project.difficulty === selectedDifficulty;
    const matchesTab = activeTab === "all" || 
                      (activeTab === "in-progress" && project.status === "in-progress") ||
                      (activeTab === "available" && project.status === "available") ||
                      (activeTab === "completed" && project.status === "completed");
    
    return matchesSearch && matchesCategory && matchesDifficulty && matchesTab;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "secondary";
      case "Intermediate": return "default";
      case "Advanced": return "destructive";
      default: return "secondary";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return CheckCircle;
      case "in-progress": return Play;
      default: return BookOpen;
    }
  };

  return (
    <div className="container py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Learning Projects</h1>
        <p className="text-muted-foreground">
          Master backend development through hands-on projects designed by industry experts
        </p>
      </div>

      {/* Search and Filters */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                {difficulties.map(difficulty => (
                  <SelectItem key={difficulty} value={difficulty}>{difficulty}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Project Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:grid-cols-3">
          <TabsTrigger value="all">All Projects</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="available">Available</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProjects.map((project) => {
              const StatusIcon = getStatusIcon(project.status);
              return (
                <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant={getDifficultyColor(project.difficulty) as any}>
                        {project.difficulty}
                      </Badge>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        {project.duration}
                      </div>
                    </div>
                    
                    <CardTitle className="flex items-center text-xl">
                      <StatusIcon className="h-5 w-5 mr-2 text-primary" />
                      {project.title}
                    </CardTitle>
                    
                    <p className="text-muted-foreground text-sm">{project.description}</p>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Progress for in-progress projects */}
                    {project.status === "in-progress" && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                      </div>
                    )}

                    {/* Technologies */}
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Technologies</h4>
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.map((tech) => (
                          <Badge key={tech} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 mr-1 fill-current text-yellow-500" />
                        {project.rating}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {project.students} students
                      </div>
                    </div>

                    {/* Action Button */}
                    <Button 
                      className="w-full" 
                      variant={project.status === "in-progress" ? "hero" : "default"}
                    >
                      {project.status === "in-progress" ? "Continue Project" : "Start Project"}
                      {project.status === "in-progress" ? <Play className="h-4 w-4 ml-2" /> : <Zap className="h-4 w-4 ml-2" />}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredProjects.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <Code2 className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No projects found</h3>
                <p className="text-muted-foreground">Try adjusting your search criteria or filters</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Learning Path Suggestion */}
      <Card className="bg-gradient-primary text-primary-foreground">
        <CardContent className="p-8">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">Not sure where to start?</h3>
              <p className="opacity-90">
                Take our skill assessment to get a personalized learning path recommendation
              </p>
            </div>
            <Button size="lg" variant="secondary">
              <TrendingUp className="h-5 w-5 mr-2" />
              Take Assessment
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}