import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Target,
  Rocket,
  TrendingUp,
  Palette,
  DollarSign,
  BookOpen
} from "lucide-react";
import { AssessmentData } from "@/pages/Assessment";

interface GoalsStepProps {
  data: AssessmentData;
  onUpdate: (updates: Partial<AssessmentData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const goalOptions = [
  {
    value: "job",
    label: "Get my first developer job",
    icon: Target
  },
  {
    value: "startup",
    label: "Build my own startup/product",
    icon: Rocket
  },
  {
    value: "skills",
    label: "Add backend skills to my current role",
    icon: TrendingUp
  },
  {
    value: "personal",
    label: "Learn for personal projects",
    icon: Palette
  },
  {
    value: "freelance",
    label: "Freelance and consulting opportunities",
    icon: DollarSign
  },
  {
    value: "academic",
    label: "Academic/research purposes",
    icon: BookOpen
  }
];

const timelineOptions = [
  { value: "3months", label: "3 months" },
  { value: "6months", label: "6 months" },
  { value: "1year", label: "1 year" },
  { value: "2years", label: "2+ years" },
  { value: "flexible", label: "No specific timeline" }
];

export function GoalsStep({ data, onUpdate, onNext, onPrev }: GoalsStepProps) {
  const handleGoalChange = (goal: string, checked: boolean) => {
    const updatedGoals = checked 
      ? [...data.goals, goal]
      : data.goals.filter(g => g !== goal);
    onUpdate({ goals: updatedGoals });
  };

  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">What do you want to achieve with backend development?</CardTitle>
          <p className="text-muted-foreground">
            Your goals help us customize your learning path and project recommendations
          </p>
        </CardHeader>
        
        <CardContent className="space-y-8">
          <div className="space-y-4">
            <Label className="text-base font-medium">
              Select all that apply:
            </Label>
            
            <div className="space-y-3">
              {goalOptions.map((goal) => (
                <div key={goal.value} className="hover-scale">
                  <Label 
                    htmlFor={goal.value}
                    className="flex items-center space-x-4 p-4 border rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors"
                  >
                    <Checkbox 
                      id={goal.value}
                      checked={data.goals.includes(goal.value)}
                      onCheckedChange={(checked) => handleGoalChange(goal.value, checked as boolean)}
                    />
                    <goal.icon className="h-6 w-6 text-primary" />
                    <div className="flex-1">
                      <div className="font-medium">{goal.label}</div>
                    </div>
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {data.goals.length > 0 && (
            <div className="animate-fade-in space-y-4">
              <div className="space-y-2">
                <Label htmlFor="specific-goals">
                  Describe your specific goals in detail:
                </Label>
                <Textarea
                  id="specific-goals"
                  placeholder="e.g., I want to build a social media app for my community, or I'm looking to transition from frontend to full-stack development..."
                  value={data.specificGoals}
                  onChange={(e) => onUpdate({ specificGoals: e.target.value })}
                  rows={4}
                />
              </div>

              <div className="space-y-3">
                <Label className="text-base font-medium">
                  What's your target timeline?
                </Label>
                <RadioGroup 
                  value={data.timeline} 
                  onValueChange={(value) => onUpdate({ timeline: value })}
                  className="grid grid-cols-1 md:grid-cols-2 gap-3"
                >
                  {timelineOptions.map((option) => (
                    <div key={option.value}>
                      <Label 
                        htmlFor={option.value}
                        className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors"
                      >
                        <RadioGroupItem value={option.value} id={option.value} />
                        <span>{option.label}</span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}