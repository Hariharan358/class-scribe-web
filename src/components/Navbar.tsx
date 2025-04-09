
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Navbar = () => {
  return (
    <nav className="border-b">
      <div className="container flex items-center justify-between py-4">
        <div className="flex items-center gap-6">
          <a href="/" className="text-xl font-bold">Class Scribe</a>
          
          <div className="hidden md:flex items-center gap-6">
            <a href="/" className="text-sm font-medium hover:text-primary">Home</a>
            <a href="/subjects" className="text-sm font-medium hover:text-primary">Subjects</a>
            <a href="/recent" className="text-sm font-medium hover:text-primary">Recent</a>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative hidden md:flex items-center">
            <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search materials..."
              className="w-[200px] lg:w-[300px] pl-8"
            />
          </div>
          
          <Button size="sm" variant="outline">Login</Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
