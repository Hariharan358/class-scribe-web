
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t mt-auto">
      <div className="container py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-3">Class Scribe</h3>
            <p className="text-sm text-muted-foreground">
              Your digital repository for class materials, records, and observations.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Links</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="text-sm hover:underline">About Us</a></li>
              <li><a href="/contact" className="text-sm hover:underline">Contact</a></li>
              <li><a href="/privacy" className="text-sm hover:underline">Privacy Policy</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Connect</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Stay updated with the latest materials and resources.
            </p>
            <div className="flex items-center text-sm">
              <span>Made with</span>
              <Heart className="h-4 w-4 mx-1 text-red-500" />
              <span>for education</span>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Class Scribe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
