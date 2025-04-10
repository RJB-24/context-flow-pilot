
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Mic, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const MeetingAssistant: React.FC = () => {
  const { toast } = useToast();
  
  const handleAction = () => {
    toast({
      title: "Feature Coming Soon",
      description: "Meeting assistant functionality will be available soon.",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Meeting Assistant</h1>
        <p className="text-muted-foreground mt-1">
          Schedule, transcribe, and summarize your meetings
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-rose-500" />
              Meeting Scheduler
            </CardTitle>
            <CardDescription>
              Schedule meetings with intelligent time suggestions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              The meeting scheduler assistant helps you:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground mb-4">
              <li>Find optimal meeting times for all participants</li>
              <li>Automatically detect time zones</li>
              <li>Suggest meeting durations based on agenda</li>
              <li>Send personalized meeting invitations</li>
            </ul>
            <Button onClick={handleAction} className="w-full">Schedule a Meeting</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-amber-500" />
              Upcoming Meetings
            </CardTitle>
            <CardDescription>
              View and prepare for your scheduled meetings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Clock className="h-10 w-10 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No upcoming meetings</p>
              <Button variant="outline" className="mt-4" onClick={handleAction}>
                Connect Calendar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mic className="h-5 w-5 text-blue-500" />
              Meeting Transcription
            </CardTitle>
            <CardDescription>
              Automatically transcribe and record meeting conversations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              The transcription service provides:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground mb-4">
              <li>Real-time speech-to-text conversion</li>
              <li>Speaker identification</li>
              <li>Searchable meeting transcripts</li>
              <li>Multi-language support</li>
            </ul>
            <Button onClick={handleAction} className="w-full">Start Transcription</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-emerald-500" />
              Meeting Summaries
            </CardTitle>
            <CardDescription>
              Generate concise summaries of your meetings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Meeting summaries include:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground mb-4">
              <li>Key discussion points</li>
              <li>Important decisions made</li>
              <li>Action items with assignees</li>
              <li>Follow-up recommendations</li>
            </ul>
            <Button onClick={handleAction} className="w-full">Generate Summary</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MeetingAssistant;
