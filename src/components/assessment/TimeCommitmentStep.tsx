import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Clock,
  Calendar,
  Flame,
  Zap
} from "lucide-react";
import { AssessmentData } from "@/pages/Assessment";

interface TimeCommitmentStepProps {
  data: AssessmentData;
  onUpdate: (updates: Partial<AssessmentData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const timeCommitmentOptions = [
  {
    value: "casual",
    label: "2-5 hours/week",
    description: "Casual pace - Perfect for busy schedules",
    icon: Clock,
    color: "text-blue-500"
  },
  {
    value: "steady",
    label: "5-10 hours/week",
    description: "Steady progress - Consistent learning",
    icon: Calendar,
    color: "text-green-500"
  },
  {
    value: "intensive",
    label: "10-20 hours/week",
    description: "Intensive pace - Faster results",
    icon: Flame,
    color: "text-orange-500"
  },
  {
    value: "accelerated",
    label: "20+ hours/week",
    description: "Accelerated - Full commitment",
    icon: Zap,
    color: "text-red-500"
  }
];

const daysOfWeek = [
  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
];

const timePreferences = [
  { value: "morning", label: "Morning (6AM - 12PM)" },
  { value: "afternoon", label: "Afternoon (12PM - 6PM)" },
  { value: "evening", label: "Evening (6PM - 10PM)" },
  { value: "night", label: "Night (10PM - 2AM)" }
];

export function TimeCommitmentStep({ data, onUpdate, onNext, onPrev }: TimeCommitmentStepProps) {
  const handleDayChange = (day: string, checked: boolean) => {
    const updatedDays = checked 
      ? [...data.preferredDays, day]
      : data.preferredDays.filter(d => d !== day);
    onUpdate({ preferredDays: updatedDays });
  };

  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">How much time can you dedicate to learning each week?</CardTitle>
          <p className="text-muted-foreground">
            Be realistic - we'll adjust your learning plan accordingly
          </p>
        </CardHeader>
        
        <CardContent className="space-y-8">
          <RadioGroup 
            value={data.weeklyHours} 
            onValueChange={(value) => onUpdate({ weeklyHours: value })}
            className="space-y-4"
          >
            {timeCommitmentOptions.map((option) => (
              <div key={option.value} className="hover-scale">
                <Label 
                  htmlFor={option.value}
                  className="flex items-center space-x-4 p-4 border rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors"
                >
                  <RadioGroupItem value={option.value} id={option.value} />
                  <option.icon className={`h-6 w-6 ${option.color}`} />
                  <div className="flex-1">
                    <div className="font-medium">{option.label}</div>
                    <div className="text-sm text-muted-foreground">{option.description}</div>
                  </div>
                </Label>
              </div>
            ))}
          </RadioGroup>

          {data.weeklyHours && (
            <div className="animate-fade-in space-y-6">
              <div className="space-y-3">
                <Label className="text-base font-medium">
                  What days work best for you? (Optional)
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {daysOfWeek.map((day) => (
                    <div key={day} className="flex items-center space-x-2">
                      <Checkbox 
                        id={day}
                        checked={data.preferredDays.includes(day)}
                        onCheckedChange={(checked) => handleDayChange(day, checked as boolean)}
                      />
                      <Label htmlFor={day} className="text-sm cursor-pointer">
                        {day.slice(0, 3)}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-base font-medium">
                  What time of day do you learn best? (Optional)
                </Label>
                <RadioGroup 
                  value={data.preferredTime} 
                  onValueChange={(value) => onUpdate({ preferredTime: value })}
                  className="space-y-2"
                >
                  {timePreferences.map((option) => (
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