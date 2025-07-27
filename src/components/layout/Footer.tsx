import { Link } from "react-router-dom";
import { Zap, Github, Twitter, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
                <Zap className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl bg-gradient-primary bg-clip-text text-transparent">
                DevMentor
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Transform into a professional backend developer through personalized AI mentoring and hands-on projects.
            </p>
          </div>

          {/* Learning */}
          <div className="space-y-4">
            <h3 className="font-semibold">Learning</h3>
            <div className="space-y-2 text-sm">
              <Link to="/projects" className="block text-muted-foreground hover:text-foreground transition-colors">
                Projects
              </Link>
              <Link to="/chat" className="block text-muted-foreground hover:text-foreground transition-colors">
                AI Mentor
              </Link>
              <Link to="/progress" className="block text-muted-foreground hover:text-foreground transition-colors">
                Progress Tracking
              </Link>
              <Link to="/achievements" className="block text-muted-foreground hover:text-foreground transition-colors">
                Achievements
              </Link>
            </div>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold">Resources</h3>
            <div className="space-y-2 text-sm">
              <Link to="/docs" className="block text-muted-foreground hover:text-foreground transition-colors">
                Documentation
              </Link>
              <Link to="/tutorials" className="block text-muted-foreground hover:text-foreground transition-colors">
                Tutorials
              </Link>
              <Link to="/community" className="block text-muted-foreground hover:text-foreground transition-colors">
                Community
              </Link>
              <Link to="/support" className="block text-muted-foreground hover:text-foreground transition-colors">
                Support
              </Link>
            </div>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h3 className="font-semibold">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; 2024 DevMentor. All rights reserved. Built with Lovable ❤️</p>
        </div>
      </div>
    </footer>
  );
}