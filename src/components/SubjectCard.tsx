
import { File, FolderOpen } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SubjectCardProps {
  id: string;
  title: string;
  description: string;
  materialsCount: number;
  icon?: string;
  color?: string;
}

const SubjectCard = ({
  id,
  title,
  description,
  materialsCount,
  icon = "folder",
  color = "blue"
}: SubjectCardProps) => {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-700 border-blue-200",
    green: "bg-green-100 text-green-700 border-green-200",
    yellow: "bg-yellow-100 text-yellow-700 border-yellow-200",
    purple: "bg-purple-100 text-purple-700 border-purple-200",
    red: "bg-red-100 text-red-700 border-red-200",
  };
  
  const iconClass = colorClasses[color as keyof typeof colorClasses] || colorClasses.blue;
  
  return (
    <Card className="h-full transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className={`w-10 h-10 rounded-md flex items-center justify-center ${iconClass}`}>
            {icon === "folder" ? (
              <FolderOpen className="h-5 w-5" />
            ) : (
              <File className="h-5 w-5" />
            )}
          </div>
          <Badge variant="outline">{materialsCount} {materialsCount === 1 ? 'material' : 'materials'}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <h3 className="text-lg font-semibold mb-1">
          <a href={`/subjects/${id}`} className="hover:text-primary">
            {title}
          </a>
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
      </CardContent>
      <CardFooter>
        <a
          href={`/subjects/${id}`}
          className="text-sm font-medium text-primary hover:underline"
        >
          View Materials
        </a>
      </CardFooter>
    </Card>
  );
};

export default SubjectCard;
