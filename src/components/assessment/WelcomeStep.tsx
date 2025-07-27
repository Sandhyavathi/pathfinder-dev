import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Rocket, Clock, Sparkles, Target } from "lucide-react";

interface WelcomeStepProps {
  onNext: () => void;
}

export function WelcomeStep({ onNext }: WelcomeStepProps) {
  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-2xl">
        <CardContent className="p-12 text-center space-y-8">
          <div className="animate-scale-in">
            <div className="relative mb-6">
              <Rocket className="h-20 w-20 mx-auto text-primary animate-pulse" />
              <Sparkles className="h-8 w-8 absolute -top-2 -right-2 text-accent animate-bounce" />
            </div>
            
            <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Welcome to your personalized backend development journey! 
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8">
              Let's get to know you in just 5 minutes to create the perfect learning path tailored specifically for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
            <div className="flex flex-col items-center p-4 rounded-lg bg-secondary/50">
              <Target className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-semibold">Personalized</h3>
              <p className="text-sm text-muted-foreground text-center">
                Tailored to your experience and goals
              </p>
            </div>
            
            <div className="flex flex-col items-center p-4 rounded-lg bg-secondary/50">
              <Clock className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-semibold">Quick Setup</h3>
              <p className="text-sm text-muted-foreground text-center">
                Just 5 minutes to get started
              </p>
            </div>
            
            <div className="flex flex-col items-center p-4 rounded-lg bg-secondary/50">
              <Sparkles className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-semibold">AI-Powered</h3>
              <p className="text-sm text-muted-foreground text-center">
                Smart recommendations based on your profile
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <Button 
              size="lg" 
              className="w-full max-w-xs hover-scale"
              onClick={onNext}
            >
              <Rocket className="h-5 w-5 mr-2" />
              Start My Assessment
            </Button>
            
            <div className="flex items-center justify-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              Takes about 5 minutes
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}