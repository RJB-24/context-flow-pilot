
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Code, Bug, Book, RefreshCcw, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CodingAssistant: React.FC = () => {
  const [code, setCode] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleAnalyzeCode = () => {
    if (!code.trim()) {
      toast({
        title: "Empty Code",
        description: "Please enter some code to analyze.",
        variant: "destructive",
      });
      return;
    }

    // This would be replaced with actual AI processing
    setTimeout(() => {
      setSuggestion(
        "Consider refactoring this function using async/await for better readability and error handling. Also, you might want to add type checking for the parameters."
      );
      
      toast({
        title: "Code Analyzed",
        description: "Here are some suggestions for your code.",
      });
    }, 1500);
  };

  const handleCopySuggestion = () => {
    if (suggestion) {
      navigator.clipboard.writeText(suggestion);
      setCopied(true);
      toast({
        title: "Copied",
        description: "Suggestion copied to clipboard.",
      });
      
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Coding Assistant</h1>
        <p className="text-muted-foreground mt-1">
          Get code suggestions, debugging help, and learn as you code
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Code Analysis</CardTitle>
          <CardDescription>
            Paste your code below for real-time analysis and suggestions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Paste your code here..."
            className="font-mono min-h-[200px] mb-4"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <Button 
            className="w-full" 
            onClick={handleAnalyzeCode}
            disabled={!code.trim()}
          >
            <RefreshCcw className="h-4 w-4 mr-2" />
            Analyze Code
          </Button>
        </CardContent>
      </Card>
      
      {suggestion && (
        <Card className="animate-slide-in">
          <CardHeader>
            <CardTitle>AI Suggestions</CardTitle>
            <CardDescription>
              Based on your code, here are some recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded-md relative">
              <p>{suggestion}</p>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2"
                onClick={handleCopySuggestion}
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      
      <Tabs defaultValue="suggestions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="suggestions">Code Suggestions</TabsTrigger>
          <TabsTrigger value="debugging">Debugging</TabsTrigger>
          <TabsTrigger value="learning">Learning Resources</TabsTrigger>
        </TabsList>
        
        <TabsContent value="suggestions">
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <Code className="h-5 w-5 text-assistant-primary" />
              <div>
                <CardTitle>Code Suggestions</CardTitle>
                <CardDescription>
                  Get intelligent recommendations to improve your code
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm mb-4">
                Paste your code above to get personalized suggestions for:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Code structure and organization</li>
                <li>Performance optimization</li>
                <li>Best practices and conventions</li>
                <li>Error handling improvements</li>
                <li>Documentation recommendations</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="debugging">
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <Bug className="h-5 w-5 text-red-500" />
              <div>
                <CardTitle>Debugging Assistant</CardTitle>
                <CardDescription>
                  Identify and fix bugs in your code
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm mb-4">
                The debugging assistant can help you:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Identify syntax errors</li>
                <li>Detect logical issues</li>
                <li>Find security vulnerabilities</li>
                <li>Suggest fixes for common bugs</li>
                <li>Explain why errors occur</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="learning">
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <Book className="h-5 w-5 text-emerald-500" />
              <div>
                <CardTitle>Learning Resources</CardTitle>
                <CardDescription>
                  Improve your coding skills with personalized resources
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm mb-4">
                Based on your code and activity, we can recommend:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Tutorials for concepts you're working with</li>
                <li>Documentation for libraries and frameworks</li>
                <li>Best practice guides</li>
                <li>Example code snippets</li>
                <li>Advanced techniques to level up your skills</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CodingAssistant;
