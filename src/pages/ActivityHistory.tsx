
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Code, Mail, FileText, BookOpen, Calendar, Clock } from "lucide-react";

const ActivityHistory: React.FC = () => {
  // Mock data
  const activities = [
    {
      id: 1,
      type: "code",
      title: "Code Analysis",
      description: "Analyzed authentication function in login.js",
      date: "Today, 10:30 AM",
      icon: Code,
      iconColor: "text-blue-500"
    },
    {
      id: 2,
      type: "email",
      title: "Email Draft",
      description: "Generated follow-up email to marketing team",
      date: "Today, 9:15 AM",
      icon: Mail,
      iconColor: "text-purple-500"
    },
    {
      id: 3,
      type: "document",
      title: "Document Summary",
      description: "Summarized Q1 financial report",
      date: "Yesterday, 4:45 PM",
      icon: FileText,
      iconColor: "text-amber-500"
    },
    {
      id: 4,
      type: "research",
      title: "Research Query",
      description: "Researched renewable energy sources",
      date: "Yesterday, 2:30 PM",
      icon: BookOpen,
      iconColor: "text-emerald-500"
    },
    {
      id: 5,
      type: "meeting",
      title: "Meeting Scheduled",
      description: "Set up team sync for next Tuesday",
      date: "April 8, 11:20 AM",
      icon: Calendar,
      iconColor: "text-rose-500"
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Activity History</h1>
        <p className="text-muted-foreground mt-1">
          Review your past interactions with the assistant
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Search Activities</CardTitle>
          <CardDescription>
            Find specific activities in your history
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input placeholder="Search by keyword or date..." className="flex-1" />
            <Button>
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Activities</TabsTrigger>
          <TabsTrigger value="code">Coding</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="document">Documents</TabsTrigger>
          <TabsTrigger value="research">Research</TabsTrigger>
          <TabsTrigger value="meeting">Meetings</TabsTrigger>
        </TabsList>
        
        {["all", "code", "email", "document", "research", "meeting"].map((tab) => (
          <TabsContent key={tab} value={tab}>
            <Card>
              <CardHeader>
                <CardTitle>
                  {tab === "all" ? "All Activities" : 
                   tab === "code" ? "Coding Activities" :
                   tab === "email" ? "Email Activities" :
                   tab === "document" ? "Document Activities" :
                   tab === "research" ? "Research Activities" :
                   "Meeting Activities"}
                </CardTitle>
                <CardDescription>
                  {tab === "all" 
                    ? "Your complete activity history across all assistants"
                    : `Your history of interactions with the ${tab} assistant`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities
                    .filter(activity => tab === "all" || activity.type === tab)
                    .map((activity) => (
                      <div key={activity.id} className="flex items-start gap-4 p-4 border rounded-lg">
                        <div className={`bg-gray-100 p-2 rounded-full ${activity.iconColor}`}>
                          <activity.icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium">{activity.title}</h3>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">{activity.date}</span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
                        </div>
                      </div>
                    ))}
                  
                  {activities.filter(activity => tab === "all" || activity.type === tab).length === 0 && (
                    <div className="text-center py-4">
                      <p className="text-muted-foreground">No activities found</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ActivityHistory;
