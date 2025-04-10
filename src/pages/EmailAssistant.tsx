
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Send, RefreshCcw, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const EmailAssistant: React.FC = () => {
  const [emailType, setEmailType] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [generatedEmail, setGeneratedEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerateEmail = () => {
    if (!emailType || !subject.trim()) {
      toast({
        title: "Missing Information",
        description: "Please select an email type and enter a subject.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // This would be replaced with actual AI processing
    setTimeout(() => {
      setIsLoading(false);
      
      const emailTemplates = {
        "follow-up": `Dear [Recipient],\n\nI hope this email finds you well. I'm writing to follow up on our previous discussion about ${subject}.\n\nLooking forward to your response.\n\nBest regards,\n[Your Name]`,
        "meeting-request": `Dear [Recipient],\n\nI would like to schedule a meeting to discuss ${subject}. Please let me know your availability for next week.\n\nThank you,\n[Your Name]`,
        "weekly-report": `Hi Team,\n\nHere is the weekly report on ${subject}.\n\n[Report Details]\n\nPlease let me know if you have any questions.\n\nRegards,\n[Your Name]`,
        "thank-you": `Dear [Recipient],\n\nThank you for ${subject}. I really appreciate your time and effort.\n\nBest regards,\n[Your Name]`,
        "introduction": `Dear [Recipient],\n\nMy name is [Your Name] and I am reaching out regarding ${subject}.\n\n[More Details]\n\nI look forward to connecting with you.\n\nBest regards,\n[Your Name]`
      };
      
      setGeneratedEmail(emailTemplates[emailType] || "");
      
      toast({
        title: "Email Generated",
        description: "Your email template is ready. Feel free to edit it further.",
      });
    }, 1500);
  };

  const emailTypes = [
    { value: "follow-up", label: "Follow-up Email" },
    { value: "meeting-request", label: "Meeting Request" },
    { value: "weekly-report", label: "Weekly Report" },
    { value: "thank-you", label: "Thank You Note" },
    { value: "introduction", label: "Introduction Email" }
  ];

  const handleSendEmail = () => {
    toast({
      title: "Email Ready",
      description: "Your email has been prepared and is ready to send via your email client.",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Email Assistant</h1>
        <p className="text-muted-foreground mt-1">
          Draft professional emails quickly and effortlessly
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-purple-500" />
              Email Generator
            </CardTitle>
            <CardDescription>
              Generate professional email templates in seconds
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Email Type</label>
              <Select value={emailType} onValueChange={setEmailType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select email type" />
                </SelectTrigger>
                <SelectContent>
                  {emailTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Subject/Topic</label>
              <Input
                placeholder="Enter the email subject or topic"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Additional Details (Optional)</label>
              <Textarea
                placeholder="Add any specific details you want to include..."
                className="min-h-[100px]"
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full" 
              onClick={handleGenerateEmail}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <RefreshCcw className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <RefreshCcw className="h-4 w-4 mr-2" />
                  Generate Email
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Generated Email</CardTitle>
            <CardDescription>
              Edit the generated email as needed
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Your generated email will appear here..."
              className="min-h-[250px]"
              value={generatedEmail}
              onChange={(e) => setGeneratedEmail(e.target.value)}
            />
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => {
                if (generatedEmail) {
                  navigator.clipboard.writeText(generatedEmail);
                  toast({
                    title: "Copied",
                    description: "Email content copied to clipboard.",
                  });
                }
              }}
              disabled={!generatedEmail}
            >
              Copy to Clipboard
            </Button>
            <Button 
              className="flex-1" 
              onClick={handleSendEmail}
              disabled={!generatedEmail}
            >
              <Send className="h-4 w-4 mr-2" />
              Prepare to Send
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-amber-500" />
            Quick Templates
          </CardTitle>
          <CardDescription>
            Commonly used email templates for quick access
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {emailTypes.map((type) => (
              <Button 
                key={type.value} 
                variant="outline"
                className="justify-start"
                onClick={() => {
                  setEmailType(type.value);
                  if (!subject) setSubject("the matter we discussed");
                  document.querySelector(".email-generator-card")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <Mail className="h-4 w-4 mr-2" />
                {type.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailAssistant;
