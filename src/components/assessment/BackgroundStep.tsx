import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  GraduationCap, 
  Briefcase, 
  RefreshCw, 
  Wrench, 
  Sprout,
  ChevronRight 
} from "lucide-react";
import { AssessmentData } from "@/pages/Assessment";

interface BackgroundStepProps {
  data: AssessmentData;
  onUpdate: (updates: Partial<AssessmentData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const backgroundOptions = [
  {
    value: "student",
    label: "Student",
    description: "College/University student",
    icon: GraduationCap
  },
  {
    value: "professional",
    label: "Working Professional", 
    description: "Currently employed",
    icon: Briefcase
  },
  {
    value: "career-changer",
    label: "Career Changer",
    description: "Switching to tech",
    icon: RefreshCw
  },
  {
    value: "self-taught",
    label: "Self-taught Developer",
    description: "Learning independently", 
    icon: Wrench
  },
  {
    value: "beginner",
    label: "Complete Beginner",
    description: "New to programming",
    icon: Sprout
  }
];

export function BackgroundStep({ data, onUpdate, onNext, onPrev }: BackgroundStepProps) {
  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">What's your current situation?</CardTitle>
          <p className="text-muted-foreground">
            This helps us understand your starting point and time availability
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <RadioGroup 
            value={data.background} 
            onValueChange={(value) => onUpdate({ background: value })}
            className="space-y-4"
          >
            {backgroundOptions.map((option) => (
              <div key={option.value} className="hover-scale">
                <Label 
                  htmlFor={option.value}
                  className="flex items-center space-x-4 p-4 border rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors"
                >
                  <RadioGroupItem value={option.value} id={option.value} />
                  <option.icon className="h-6 w-6 text-primary" />
                  <div className="flex-1">
                    <div className="font-medium">{option.label}</div>
                    <div className="text-sm text-muted-foreground">{option.description}</div>
                  </div>
                </Label>
              </div>
            ))}
          </RadioGroup>

          {data.background && (
            <div className="animate-fade-in space-y-2">
              <Label htmlFor="background-details">
                Tell us more about your current role/studies (optional)
              </Label>
              <Input
                id="background-details"
                placeholder="e.g., Computer Science student, Marketing professional, etc."
                value={data.backgroundDetails}
                onChange={(e) => onUpdate({ backgroundDetails: e.target.value })}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}