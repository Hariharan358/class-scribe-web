
import { useState } from "react";
import { ChevronRight, Clock, Search } from "lucide-react";
import Layout from "@/components/Layout";
import MaterialItem from "@/components/MaterialItem";
import MaterialViewer from "@/components/MaterialViewer";
import { Input } from "@/components/ui/input";
import { useMockData, Material } from "@/hooks/useMockData";

const RecentPage = () => {
  const { materials, loading } = useMockData();
  const [searchQuery, setSearchQuery] = useState("");
  const [viewerOpen, setViewerOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
  
  // Sort materials by date (newest first)
  const sortedMaterials = [...materials].sort(
    (a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
  );
  
  const filteredMaterials = sortedMaterials.filter((material) =>
    material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    material.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    material.type.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const openMaterialViewer = (material: Material) => {
    setSelectedMaterial(material);
    setViewerOpen(true);
  };
  
  return (
    <Layout>
      <div className="container py-8">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <a href="/" className="hover:text-primary">Home</a>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-gray-700 font-medium">Recent Materials</span>
        </div>
        
        {/* Page Header */}
        <div className="flex items-start gap-4 mb-8">
          <div className="w-12 h-12 rounded-md flex items-center justify-center bg-blue-100 text-blue-700 border-blue-200">
            <Clock className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-1">Recent Materials</h1>
            <p className="text-gray-500">
              The latest materials added across all subjects, sorted by date
            </p>
          </div>
        </div>
        
        {/* Search */}
        <div className="relative max-w-md mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search materials..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {/* Materials List */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-16 bg-gray-100 animate-pulse rounded-lg"></div>
            ))}
          </div>
        ) : filteredMaterials.length > 0 ? (
          <div className="space-y-3">
            {filteredMaterials.map((material) => (
              <div
                key={material.id}
                onClick={() => openMaterialViewer(material)}
                className="cursor-pointer"
              >
                <MaterialItem
                  id={material.id}
                  title={material.title}
                  type={material.type}
                  uploadDate={material.uploadDate}
                  fileSize={material.fileSize}
                  downloadUrl={material.downloadUrl}
                  viewUrl={material.viewUrl}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">No materials found</h3>
            <p className="text-gray-500">
              No materials match your search query. Try using different keywords.
            </p>
          </div>
        )}
      </div>
      
      {/* Material Viewer */}
      <MaterialViewer
        isOpen={viewerOpen}
        onClose={() => setViewerOpen(false)}
        material={selectedMaterial}
      />
    </Layout>
  );
};

export default RecentPage;
