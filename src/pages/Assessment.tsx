import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronRight, 
  ChevronLeft, 
  Clock, 
  Sparkles,
  GraduationCap,
  Briefcase,
  RefreshCw,
  Wrench,
  Sprout,
  Target,
  Rocket,
  TrendingUp,
  Palette,
  DollarSign,
  BookOpen,
  Calendar,
  Users,
  Database,
  Shield,
  Server,
  CheckCircle,
  Zap
} from "lucide-react";
import { WelcomeStep } from "@/components/assessment/WelcomeStep";
import { BackgroundStep } from "@/components/assessment/BackgroundStep";
import { ExperienceStep } from "@/components/assessment/ExperienceStep";
import { GoalsStep } from "@/components/assessment/GoalsStep";
import { TimeCommitmentStep } from "@/components/assessment/TimeCommitmentStep";
import { TechnicalScenariosStep } from "@/components/assessment/TechnicalScenariosStep";
import { ResultsStep } from "@/components/assessment/ResultsStep";

export interface AssessmentData {
  background: string;
  backgroundDetails: string;
  experience: string;
  languages: string[];
  otherLanguages: string;
  goals: string[];
  specificGoals: string;
  timeline: string;
  weeklyHours: string;
  preferredDays: string[];
  preferredTime: string;
  scenario1: string;
  scenario2: string;
  scenario3: string;
}

const initialData: AssessmentData = {
  background: "",
  backgroundDetails: "",
  experience: "",
  languages: [],
  otherLanguages: "",
  goals: [],
  specificGoals: "",
  timeline: "",
  weeklyHours: "",
  preferredDays: [],
  preferredTime: "",
  scenario1: "",
  scenario2: "",
  scenario3: "",
};

export default function Assessment() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [assessmentData, setAssessmentData] = useState<AssessmentData>(initialData);
  const [isCompleted, setIsCompleted] = useState(false);

  const totalSteps = 7; // Including welcome and results
  const progress = (currentStep / (totalSteps - 1)) * 100;

  // Load saved progress from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem("assessment-progress");
    const savedStep = localStorage.getItem("assessment-step");
    
    if (savedData) {
      setAssessmentData(JSON.parse(savedData));
    }
    if (savedStep) {
      setCurrentStep(parseInt(savedStep));
    }
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem("assessment-progress", JSON.stringify(assessmentData));
    localStorage.setItem("assessment-step", currentStep.toString());
  }, [assessmentData, currentStep]);

  const updateAssessmentData = (updates: Partial<AssessmentData>) => {
    setAssessmentData(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const completeAssessment = () => {
    setIsCompleted(true);
    // Clear saved progress
    localStorage.removeItem("assessment-progress");
    localStorage.removeItem("assessment-step");
    
    // Save assessment results to user profile (would integrate with backend)
    console.log("Assessment completed:", assessmentData);
    
    // Redirect to dashboard after a delay to show completion
    setTimeout(() => {
      navigate("/dashboard");
    }, 3000);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0: return true; // Welcome step
      case 1: return assessmentData.background !== "";
      case 2: return assessmentData.experience !== "";
      case 3: return assessmentData.goals.length > 0;
      case 4: return assessmentData.weeklyHours !== "";
      case 5: return assessmentData.scenario1 !== "" && assessmentData.scenario2 !== "" && assessmentData.scenario3 !== "";
      case 6: return true; // Results step
      default: return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <WelcomeStep onNext={nextStep} />;
      case 1:
        return (
          <BackgroundStep 
            data={assessmentData}
            onUpdate={updateAssessmentData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 2:
        return (
          <ExperienceStep 
            data={assessmentData}
            onUpdate={updateAssessmentData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 3:
        return (
          <GoalsStep 
            data={assessmentData}
            onUpdate={updateAssessmentData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 4:
        return (
          <TimeCommitmentStep 
            data={assessmentData}
            onUpdate={updateAssessmentData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 5:
        return (
          <TechnicalScenariosStep 
            data={assessmentData}
            onUpdate={updateAssessmentData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 6:
        return (
          <ResultsStep 
            data={assessmentData}
            onComplete={completeAssessment}
            onPrev={prevStep}
          />
        );
      default:
        return null;
    }
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-primary flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8 space-y-6">
            <div className="animate-scale-in">
              <CheckCircle className="h-16 w-16 mx-auto text-primary mb-4" />
              <h2 className="text-2xl font-bold mb-2">Assessment Complete! 🎉</h2>
              <p className="text-muted-foreground mb-4">
                Your personalized learning journey is ready!
              </p>
              <div className="animate-pulse">
                <Zap className="h-8 w-8 mx-auto text-primary" />
                <p className="text-sm text-muted-foreground mt-2">
                  Redirecting to your dashboard...
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle p-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Header */}
        {currentStep > 0 && currentStep < 6 && (
          <div className="mb-8 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <Badge variant="secondary" className="px-3 py-1">
                Step {currentStep} of 5
              </Badge>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-4 w-4 mr-1" />
                {5 - currentStep} min remaining
              </div>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        {/* Step Content */}
        <div className="animate-fade-in">
          {renderStep()}
        </div>

        {/* Navigation Footer */}
        {currentStep > 0 && currentStep < 6 && (
          <div className="flex justify-between mt-8 animate-fade-in">
            <Button 
              variant="outline" 
              onClick={prevStep}
              className="flex items-center"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            
            <Button 
              onClick={nextStep}
              disabled={!canProceed()}
              className="flex items-center"
            >
              {currentStep === 5 ? "View Results" : "Continue"}
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}