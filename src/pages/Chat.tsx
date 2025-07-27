import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Send,
  Code2,
  Bot,
  User,
  Paperclip,
  Copy,
  ThumbsUp,
  ThumbsDown,
  Zap,
  MessageSquare,
  Clock,
  Star
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  type?: "text" | "code";
  language?: string;
}

const initialMessages: Message[] = [
  {
    id: "1",
    content: "Hello! I'm your AI backend development mentor. I'm here to help you learn and grow as a backend developer. What would you like to work on today?",
    sender: "ai",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    type: "text"
  }
];

const quickSuggestions = [
  "Help me understand REST API design",
  "How do I implement authentication?",
  "Explain database relationships",
  "Review my Node.js code",
  "Best practices for API security"
];

const conversationHistory = [
  {
    id: "1",
    title: "API Design Patterns",
    lastMessage: "Great work on the REST endpoints!",
    timestamp: "2 hours ago",
    messageCount: 15
  },
  {
    id: "2", 
    title: "Database Optimization",
    lastMessage: "Let's add indexing to improve performance",
    timestamp: "Yesterday",
    messageCount: 8
  },
  {
    id: "3",
    title: "Authentication Implementation",
    lastMessage: "JWT tokens are working perfectly now",
    timestamp: "2 days ago",
    messageCount: 23
  }
];

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: "user",
      timestamp: new Date(),
      type: "text"
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(newMessage),
        sender: "ai",
        timestamp: new Date(),
        type: newMessage.toLowerCase().includes("code") ? "code" : "text",
        language: newMessage.toLowerCase().includes("node") ? "javascript" : undefined
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getAIResponse = (userInput: string): string => {
    if (userInput.toLowerCase().includes("api")) {
      return "Great question about APIs! When designing REST APIs, I recommend following these key principles:\n\n1. **Use HTTP methods correctly** - GET for reading, POST for creating, PUT for updating, DELETE for removing\n2. **Resource-based URLs** - Use nouns, not verbs (e.g., /users/123 not /getUser/123)\n3. **Consistent naming** - Use plural nouns for collections\n4. **Proper status codes** - 200 for success, 404 for not found, 500 for server errors\n\nWould you like me to show you an example of a well-designed API endpoint?";
    }
    
    if (userInput.toLowerCase().includes("authentication")) {
      return "Authentication is crucial for secure applications! Here are the most common approaches:\n\n**JWT (JSON Web Tokens):**\n- Stateless and scalable\n- Contains user info in the token\n- Great for microservices\n\n**Session-based:**\n- Server stores session data\n- More secure for sensitive apps\n- Easier to revoke access\n\n**OAuth 2.0:**\n- For third-party integrations\n- Allows limited access without passwords\n\nWhich approach fits your current project best?";
    }

    return "I understand you're working on that! Let me help you break it down step by step. Backend development can seem complex, but with the right approach, you'll master it. What specific aspect would you like to dive deeper into?";
  };

  const handleSuggestionClick = (suggestion: string) => {
    setNewMessage(suggestion);
    inputRef.current?.focus();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="container max-w-6xl py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
        {/* Conversation History Sidebar */}
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <MessageSquare className="h-5 w-5 mr-2" />
                Conversations
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-full px-4 pb-4">
                <div className="space-y-3">
                  {conversationHistory.map((conversation) => (
                    <Card 
                      key={conversation.id} 
                      className="p-3 hover:bg-muted/50 cursor-pointer transition-colors border-0 bg-muted/20"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-sm truncate">{conversation.title}</h4>
                          <Badge variant="secondary" className="text-xs">
                            {conversation.messageCount}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">
                          {conversation.lastMessage}
                        </p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          {conversation.timestamp}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Main Chat Area */}
        <div className="lg:col-span-3">
          <Card className="h-full flex flex-col">
            {/* Chat Header */}
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10 bg-gradient-primary">
                    <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                      <Bot className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">AI Backend Mentor</h3>
                    <p className="text-sm text-muted-foreground flex items-center">
                      <div className="h-2 w-2 bg-green-500 rounded-full mr-2"></div>
                      Online - Ready to help
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="flex items-center">
                    <Star className="h-3 w-3 mr-1" />
                    Premium Mentor
                  </Badge>
                </div>
              </div>
            </CardHeader>

            {/* Messages Area */}
            <CardContent className="flex-1 flex flex-col p-0">
              <ScrollArea className="flex-1 px-4 py-4">
                <div className="space-y-6">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex items-start space-x-3 ${
                      message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
                    }`}>
                      <Avatar className={`h-8 w-8 ${
                        message.sender === "ai" ? "bg-gradient-primary" : "bg-muted"
                      }`}>
                        <AvatarFallback className={
                          message.sender === "ai" 
                            ? "bg-gradient-primary text-primary-foreground" 
                            : "bg-muted"
                        }>
                          {message.sender === "ai" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className={`flex-1 max-w-[70%] ${
                        message.sender === "user" ? "flex flex-col items-end" : ""
                      }`}>
                        <Card className={`p-4 ${
                          message.sender === "user" 
                            ? "bg-primary text-primary-foreground ml-auto" 
                            : "bg-muted/50"
                        }`}>
                          <div className="space-y-2">
                            {message.type === "code" ? (
                              <div className="bg-code-bg text-code-foreground p-3 rounded-lg font-mono text-sm">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-xs text-muted-foreground">
                                    {message.language || "code"}
                                  </span>
                                  <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                                    <Copy className="h-3 w-3" />
                                  </Button>
                                </div>
                                <pre className="whitespace-pre-wrap">{message.content}</pre>
                              </div>
                            ) : (
                              <p className="whitespace-pre-wrap">{message.content}</p>
                            )}
                          </div>
                        </Card>
                        
                        <div className="flex items-center space-x-2 mt-2 text-xs text-muted-foreground">
                          <span>{message.timestamp.toLocaleTimeString()}</span>
                          {message.sender === "ai" && (
                            <div className="flex items-center space-x-1">
                              <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                                <ThumbsUp className="h-3 w-3" />
                              </Button>
                              <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                                <ThumbsDown className="h-3 w-3" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex items-start space-x-3">
                      <Avatar className="h-8 w-8 bg-gradient-primary">
                        <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <Card className="p-4 bg-muted/50">
                        <div className="flex space-x-1">
                          <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce"></div>
                          <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                          <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                        </div>
                      </Card>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Quick Suggestions */}
              {messages.length === 1 && (
                <div className="px-4 py-2 border-t bg-muted/20">
                  <p className="text-sm text-muted-foreground mb-3">Try asking about:</p>
                  <div className="flex flex-wrap gap-2">
                    {quickSuggestions.map((suggestion, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="text-xs"
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Message Input */}
              <div className="p-4 border-t">
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon" className="shrink-0">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  
                  <div className="flex-1 relative">
                    <Input
                      ref={inputRef}
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask your AI mentor anything about backend development..."
                      className="pr-12"
                    />
                    <Button
                      size="sm"
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim() || isTyping}
                      className="absolute right-1 top-1 h-8 w-8 p-0"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <p className="text-xs text-muted-foreground mt-2 flex items-center">
                  <Zap className="h-3 w-3 mr-1" />
                  AI responses are powered by advanced language models
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}