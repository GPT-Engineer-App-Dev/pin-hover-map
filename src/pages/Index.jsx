import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Interactive Map Application</h1>
      <p className="text-xl mb-8">Click on the map to add locations and explore!</p>
      <Button asChild>
        <Link to="/map">Go to Map</Link>
      </Button>
    </div>
  );
};

export default Index;