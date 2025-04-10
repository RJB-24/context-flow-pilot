
import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Code, Bug, Book, RefreshCcw, Copy, Check, Send, MessageSquare, Plus, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAssistantChat, Message } from "@/hooks/use-assistant-chat";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";

const CodingAssistant: React.FC = () => {
  const [input, setInput] = useState("");
  const [currentQuery, setCurrentQuery] = useState("");
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [showNewChatForm, setShowNewChatForm] = useState(false);
  const [newChatTitle, setNewChatTitle] = useState("");
  const [conversations, setConversations] = useState<any[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  const { 
    messages, 
    isLoading, 
    createConversation, 
    sendMessage, 
    loadConversation,
    listConversations
  } = useAssistantChat("coding");
  
  useEffect(() => {
    // Load conversations
    fetchConversations();
  }, []);
  
  useEffect(() => {
    // Scroll to bottom when messages change
    scrollToBottom();
  }, [messages]);
  
  const fetchConversations = async () => {
    const conversationsData = await listConversations();
    setConversations(conversationsData);
  };
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    setCurrentQuery(input);
    
    if (!activeConversationId) {
      startNewChat();
      return;
    }
    
    await sendMessage(input, activeConversationId);
    setInput("");
  };
  
  const startNewChat = async () => {
    if (!showNewChatForm) {
      setShowNewChatForm(true);
      return;
    }
    
    if (!newChatTitle.trim()) {
      toast({
        title: "Please enter a title",
        description: "A title is required to start a new chat",
        variant: "destructive",
      });
      return;
    }
    
    if (!input.trim()) {
      toast({
        title: "Please enter a message",
        description: "A message is required to start a new chat",
        variant: "destructive",
      });
      return;
    }
    
    const conversationId = await createConversation(newChatTitle, input);
    if (conversationId) {
      setActiveConversationId(conversationId);
      setInput("");
      setShowNewChatForm(false);
      setNewChatTitle("");
      fetchConversations();
    }
  };
  
  const handleSelectConversation = async (id: string) => {
    await loadConversation(id);
    setActiveConversationId(id);
    setShowNewChatForm(false);
  };
  
  const handleCreateNewChat = () => {
    setShowNewChatForm(true);
    setActiveConversationId(null);
    setMessages([]);
  };
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Coding Assistant</h1>
        <p className="text-muted-foreground mt-1">
          Get code suggestions, debugging help, and learn as you code
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Conversations Sidebar */}
        <div className="md:col-span-3">
          <Card className="h-[calc(100vh-200px)]">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex justify-between items-center">
                Conversations
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleCreateNewChat}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  New
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="overflow-auto max-h-[calc(100%-80px)]">
              {conversations.length === 0 && !isLoading ? (
                <div className="text-sm text-muted-foreground text-center py-4">
                  No conversations yet. Start a new one!
                </div>
              ) : (
                <div className="space-y-2">
                  {conversations.map((conv) => (
                    <Button
                      key={conv.id}
                      variant={activeConversationId === conv.id ? "secondary" : "ghost"}
                      className="w-full justify-start text-left font-normal h-auto py-2"
                      onClick={() => handleSelectConversation(conv.id)}
                    >
                      <div>
                        <div className="font-medium truncate">{conv.title}</div>
                        <div className="text-xs text-muted-foreground flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {formatDate(conv.created_at)}
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Chat Area */}
        <div className="md:col-span-9">
          <Card className="h-[calc(100vh-200px)] flex flex-col">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">
                {showNewChatForm ? "New Conversation" : (
                  conversations.find(c => c.id === activeConversationId)?.title || "Select or start a conversation"
                )}
              </CardTitle>
              {showNewChatForm && (
                <div className="mt-2">
                  <Label htmlFor="chat-title">Conversation Title</Label>
                  <Input
                    id="chat-title"
                    placeholder="E.g., Fixing React useEffect Bug"
                    value={newChatTitle}
                    onChange={(e) => setNewChatTitle(e.target.value)}
                    className="mt-1"
                  />
                </div>
              )}
            </CardHeader>
            <CardContent className="flex-grow overflow-auto relative p-4">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-4">
                  <Code className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Coding Assistant</h3>
                  <p className="text-muted-foreground max-w-md">
                    Ask me about code problems, debugging help, or learning resources. 
                    I'm here to help you write better code!
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {messages.map((message, index) => (
                    <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`flex items-start gap-3 max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                        <Avatar className={message.role === 'user' ? 'bg-primary' : 'bg-secondary'}>
                          <AvatarFallback>
                            {message.role === 'user' ? 'U' : 'AI'}
                          </AvatarFallback>
                        </Avatar>
                        <div className={`rounded-lg p-3 ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                          <div className="whitespace-pre-wrap">{message.content}</div>
                          {message.created_at && (
                            <div className="text-xs opacity-70 mt-1">
                              {new Date(message.created_at).toLocaleTimeString()}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </CardContent>
            <CardFooter className="border-t p-3">
              <div className="flex w-full items-center space-x-2">
                <Textarea
                  id="message"
                  placeholder={showNewChatForm ? "Ask your coding question..." : "Type a message..."}
                  className="flex-1 resize-none"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      if (showNewChatForm) {
                        startNewChat();
                      } else {
                        handleSendMessage();
                      }
                    }
                  }}
                />
                <Button 
                  type="submit" 
                  size="icon"
                  disabled={isLoading || !input.trim()}
                  onClick={showNewChatForm ? startNewChat : handleSendMessage}
                >
                  {isLoading ? (
                    <RefreshCcw className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CodingAssistant;
