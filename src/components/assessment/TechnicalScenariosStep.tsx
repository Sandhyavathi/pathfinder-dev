import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { 
  Database,
  Users,
  Shield,
  HelpCircle
} from "lucide-react";
import { AssessmentData } from "@/pages/Assessment";

interface TechnicalScenariosStepProps {
  data: AssessmentData;
  onUpdate: (updates: Partial<AssessmentData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const scenarios = [
  {
    id: "scenario1",
    title: "Application Architecture",
    question: "A mobile app needs to store user profiles and posts. What would you need to build?",
    icon: Database,
    options: [
      { value: "database", label: "Database only" },
      { value: "api", label: "API endpoints only" },
      { value: "auth", label: "Authentication system only" },
      { value: "all", label: "All of the above" },
      { value: "unsure", label: "I'm not sure yet" }
    ]
  },
  {
    id: "scenario2", 
    title: "Performance & Scaling",
    question: "1000 users are trying to access your app at once. What might be a concern?",
    icon: Users,
    options: [
      { value: "crashes", label: "Server crashes" },
      { value: "slow", label: "Slow response times" },
      { value: "database", label: "Database overload" },
      { value: "all", label: "All of the above" },
      { value: "learn", label: "I need to learn about this" }
    ]
  },
  {
    id: "scenario3",
    title: "Security Basics", 
    question: "A user's password should be stored:",
    icon: Shield,
    options: [
      { value: "plain", label: "As plain text" },
      { value: "encrypted", label: "Encrypted" },
      { value: "hashed", label: "Hashed" },
      { value: "unsure", label: "I'm not sure about security yet" }
    ]
  }
];

export function TechnicalScenariosStep({ data, onUpdate, onNext, onPrev }: TechnicalScenariosStepProps) {
  const handleScenarioChange = (scenarioId: string, value: string) => {
    onUpdate({ [scenarioId]: value });
  };

  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl flex items-center justify-center gap-2">
            <HelpCircle className="h-7 w-7 text-primary" />
            Technical Scenarios
          </CardTitle>
          <p className="text-muted-foreground">
            Let's gauge your problem-solving approach with a few scenarios. No wrong answers!
          </p>
          <Badge variant="secondary" className="mx-auto">
            Choose the best answer for each scenario
          </Badge>
        </CardHeader>
        
        <CardContent className="space-y-8">
          {scenarios.map((scenario, index) => (
            <div key={scenario.id} className="space-y-4 p-4 border rounded-lg bg-secondary/20">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                  {index + 1}
                </div>
                <scenario.icon className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-semibold">{scenario.title}</h3>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground ml-11 mb-4">
                {scenario.question}
              </p>
              
              <RadioGroup 
                value={data[scenario.id as keyof AssessmentData] as string}
                onValueChange={(value) => handleScenarioChange(scenario.id, value)}
                className="ml-11 space-y-2"
              >
                {scenario.options.map((option) => (
                  <div key={option.value}>
                    <Label 
                      htmlFor={`${scenario.id}-${option.value}`}
                      className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors"
                    >
                      <RadioGroupItem 
                        value={option.value} 
                        id={`${scenario.id}-${option.value}`} 
                      />
                      <span className="text-sm">{option.label}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ))}

          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-start gap-3">
              <HelpCircle className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>Remember:</strong> These questions help us understand your current knowledge level. 
                  There are no wrong answers - we'll teach you everything you need to know!
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}