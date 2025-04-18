
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;
    
    if (user) {
      navigate("/");
    } else {
      navigate("/auth");
    }
  }, [navigate, user, loading]);

  return null;
};

export default Index;
