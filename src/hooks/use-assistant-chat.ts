
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export type Message = {
  id?: string;
  role: "user" | "assistant";
  content: string;
  created_at?: string;
};

export type Conversation = {
  id?: string;
  title: string;
  assistant_type: "coding" | "email" | "document" | "research" | "meeting";
  messages: Message[];
  created_at?: string;
  updated_at?: string;
};

export const useAssistantChat = (assistantType: Conversation["assistant_type"]) => {
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const createConversation = async (title: string, initialMessage: string) => {
    try {
      setIsLoading(true);
      
      // Create conversation in database
      const { data: conversationData, error: conversationError } = await supabase
        .from("conversations")
        .insert([{ 
          title, 
          assistant_type: assistantType 
        }])
        .select()
        .single();
        
      if (conversationError) throw conversationError;
      
      // Add initial message
      const initialUserMessage = {
        role: "user" as const,
        content: initialMessage,
        conversation_id: conversationData.id
      };
      
      const { error: messageError } = await supabase
        .from("messages")
        .insert([initialUserMessage]);
        
      if (messageError) throw messageError;
      
      // Get AI response
      const assistantResponse = await getAssistantResponse([initialUserMessage]);
      
      // Save assistant response
      const { error: assistantMessageError } = await supabase
        .from("messages")
        .insert([{
          role: "assistant",
          content: assistantResponse,
          conversation_id: conversationData.id
        }]);
        
      if (assistantMessageError) throw assistantMessageError;
      
      // Update state
      setConversation(conversationData);
      setMessages([
        {
          role: "user",
          content: initialMessage
        },
        {
          role: "assistant",
          content: assistantResponse
        }
      ]);
      
      return conversationData.id;
    } catch (error: any) {
      toast({
        title: "Error creating conversation",
        description: error.message,
        variant: "destructive",
      });
      console.error("Error creating conversation:", error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async (content: string, conversationId?: string) => {
    try {
      setIsLoading(true);
      
      if (!conversationId && !conversation?.id) {
        throw new Error("No active conversation");
      }
      
      const activeConversationId = conversationId || conversation?.id;
      
      // Add user message to UI immediately
      const newUserMessage = { role: "user" as const, content };
      setMessages((prev) => [...prev, newUserMessage]);
      
      // Save user message to database
      const { error: messageError } = await supabase
        .from("messages")
        .insert([{
          role: "user",
          content,
          conversation_id: activeConversationId
        }]);
        
      if (messageError) throw messageError;
      
      // Get all messages for context
      const allMessages = [...messages, newUserMessage];
      
      // Get AI response
      const assistantResponse = await getAssistantResponse(allMessages);
      
      // Save assistant response
      const { error: assistantMessageError } = await supabase
        .from("messages")
        .insert([{
          role: "assistant",
          content: assistantResponse,
          conversation_id: activeConversationId
        }]);
        
      if (assistantMessageError) throw assistantMessageError;
      
      // Update messages state
      setMessages((prev) => [...prev, { 
        role: "assistant", 
        content: assistantResponse 
      }]);
      
      return assistantResponse;
    } catch (error: any) {
      toast({
        title: "Error sending message",
        description: error.message,
        variant: "destructive",
      });
      console.error("Error sending message:", error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const loadConversation = async (conversationId: string) => {
    try {
      setIsLoading(true);
      
      // Get conversation data
      const { data: conversationData, error: conversationError } = await supabase
        .from("conversations")
        .select("*")
        .eq("id", conversationId)
        .single();
        
      if (conversationError) throw conversationError;
      
      // Get messages
      const { data: messagesData, error: messagesError } = await supabase
        .from("messages")
        .select("*")
        .eq("conversation_id", conversationId)
        .order("created_at", { ascending: true });
        
      if (messagesError) throw messagesError;
      
      // Update state
      setConversation(conversationData);
      setMessages(messagesData.map((message) => ({
        id: message.id,
        role: message.role,
        content: message.content,
        created_at: message.created_at
      })));
      
      return { conversation: conversationData, messages: messagesData };
    } catch (error: any) {
      toast({
        title: "Error loading conversation",
        description: error.message,
        variant: "destructive",
      });
      console.error("Error loading conversation:", error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const getAssistantResponse = async (contextMessages: Message[]) => {
    try {
      // Format messages for the API
      const formattedMessages = contextMessages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));
      
      // Call the edge function
      const { data, error } = await supabase.functions.invoke("assistant-chat", {
        body: { 
          messages: formattedMessages,
          assistantType 
        }
      });
      
      if (error) throw error;
      
      return data.reply;
    } catch (error: any) {
      console.error("Error getting assistant response:", error);
      throw error;
    }
  };
  
  const listConversations = async () => {
    try {
      const { data, error } = await supabase
        .from("conversations")
        .select("*")
        .eq("assistant_type", assistantType)
        .order("updated_at", { ascending: false });
        
      if (error) throw error;
      
      return data;
    } catch (error: any) {
      console.error("Error listing conversations:", error);
      toast({
        title: "Error listing conversations",
        description: error.message,
        variant: "destructive",
      });
      return [];
    }
  };

  return {
    conversation,
    messages,
    isLoading,
    createConversation,
    sendMessage,
    loadConversation,
    listConversations
  };
};
