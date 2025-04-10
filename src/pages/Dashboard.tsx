
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, Mail, FileText, BookOpen, Calendar, ArrowRight, Bell, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  
  const assistants = [
    {
      title: "Coding Assistant",
      description: "Get code suggestions, debugging help, and documentation",
      icon: Code,
      path: "/coding",
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Email Assistant",
      description: "Draft, summarize, and manage your emails efficiently",
      icon: Mail,
      path: "/email",
      color: "bg-purple-100 text-purple-600"
    },
    {
      title: "Document Assistant",
      description: "Create, edit, and format documents with ease",
      icon: FileText,
      path: "/document",
      color: "bg-amber-100 text-amber-600"
    },
    {
      title: "Research Assistant",
      description: "Find information, summarize articles, and cite sources",
      icon: BookOpen,
      path: "/research",
      color: "bg-emerald-100 text-emerald-600"
    },
    {
      title: "Meeting Assistant",
      description: "Schedule, transcribe, and summarize your meetings",
      icon: Calendar,
      path: "/meeting",
      color: "bg-rose-100 text-rose-600"
    }
  ];
  
  const recentActivities = [
    {
      type: "Code Suggestion",
      description: "Refactored authentication function in login.js",
      time: "10 minutes ago"
    },
    {
      type: "Email Draft",
      description: "Composed weekly report for the marketing team",
      time: "2 hours ago"
    },
    {
      type: "Document Analysis",
      description: "Summarized quarterly financial report",
      time: "Yesterday"
    }
  ];
  
  const insights = [
    {
      title: "Productivity Increase",
      description: "Your productivity has increased by 15% this week",
      icon: <Bell className="h-5 w-5" />
    },
    {
      title: "Time Saved",
      description: "You've saved 3.5 hours this week using assistants",
      icon: <Clock className="h-5 w-5" />
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome to Universal Assistant</h1>
        <p className="text-muted-foreground mt-1">
          Your all-in-one AI assistant for increased productivity
        </p>
      </div>
      
      <Tabs defaultValue="assistants" className="space-y-4">
        <TabsList>
          <TabsTrigger value="assistants">Assistants</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>
        
        <TabsContent value="assistants" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {assistants.map((assistant, index) => (
              <Card key={index} className="overflow-hidden transition-all duration-200 hover:shadow-md">
                <CardHeader className={`${assistant.color} flex flex-row items-center gap-2`}>
                  <assistant.icon className="h-5 w-5" />
                  <CardTitle>{assistant.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <CardDescription className="min-h-[60px]">{assistant.description}</CardDescription>
                  <Button 
                    variant="outline" 
                    className="w-full mt-4 flex items-center justify-between"
                    onClick={() => navigate(assistant.path)}
                  >
                    Open Assistant
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Your recent interactions with the assistant</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-4 p-3 border rounded-lg">
                    <div className="bg-assistant-primary/10 p-2 rounded-full">
                      <Code className="h-5 w-5 text-assistant-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{activity.type}</h3>
                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button 
                variant="outline" 
                className="w-full mt-4"
                onClick={() => navigate("/history")}
              >
                View All Activity
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="insights" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Insights & Recommendations</CardTitle>
              <CardDescription>Personalized insights to improve your workflow</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {insights.map((insight, index) => (
                  <div key={index} className="flex items-start gap-4 p-3 border rounded-lg">
                    <div className="bg-assistant-secondary/10 p-2 rounded-full">
                      {insight.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{insight.title}</h3>
                      <p className="text-sm text-muted-foreground">{insight.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
