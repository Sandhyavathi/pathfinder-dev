import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  User,
  Mail,
  MapPin,
  Calendar,
  Star,
  Trophy,
  Code2,
  Clock,
  Target,
  Edit,
  Settings,
  Award,
  TrendingUp,
  BookOpen
} from "lucide-react";

const userProfile = {
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  location: "San Francisco, CA",
  joinDate: "March 2024",
  bio: "Passionate about building scalable backend systems. Currently transitioning from frontend to full-stack development.",
  learningGoals: "Master Node.js, Python, and cloud architecture within 6 months",
  preferredLanguages: ["JavaScript", "Python", "Go"],
  timeCommitment: "10-15 hours per week",
  experience: "2 years frontend, 6 months backend"
};

const achievements = [
  {
    id: 1,
    title: "First Steps",
    description: "Completed your first project",
    icon: Star,
    earned: true,
    date: "March 15, 2024"
  },
  {
    id: 2,
    title: "API Master",
    description: "Built 5 REST APIs",
    icon: Code2,
    earned: true,
    date: "April 2, 2024"
  },
  {
    id: 3,
    title: "Database Pro",
    description: "Mastered database design",
    icon: Award,
    earned: true,
    date: "April 20, 2024"
  },
  {
    id: 4,
    title: "Speed Learner",
    description: "7-day learning streak",
    icon: TrendingUp,
    earned: false,
    progress: 60
  },
  {
    id: 5,
    title: "Code Reviewer",
    description: "Received 10 AI code reviews",
    icon: BookOpen,
    earned: false,
    progress: 80
  }
];

const skillsData = [
  { skill: "Node.js", level: 85, category: "Backend" },
  { skill: "Python", level: 72, category: "Backend" },
  { skill: "Database Design", level: 78, category: "Database" },
  { skill: "API Development", level: 90, category: "Backend" },
  { skill: "Docker", level: 45, category: "DevOps" },
  { skill: "AWS", level: 30, category: "Cloud" },
  { skill: "System Design", level: 40, category: "Architecture" },
  { skill: "Testing", level: 65, category: "Quality" }
];

const learningStats = {
  totalHours: 156,
  projectsCompleted: 3,
  currentStreak: 5,
  averageSessionTime: "2.5 hours",
  weeklyGoal: 12,
  weeklyProgress: 8.5
};

export default function Profile() {
  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Sidebar - Profile Info */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="text-center pb-4">
              <Avatar className="h-24 w-24 mx-auto mb-4">
                <AvatarFallback className="bg-gradient-primary text-primary-foreground text-2xl">
                  AJ
                </AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-bold">{userProfile.name}</h2>
              <p className="text-muted-foreground">Backend Developer in Training</p>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                  {userProfile.email}
                </div>
                <div className="flex items-center text-sm">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  {userProfile.location}
                </div>
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  Joined {userProfile.joinDate}
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="font-semibold mb-2">Learning Stats</h3>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">{learningStats.totalHours}</div>
                    <div className="text-xs text-muted-foreground">Total Hours</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">{learningStats.projectsCompleted}</div>
                    <div className="text-xs text-muted-foreground">Projects Done</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">{learningStats.currentStreak}</div>
                    <div className="text-xs text-muted-foreground">Day Streak</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">{learningStats.averageSessionTime}</div>
                    <div className="text-xs text-muted-foreground">Avg Session</div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="font-semibold mb-2">Weekly Goal</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{learningStats.weeklyProgress} / {learningStats.weeklyGoal} hours</span>
                    <span>{Math.round((learningStats.weeklyProgress / learningStats.weeklyGoal) * 100)}%</span>
                  </div>
                  <Progress value={(learningStats.weeklyProgress / learningStats.weeklyGoal) * 100} className="h-2" />
                </div>
              </div>

              <Button className="w-full" variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Bio & Goals */}
              <Card>
                <CardHeader>
                  <CardTitle>About</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Bio</Label>
                    <p className="text-sm text-muted-foreground mt-1">{userProfile.bio}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Learning Goals</Label>
                    <p className="text-sm text-muted-foreground mt-1">{userProfile.learningGoals}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Experience</Label>
                    <p className="text-sm text-muted-foreground mt-1">{userProfile.experience}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Preferred Languages */}
              <Card>
                <CardHeader>
                  <CardTitle>Preferred Technologies</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {userProfile.preferredLanguages.map((lang) => (
                      <Badge key={lang} variant="secondary">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Achievements */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Achievements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {achievements.filter(a => a.earned).slice(0, 3).map((achievement) => {
                      const Icon = achievement.icon;
                      return (
                        <div key={achievement.id} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{achievement.title}</h4>
                            <p className="text-sm text-muted-foreground">{achievement.description}</p>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {achievement.date}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="skills" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Skill Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {skillsData.map((skill, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-medium">{skill.skill}</span>
                            <Badge variant="outline" className="ml-2 text-xs">
                              {skill.category}
                            </Badge>
                          </div>
                          <span className="text-sm text-muted-foreground">{skill.level}%</span>
                        </div>
                        <Progress value={skill.level} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>All Achievements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {achievements.map((achievement) => {
                      const Icon = achievement.icon;
                      return (
                        <Card key={achievement.id} className={`p-4 ${
                          achievement.earned ? "bg-primary/5 border-primary/20" : "bg-muted/50"
                        }`}>
                          <div className="flex items-start space-x-3">
                            <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
                              achievement.earned ? "bg-primary/10" : "bg-muted"
                            }`}>
                              <Icon className={`h-6 w-6 ${
                                achievement.earned ? "text-primary" : "text-muted-foreground"
                              }`} />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium">{achievement.title}</h4>
                              <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                              {achievement.earned ? (
                                <Badge variant="secondary" className="text-xs">
                                  Earned {achievement.date}
                                </Badge>
                              ) : (
                                <div className="space-y-1">
                                  <div className="flex justify-between text-xs">
                                    <span>Progress</span>
                                    <span>{achievement.progress}%</span>
                                  </div>
                                  <Progress value={achievement.progress} className="h-1" />
                                </div>
                              )}
                            </div>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" defaultValue={userProfile.name} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue={userProfile.email} />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea id="bio" defaultValue={userProfile.bio} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="goals">Learning Goals</Label>
                    <Textarea id="goals" defaultValue={userProfile.learningGoals} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Time Commitment</Label>
                      <Select defaultValue={userProfile.timeCommitment}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5-10 hours per week">5-10 hours per week</SelectItem>
                          <SelectItem value="10-15 hours per week">10-15 hours per week</SelectItem>
                          <SelectItem value="15-20 hours per week">15-20 hours per week</SelectItem>
                          <SelectItem value="20+ hours per week">20+ hours per week</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" defaultValue={userProfile.location} />
                    </div>
                  </div>

                  <Button>
                    <Settings className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}