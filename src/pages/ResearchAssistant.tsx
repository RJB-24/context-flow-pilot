
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, BookOpen, FileText, Bookmark } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ResearchAssistant: React.FC = () => {
  const { toast } = useToast();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Feature Coming Soon",
      description: "Research search functionality will be available soon.",
    });
  };

  const recentTopics = [
    "Machine Learning Algorithms",
    "Climate Change Effects",
    "Renewable Energy Sources",
    "Ancient Civilizations"
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Research Assistant</h1>
        <p className="text-muted-foreground mt-1">
          Find information, summarize articles, and cite sources
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5 text-assistant-primary" />
            Research Query
          </CardTitle>
          <CardDescription>
            Enter a research topic or question to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input 
              placeholder="Enter a research topic or question..."
              className="flex-1"
            />
            <Button type="submit">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </form>
          
          <div className="mt-4">
            <p className="text-sm font-medium mb-2">Recent Topics</p>
            <div className="flex flex-wrap gap-2">
              {recentTopics.map((topic, index) => (
                <Button 
                  key={index} 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    toast({
                      title: "Topic Selected",
                      description: `Loading research for "${topic}"`,
                    });
                  }}
                >
                  {topic}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-emerald-500" />
              Article Summaries
            </CardTitle>
            <CardDescription>
              Quickly understand key points from academic papers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Upload or paste an article URL to get an AI-generated summary, highlighting:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Main arguments and findings</li>
              <li>Methodology overview</li>
              <li>Key statistics and data</li>
              <li>Conclusions and implications</li>
            </ul>
            <Button variant="outline" className="w-full mt-4" onClick={() => {
              toast({
                title: "Feature Coming Soon",
                description: "Article summary functionality will be available soon.",
              });
            }}>
              Try Article Summary
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-500" />
              Citation Generator
            </CardTitle>
            <CardDescription>
              Create properly formatted citations for your research
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Generate citations in multiple formats including:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>APA (7th Edition)</li>
              <li>MLA (9th Edition)</li>
              <li>Chicago/Turabian</li>
              <li>Harvard Referencing</li>
            </ul>
            <Button variant="outline" className="w-full mt-4" onClick={() => {
              toast({
                title: "Feature Coming Soon",
                description: "Citation generator functionality will be available soon.",
              });
            }}>
              Generate Citations
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bookmark className="h-5 w-5 text-purple-500" />
              Research Organizer
            </CardTitle>
            <CardDescription>
              Keep your research materials organized
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Stay organized with powerful research management tools:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Save and categorize sources</li>
              <li>Create research collections</li>
              <li>Add personal notes and highlights</li>
              <li>Export organized bibliographies</li>
            </ul>
            <Button variant="outline" className="w-full mt-4" onClick={() => {
              toast({
                title: "Feature Coming Soon",
                description: "Research organizer functionality will be available soon.",
              });
            }}>
              Organize Research
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResearchAssistant;
