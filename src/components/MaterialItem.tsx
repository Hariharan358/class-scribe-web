
import { Download, FileText, Image, Video, FileArchive, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface MaterialItemProps {
  id: string;
  title: string;
  type: "document" | "image" | "video" | "archive" | "other";
  uploadDate: string;
  fileSize: string;
  downloadUrl: string;
  viewUrl: string;
}

const MaterialItem = ({
  id,
  title,
  type,
  uploadDate,
  fileSize,
  downloadUrl,
  viewUrl
}: MaterialItemProps) => {
  const getIcon = () => {
    switch (type) {
      case "document":
        return <FileText className="h-5 w-5 text-blue-500" />;
      case "image":
        return <Image className="h-5 w-5 text-green-500" />;
      case "video":
        return <Video className="h-5 w-5 text-red-500" />;
      case "archive":
        return <FileArchive className="h-5 w-5 text-yellow-500" />;
      default:
        return <File className="h-5 w-5 text-gray-500" />;
    }
  };

  const getTypeBadge = () => {
    const types = {
      document: "bg-blue-100 text-blue-700",
      image: "bg-green-100 text-green-700",
      video: "bg-red-100 text-red-700",
      archive: "bg-yellow-100 text-yellow-700",
      other: "bg-gray-100 text-gray-700"
    };
    
    return (
      <Badge variant="outline" className={types[type]}>
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </Badge>
    );
  };

  return (
    <Card className="hover:shadow-sm transition-all">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {getIcon()}
            <div>
              <h4 className="font-medium">{title}</h4>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                <span>{uploadDate}</span>
                <span>•</span>
                <span>{fileSize}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {getTypeBadge()}
            
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                title="View material"
                asChild
              >
                <a href={viewUrl} target="_blank" rel="noopener noreferrer">
                  <FileText className="h-4 w-4" />
                  <span className="sr-only">View</span>
                </a>
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                title="Download material"
                asChild
              >
                <a href={downloadUrl} download>
                  <Download className="h-4 w-4" />
                  <span className="sr-only">Download</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MaterialItem;
