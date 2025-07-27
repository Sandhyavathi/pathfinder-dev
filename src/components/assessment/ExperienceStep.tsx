import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Sparkles,
  BookOpen,
  Hammer,
  Monitor
} from "lucide-react";
import { AssessmentData } from "@/pages/Assessment";

interface ExperienceStepProps {
  data: AssessmentData;
  onUpdate: (updates: Partial<AssessmentData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const experienceOptions = [
  {
    value: "none",
    label: "Never coded before",
    description: "Complete beginner",
    icon: Sparkles
  },
  {
    value: "basic",
    label: "Basic understanding",
    description: "Tutorials, basic concepts",
    icon: BookOpen
  },
  {
    value: "projects",
    label: "Some projects completed",
    description: "Built simple applications",
    icon: Hammer
  },
  {
    value: "professional",
    label: "Professional experience",
    description: "Work or internship experience",
    icon: Monitor
  }
];

const languages = [
  "Python", "JavaScript", "Java", "C++", "Go", "PHP", "Ruby", "C#", "TypeScript", "Rust"
];

export function ExperienceStep({ data, onUpdate, onNext, onPrev }: ExperienceStepProps) {
  const handleLanguageChange = (language: string, checked: boolean) => {
    const updatedLanguages = checked 
      ? [...data.languages, language]
      : data.languages.filter(l => l !== language);
    onUpdate({ languages: updatedLanguages });
  };

  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">What's your programming background?</CardTitle>
          <p className="text-muted-foreground">
            Don't worry if you're just starting - we'll meet you where you are!
          </p>
        </CardHeader>
        
        <CardContent className="space-y-8">
          <RadioGroup 
            value={data.experience} 
            onValueChange={(value) => onUpdate({ experience: value })}
            className="space-y-4"
          >
            {experienceOptions.map((option) => (
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

          {data.experience && data.experience !== "none" && (
            <div className="animate-fade-in space-y-4">
              <Label className="text-base font-medium">
                Which programming languages have you used? (Select all that apply)
              </Label>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {languages.map((language) => (
                  <div key={language} className="flex items-center space-x-2">
                    <Checkbox 
                      id={language}
                      checked={data.languages.includes(language)}
                      onCheckedChange={(checked) => handleLanguageChange(language, checked as boolean)}
                    />
                    <Label htmlFor={language} className="text-sm cursor-pointer">
                      {language}
                    </Label>
                  </div>
                ))}
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="none"
                    checked={data.languages.includes("None")}
                    onCheckedChange={(checked) => handleLanguageChange("None", checked as boolean)}
                  />
                  <Label htmlFor="none" className="text-sm cursor-pointer">
                    None
                  </Label>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="other-languages">
                  Other languages not listed:
                </Label>
                <Input
                  id="other-languages"
                  placeholder="e.g., Swift, Kotlin, etc."
                  value={data.otherLanguages}
                  onChange={(e) => onUpdate({ otherLanguages: e.target.value })}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}