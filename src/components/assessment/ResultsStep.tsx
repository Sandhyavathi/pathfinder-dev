import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Trophy,
  Target,
  Clock,
  Rocket,
  Star,
  BookOpen,
  Code2,
  Users,
  TrendingUp,
  CheckCircle,
  Sparkles
} from "lucide-react";
import { AssessmentData } from "@/pages/Assessment";

interface ResultsStepProps {
  data: AssessmentData;
  onComplete: () => void;
  onPrev: () => void;
}

export function ResultsStep({ data, onComplete, onPrev }: ResultsStepProps) {
  // Generate personalized recommendations based on assessment data
  const getRecommendedPath = () => {
    if (data.experience === "none" || data.experience === "basic") {
      return {
        title: "Backend Fundamentals",
        level: "Beginner",
        duration: "3-4 months",
        description: "Start with the basics and build a solid foundation",
        projects: ["Task Manager API", "Personal Blog Backend"],
        skills: ["HTTP/REST APIs", "Database Basics", "Authentication"]
      };
    } else if (data.experience === "projects") {
      return {
        title: "Professional Backend Development", 
        level: "Intermediate",
        duration: "2-3 months",
        description: "Level up your skills with real-world projects",
        projects: ["E-commerce Platform", "Social Media API"],
        skills: ["Advanced APIs", "Database Design", "Security", "Testing"]
      };
    } else {
      return {
        title: "Enterprise Backend Systems",
        level: "Advanced", 
        duration: "2-3 months",
        description: "Master scalable, production-ready systems",
        projects: ["Microservices Platform", "Real-time Chat System"],
        skills: ["Microservices", "System Design", "Performance", "DevOps"]
      };
    }
  };

  const getTimeEstimate = () => {
    const pathDuration = getRecommendedPath().duration;
    const weeklyHours = data.weeklyHours;
    
    if (weeklyHours === "accelerated") return pathDuration.replace("3-4", "2-3").replace("2-3", "1-2");
    if (weeklyHours === "casual") return pathDuration.replace("2-3", "4-5").replace("3-4", "5-6");
    return pathDuration;
  };

  const recommendedPath = getRecommendedPath();
  const timeEstimate = getTimeEstimate();

  const getBackgroundLabel = (background: string) => {
    const labels: Record<string, string> = {
      student: "Student",
      professional: "Working Professional",
      "career-changer": "Career Changer", 
      "self-taught": "Self-taught Developer",
      beginner: "Complete Beginner"
    };
    return labels[background] || background;
  };

  const getExperienceLabel = (experience: string) => {
    const labels: Record<string, string> = {
      none: "New to Programming",
      basic: "Basic Understanding",
      projects: "Some Projects Completed",
      professional: "Professional Experience"
    };
    return labels[experience] || experience;
  };

  const getGoalsLabels = (goals: string[]) => {
    const labels: Record<string, string> = {
      job: "Get First Developer Job",
      startup: "Build Startup/Product",
      skills: "Add Backend Skills",
      personal: "Personal Projects",
      freelance: "Freelancing",
      academic: "Academic/Research"
    };
    return goals.map(goal => labels[goal] || goal);
  };

  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-4xl">
        <CardHeader className="text-center pb-6">
          <div className="animate-scale-in mb-4">
            <Trophy className="h-16 w-16 mx-auto text-primary mb-4" />
          </div>
          <CardTitle className="text-3xl bg-gradient-primary bg-clip-text text-transparent">
            Assessment Complete! 🎉
          </CardTitle>
          <p className="text-muted-foreground text-lg">
            Your personalized learning journey is ready!
          </p>
        </CardHeader>
        
        <CardContent className="space-y-8">
          {/* Summary Section */}
          <Card className="bg-gradient-subtle border-primary/20">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Target className="h-6 w-6 text-primary" />
                Based on your responses, here's what we learned about you:
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Background</h4>
                    <p className="text-lg">{getBackgroundLabel(data.background)}</p>
                    {data.backgroundDetails && (
                      <p className="text-sm text-muted-foreground">{data.backgroundDetails}</p>
                    )}
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Experience Level</h4>
                    <p className="text-lg">{getExperienceLabel(data.experience)}</p>
                    {data.languages.length > 0 && !data.languages.includes("None") && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {data.languages.map(lang => (
                          <Badge key={lang} variant="secondary" className="text-xs">{lang}</Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Learning Goals</h4>
                    <div className="space-y-1">
                      {getGoalsLabels(data.goals).map(goal => (
                        <div key={goal} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          <span className="text-sm">{goal}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Time Commitment</h4>
                    <p className="text-lg capitalize">{data.weeklyHours.replace('-', ' ')} pace</p>
                    {data.timeline && (
                      <p className="text-sm text-muted-foreground">Target: {data.timeline.replace('months', ' months').replace('year', ' year')}</p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recommended Learning Path */}
          <Card className="border-primary bg-gradient-primary text-primary-foreground">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold flex items-center gap-2">
                    <Rocket className="h-7 w-7" />
                    Your Recommended Learning Path
                  </h3>
                  <p className="opacity-90 mt-1">{recommendedPath.description}</p>
                </div>
                <Badge variant="secondary" className="text-lg px-3 py-1">
                  {recommendedPath.level}
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <BookOpen className="h-8 w-8 mx-auto mb-2 opacity-90" />
                  <h4 className="font-semibold">{recommendedPath.title}</h4>
                  <p className="text-sm opacity-75">Learning Path</p>
                </div>
                
                <div className="text-center">
                  <Clock className="h-8 w-8 mx-auto mb-2 opacity-90" />
                  <h4 className="font-semibold">{timeEstimate}</h4>
                  <p className="text-sm opacity-75">Estimated Duration</p>
                </div>
                
                <div className="text-center">
                  <Code2 className="h-8 w-8 mx-auto mb-2 opacity-90" />
                  <h4 className="font-semibold">{recommendedPath.projects.length} Projects</h4>
                  <p className="text-sm opacity-75">Hands-on Learning</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* First Project Preview */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Star className="h-6 w-6 text-primary" />
                Your First Project: {recommendedPath.projects[0]}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">What You'll Build:</h4>
                  <p className="text-muted-foreground text-sm mb-4">
                    {recommendedPath.projects[0] === "Task Manager API" 
                      ? "A complete REST API for managing tasks with user authentication, CRUD operations, and real-time updates."
                      : "An advanced backend system with complex features and professional-grade architecture."
                    }
                  </p>
                  
                  <h4 className="font-medium mb-2">Key Skills You'll Learn:</h4>
                  <div className="flex flex-wrap gap-1">
                    {recommendedPath.skills.map(skill => (
                      <Badge key={skill} variant="outline" className="text-xs">{skill}</Badge>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span>Progress</span>
                    <span>0%</span>
                  </div>
                  <Progress value={0} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    Ready to start your journey!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={onComplete}
              className="flex items-center gap-2 hover-scale"
            >
              <Sparkles className="h-5 w-5" />
              Start My Learning Journey!
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}