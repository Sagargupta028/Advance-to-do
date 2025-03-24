
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-todo-light">
      <div className="text-center px-4 max-w-md mx-auto">
        <h1 className="text-9xl font-bold mb-4 text-todo-blue animate-fade-in">404</h1>
        <p className="text-2xl text-todo-dark mb-6 animate-slide-up">Oops! Page not found</p>
        <p className="text-muted-foreground mb-8 animate-slide-up">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Button 
          asChild
          className="bg-todo-blue hover:bg-blue-600 button-animation animate-slide-up"
        >
          <Link to="/">
            Return to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
