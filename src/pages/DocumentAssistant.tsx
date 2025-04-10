
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, FileUp, Edit, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const DocumentAssistant: React.FC = () => {
  const { toast } = useToast();
  
  const handleUpload = () => {
    toast({
      title: "Feature Coming Soon",
      description: "Document upload functionality will be available soon.",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Document Assistant</h1>
        <p className="text-muted-foreground mt-1">
          Create, edit, and format documents with ease
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileUp className="h-5 w-5 text-amber-500" />
              Upload Document
            </CardTitle>
            <CardDescription>
              Upload an existing document to analyze or edit
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed rounded-lg p-8 text-center">
              <FileText className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
              <p className="text-sm text-muted-foreground mb-4">
                Drag and drop a document here, or click to browse
              </p>
              <Button variant="outline" onClick={handleUpload}>
                Browse Files
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5 text-emerald-500" />
              Create Document
            </CardTitle>
            <CardDescription>
              Create a new document from scratch
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm">Create various document types:</p>
              <div className="grid grid-cols-1 gap-2">
                <Button variant="outline" onClick={handleUpload}>Business Report</Button>
                <Button variant="outline" onClick={handleUpload}>Academic Essay</Button>
                <Button variant="outline" onClick={handleUpload}>Project Proposal</Button>
                <Button variant="outline" onClick={handleUpload}>Custom Document</Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5 text-blue-500" />
              Recent Documents
            </CardTitle>
            <CardDescription>
              Access your recently edited documents
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center text-sm text-muted-foreground py-8">
              Your recent documents will appear here
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Document Capabilities</CardTitle>
          <CardDescription>
            Explore what the Document Assistant can do for you
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2">Text Analysis</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Summarize long documents</li>
                <li>Extract key insights</li>
                <li>Analyze sentiment and tone</li>
                <li>Identify main topics</li>
              </ul>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2">Formatting & Styling</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Consistent formatting</li>
                <li>Professional templates</li>
                <li>Grammar and style checking</li>
                <li>Citation formatting</li>
              </ul>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2">Content Generation</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Draft sections based on outlines</li>
                <li>Generate tables and charts</li>
                <li>Create executive summaries</li>
                <li>Expand on key points</li>
              </ul>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2">Collaboration</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Share documents with context</li>
                <li>Track changes and revisions</li>
                <li>Collaborative editing</li>
                <li>Export to multiple formats</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentAssistant;
