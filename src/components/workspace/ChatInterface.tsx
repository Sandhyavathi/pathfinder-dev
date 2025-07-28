import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Send, Paperclip, HelpCircle, Code, BookOpen, Lightbulb } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'mentor';
  timestamp: Date;
  type?: 'text' | 'code';
  language?: string;
}

interface ChatInterfaceProps {
  currentProject?: string;
  currentStep?: string;
  onSendMessage?: (message: string) => void;
}

export function ChatInterface({ currentProject, currentStep, onSendMessage }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Welcome to your personalized backend development workspace! 🎉\n\nI'm your AI mentor, and I'm here to guide you through every step of your learning journey. I can see you're working on building a Task Manager API - that's a fantastic project to start with!\n\nHow are you feeling about getting started? Any specific questions or areas you'd like to explore first?",
      sender: 'mentor',
      timestamp: new Date(),
      type: 'text',
    },
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const quickActions = [
    { icon: HelpCircle, label: "I'm stuck", color: "destructive" },
    { icon: Code, label: "Review my code", color: "secondary" },
    { icon: BookOpen, label: "Explain concept", color: "accent" },
    { icon: Lightbulb, label: "Give me a hint", color: "success" },
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: 'user',
      timestamp: new Date(),
      type: 'text',
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    // Simulate mentor response
    setTimeout(() => {
      const mentorResponse = generateMentorResponse(newMessage);
      const mentorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: mentorResponse,
        sender: 'mentor',
        timestamp: new Date(),
        type: 'text',
      };

      setMessages(prev => [...prev, mentorMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);

    onSendMessage?.(newMessage);
  };

  const handleQuickAction = (action: string) => {
    setNewMessage(action);
    inputRef.current?.focus();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/ai-mentor.jpg" alt="AI Mentor" />
            <AvatarFallback className="bg-primary text-primary-foreground">AM</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-semibold">AI Backend Mentor</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                Online
              </div>
              {currentProject && (
                <Badge variant="secondary" className="text-xs">
                  {currentProject}
                </Badge>
              )}
            </div>
          </div>
        </div>
        
        {currentStep && (
          <div className="mt-3 p-2 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">Current Step:</p>
            <p className="text-sm font-medium">{currentStep}</p>
          </div>
        )}
      </div>

      {/* Messages */}
      <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.sender === 'mentor' && (
                <Avatar className="h-8 w-8 mt-1">
                  <AvatarImage src="/ai-mentor.jpg" alt="AI Mentor" />
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                    AM
                  </AvatarFallback>
                </Avatar>
              )}
              
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === 'user'
                    ? 'bg-primary text-primary-foreground ml-auto'
                    : 'bg-muted'
                }`}
              >
                {message.type === 'code' ? (
                  <pre className="text-sm overflow-x-auto">
                    <code>{message.content}</code>
                  </pre>
                ) : (
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                )}
                
                <p className={`text-xs mt-2 ${
                  message.sender === 'user' 
                    ? 'text-primary-foreground/70' 
                    : 'text-muted-foreground'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
              
              {message.sender === 'user' && (
                <Avatar className="h-8 w-8 mt-1">
                  <AvatarFallback className="bg-accent text-accent-foreground text-xs">
                    You
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="flex gap-3">
              <Avatar className="h-8 w-8 mt-1">
                <AvatarImage src="/ai-mentor.jpg" alt="AI Mentor" />
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                  AM
                </AvatarFallback>
              </Avatar>
              <div className="bg-muted rounded-lg p-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Quick Actions */}
      <div className="p-3 border-t bg-muted/20">
        <div className="flex gap-2 flex-wrap">
          {quickActions.map((action) => (
            <Button
              key={action.label}
              variant="outline"
              size="sm"
              onClick={() => handleQuickAction(action.label)}
              className="h-8 text-xs"
            >
              <action.icon className="h-3 w-3 mr-1" />
              {action.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Input
              ref={inputRef}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask your mentor anything..."
              className="pr-10"
            />
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
            >
              <Paperclip className="h-3 w-3" />
            </Button>
          </div>
          <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function generateMentorResponse(userMessage: string): string {
  const responses = {
    stuck: [
      "I understand you're feeling stuck! That's completely normal and part of the learning process. Let's break this down step by step.\n\nWhat specific part are you having trouble with? Is it:\n• Understanding the concept?\n• Writing the code?\n• Debugging an error?\n• Something else?\n\nTell me more and I'll help you work through it!",
      "No worries about being stuck - that's how we learn! Let's tackle this together.\n\nCan you share:\n1. What you're trying to accomplish\n2. What you've tried so far\n3. Where exactly you're getting confused\n\nI'm here to guide you through it step by step.",
    ],
    code: [
      "I'd be happy to review your code! 📝\n\nYou can share your code in a few ways:\n• Copy and paste it in the chat\n• Use the file attachment button\n• Show me the specific file in your editor\n\nOnce I can see your code, I'll provide detailed feedback on:\n✅ Code structure and best practices\n✅ Potential improvements\n✅ Bug fixes if needed\n✅ Learning opportunities",
      "Great! Code reviews are one of the best ways to learn. Let me take a look at what you've written.\n\nShare your code and I'll help you with:\n• Code quality and readability\n• Performance optimizations\n• Best practices\n• Potential issues\n\nI'm excited to see what you've built!",
    ],
    concept: [
      "Absolutely! Explaining concepts is one of my favorite things to do. 🎓\n\nWhat specific concept would you like me to explain? Some common backend topics include:\n• APIs and REST principles\n• Database design\n• Authentication & security\n• Server architecture\n• HTTP methods and status codes\n\nJust let me know what you're curious about, and I'll break it down in a clear, easy-to-understand way!",
      "I love explaining concepts! Understanding the 'why' behind what we're coding is just as important as the 'how'.\n\nWhat would you like to dive deeper into? I can explain:\n• The theory behind it\n• Real-world applications\n• Common use cases\n• Best practices\n• Examples you can relate to",
    ],
    hint: [
      "I'd be happy to give you a hint! 💡\n\nHints are great because they guide you toward the solution while still letting you do the thinking. What are you working on right now?\n\nShare the problem or challenge you're facing, and I'll give you just enough guidance to help you figure out the next step without spoiling the learning experience!",
      "Perfect! Hints are a great way to learn - they give you direction without taking away the satisfaction of solving it yourself.\n\nTell me:\n• What you're trying to build or solve\n• What approach you're considering\n• Where you think you should start\n\nI'll give you a helpful nudge in the right direction! 🚀",
    ],
  };

  const message = userMessage.toLowerCase();
  
  if (message.includes('stuck') || message.includes('help') || message.includes('confused')) {
    return responses.stuck[Math.floor(Math.random() * responses.stuck.length)];
  }
  
  if (message.includes('code') || message.includes('review')) {
    return responses.code[Math.floor(Math.random() * responses.code.length)];
  }
  
  if (message.includes('explain') || message.includes('concept') || message.includes('understand')) {
    return responses.concept[Math.floor(Math.random() * responses.concept.length)];
  }
  
  if (message.includes('hint') || message.includes('clue')) {
    return responses.hint[Math.floor(Math.random() * responses.hint.length)];
  }

  // Default responses
  const defaultResponses = [
    "That's a great question! Let me help you with that.\n\nCould you provide a bit more context about what you're working on? The more details you can share, the better I can tailor my guidance to your specific situation.",
    "I'm here to help! 😊\n\nWhat you're asking touches on an important aspect of backend development. Let me break this down for you in a way that's practical and easy to apply to your current project.",
    "Excellent! That shows you're really thinking about this deeply. Let me share some insights that will help you not just solve this problem, but understand the underlying principles better.",
  ];

  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}