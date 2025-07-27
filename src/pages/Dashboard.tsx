import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  BookOpen,
  MessageSquare,
  Code2,
  Trophy,
  Clock,
  Target,
  TrendingUp,
  CheckCircle,
  Play,
  Calendar,
  Flame,
  Star,
  ArrowRight
} from "lucide-react";

const currentProgress = {
  overallProgress: 68,
  currentProject: "E-commerce Backend API",
  projectProgress: 45,
  learningStreak: 12,
  totalHours: 84,
  completedProjects: 3
};

const recentActivity = [
  {
    type: "chat",
    title: "Discussed database optimization with AI Mentor",
    time: "2 hours ago",
    icon: MessageSquare
  },
  {
    type: "project",
    title: "Completed user authentication module",
    time: "1 day ago",
    icon: CheckCircle
  },
  {
    type: "achievement",
    title: "Earned 'API Master' badge",
    time: "2 days ago",
    icon: Trophy
  },
  {
    type: "code",
    title: "Submitted payment processing code",
    time: "3 days ago",
    icon: Code2
  }
];

const quickActions = [
  {
    title: "Continue Current Project",
    description: "E-commerce Backend API - Payment Integration",
    action: "Continue",
    href: "/projects/ecommerce",
    icon: Play,
    variant: "hero" as const
  },
  {
    title: "Chat with AI Mentor",
    description: "Get instant help with your coding questions",
    action: "Start Chat",
    href: "/chat",
    icon: MessageSquare,
    variant: "default" as const
  },
  {
    title: "Browse New Projects",
    description: "Discover new challenges to boost your skills",
    action: "Explore",
    href: "/projects",
    icon: BookOpen,
    variant: "outline" as const
  }
];

const upcomingTasks = [
  {
    title: "Implement order validation logic",
    project: "E-commerce Backend",
    dueDate: "Today",
    priority: "high"
  },
  {
    title: "Write unit tests for payment module",
    project: "E-commerce Backend",
    dueDate: "Tomorrow",
    priority: "medium"
  },
  {
    title: "Deploy to staging environment",
    project: "E-commerce Backend",
    dueDate: "Friday",
    priority: "low"
  }
];

const skillsProgress = [
  { skill: "Node.js", progress: 85, level: "Advanced" },
  { skill: "Database Design", progress: 72, level: "Intermediate" },
  { skill: "API Development", progress: 90, level: "Advanced" },
  { skill: "System Architecture", progress: 45, level: "Beginner" }
];

export default function Dashboard() {
  return (
    <div className="container py-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back, Developer! 👋</h1>
        <p className="text-muted-foreground">
          Ready to continue your backend development journey? Let's see what's next.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-primary text-primary-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Overall Progress</p>
                <p className="text-3xl font-bold">{currentProgress.overallProgress}%</p>
              </div>
              <TrendingUp className="h-8 w-8 opacity-90" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Learning Streak</p>
                <p className="text-3xl font-bold flex items-center">
                  {currentProgress.learningStreak}
                  <Flame className="h-6 w-6 text-orange-500 ml-2" />
                </p>
              </div>
              <Calendar className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Hours</p>
                <p className="text-3xl font-bold">{currentProgress.totalHours}</p>
              </div>
              <Clock className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Projects Done</p>
                <p className="text-3xl font-bold">{currentProgress.completedProjects}</p>
              </div>
              <Trophy className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Current Project */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2" />
                Current Project
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">{currentProgress.currentProject}</h3>
                  <Badge variant="secondary">In Progress</Badge>
                </div>
                <Progress value={currentProgress.projectProgress} className="h-3" />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{currentProgress.projectProgress}% complete</span>
                  <span className="text-muted-foreground">Next: Payment Integration</span>
                </div>
                <Button className="w-full" variant="hero" asChild>
                  <Link to="/projects/ecommerce">
                    Continue Project
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <Card key={index} className="border-2 hover:border-primary/50 transition-colors">
                      <CardContent className="p-4 text-center">
                        <Icon className="h-8 w-8 mx-auto mb-3 text-primary" />
                        <h4 className="font-semibold mb-2">{action.title}</h4>
                        <p className="text-sm text-muted-foreground mb-4">{action.description}</p>
                        <Button size="sm" variant={action.variant} asChild className="w-full">
                          <Link to={action.href}>{action.action}</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Skills Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Star className="h-5 w-5 mr-2" />
                Skills Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {skillsProgress.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{skill.skill}</span>
                      <Badge variant={skill.level === "Advanced" ? "default" : skill.level === "Intermediate" ? "secondary" : "outline"}>
                        {skill.level}
                      </Badge>
                    </div>
                    <Progress value={skill.progress} className="h-2" />
                    <div className="text-sm text-muted-foreground text-right">
                      {skill.progress}%
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => {
                  const Icon = activity.icon;
                  return (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Icon className="h-4 w-4 text-primary" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{activity.title}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Tasks */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingTasks.map((task, index) => (
                  <div key={index} className="p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <Badge 
                        variant={task.priority === "high" ? "destructive" : task.priority === "medium" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {task.priority}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{task.dueDate}</span>
                    </div>
                    <p className="text-sm font-medium mb-1">{task.title}</p>
                    <p className="text-xs text-muted-foreground">{task.project}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}