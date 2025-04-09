
import { useState } from "react";
import { Download, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface MaterialViewerProps {
  isOpen: boolean;
  onClose: () => void;
  material: {
    id: string;
    title: string;
    type: string;
    url: string;
    downloadUrl: string;
  } | null;
}

const MaterialViewer = ({ isOpen, onClose, material }: MaterialViewerProps) => {
  if (!material) return null;

  const renderContent = () => {
    if (!material) return null;

    switch (material.type) {
      case "document":
        // For PDF viewing
        return (
          <iframe
            src={material.url}
            className="w-full h-[70vh]"
            title={material.title}
          />
        );
      case "image":
        return (
          <div className="flex items-center justify-center h-[70vh]">
            <img
              src={material.url}
              alt={material.title}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        );
      case "video":
        return (
          <video controls className="w-full max-h-[70vh]">
            <source src={material.url} />
            Your browser does not support video playback.
          </video>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center h-[70vh] text-center">
            <p className="mb-4">Preview not available for this file type</p>
            <Button asChild>
              <a href={material.downloadUrl} download>
                <Download className="mr-2 h-4 w-4" /> Download to view
              </a>
            </Button>
          </div>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-5xl p-0 overflow-hidden">
        <DialogHeader className="px-6 py-4 flex flex-row items-center justify-between">
          <DialogTitle>{material.title}</DialogTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <a href={material.downloadUrl} download>
                <Download className="mr-2 h-4 w-4" /> Download
              </a>
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        <div className="overflow-auto">{renderContent()}</div>
      </DialogContent>
    </Dialog>
  );
};

export default MaterialViewer;
