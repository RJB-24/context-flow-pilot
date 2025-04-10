
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { HelpCircle, Search, MessageCircle, BookOpen, Video, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Help: React.FC = () => {
  const { toast } = useToast();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Search Functionality",
      description: "Search functionality will be available soon.",
    });
  };

  const faqs = [
    {
      question: "What is the Universal Contextual Workflow Assistant?",
      answer: "The Universal Contextual Workflow Assistant is a browser-based tool designed to improve productivity and streamline workflows. It leverages AI to provide real-time contextual insights, automate tasks, and enhance user efficiency across various activities such as coding, email drafting, and research."
    },
    {
      question: "How does the context detection work?",
      answer: "The assistant uses Chrome APIs to monitor active tabs and detect user tasks. It then processes the content using various AI technologies to understand the context of your work and provide relevant assistance without requiring explicit instructions."
    },
    {
      question: "Is my data secure?",
      answer: "Yes, your privacy and data security are top priorities. The assistant processes data locally when possible and follows strict privacy guidelines. You can control how your data is used in the Privacy Settings section."
    },
    {
      question: "Can I use the assistant offline?",
      answer: "Some basic features may work offline, but most of the assistant's functionality requires an internet connection to access the AI services that power its insights and automation capabilities."
    },
    {
      question: "How do I get started with a specific assistant?",
      answer: "Simply navigate to the specific assistant you need from the sidebar menu (e.g., Coding Assistant, Email Assistant). Each assistant has its own interface tailored to the specific workflow it supports."
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Help & Support</h1>
        <p className="text-muted-foreground mt-1">
          Find answers and resources to get the most out of your assistant
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5 text-assistant-primary" />
            Search Help Center
          </CardTitle>
          <CardDescription>
            Find answers to your questions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input 
              placeholder="Type your question here..."
              className="flex-1"
            />
            <Button type="submit">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </form>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-purple-500" />
              Live Support
            </CardTitle>
            <CardDescription>
              Chat with our support team
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Need immediate help? Our support team is available to assist you with any questions or issues.
            </p>
            <Button className="w-full" onClick={() => {
              toast({
                title: "Live Support",
                description: "Live support chat will be available soon.",
              });
            }}>
              Start Chat
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-emerald-500" />
              Documentation
            </CardTitle>
            <CardDescription>
              Explore detailed guides
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Access comprehensive documentation about all features, settings, and capabilities of the Universal Assistant.
            </p>
            <Button variant="outline" className="w-full" onClick={() => {
              toast({
                title: "Documentation",
                description: "Documentation will be available soon.",
              });
            }}>
              <ExternalLink className="h-4 w-4 mr-2" />
              View Docs
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Video className="h-5 w-5 text-blue-500" />
              Video Tutorials
            </CardTitle>
            <CardDescription>
              Learn through video guides
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Watch step-by-step tutorial videos to learn how to use the assistant effectively for various workflows.
            </p>
            <Button variant="outline" className="w-full" onClick={() => {
              toast({
                title: "Video Tutorials",
                description: "Video tutorials will be available soon.",
              });
            }}>
              <ExternalLink className="h-4 w-4 mr-2" />
              Watch Tutorials
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-assistant-accent" />
            Frequently Asked Questions
          </CardTitle>
          <CardDescription>
            Quick answers to common questions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default Help;
