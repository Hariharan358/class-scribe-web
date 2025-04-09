
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ChevronRight, FolderOpen, Search } from "lucide-react";
import Layout from "@/components/Layout";
import MaterialItem from "@/components/MaterialItem";
import MaterialViewer from "@/components/MaterialViewer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMockData, Material, Subject } from "@/hooks/useMockData";

const SubjectDetailPage = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const { getSubject, getSubjectMaterials, loading } = useMockData();
  
  const [subject, setSubject] = useState<Subject | null>(null);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewerOpen, setViewerOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
  
  useEffect(() => {
    if (subjectId && !loading) {
      const subjectData = getSubject(subjectId);
      const materialsData = getSubjectMaterials(subjectId);
      
      setSubject(subjectData);
      setMaterials(materialsData);
    }
  }, [subjectId, loading, getSubject, getSubjectMaterials]);
  
  const filteredMaterials = materials.filter((material) =>
    material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    material.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    material.type.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const documentMaterials = filteredMaterials.filter((m) => m.type === "document");
  const imageMaterials = filteredMaterials.filter((m) => m.type === "image");
  const videoMaterials = filteredMaterials.filter((m) => m.type === "video");
  const otherMaterials = filteredMaterials.filter(
    (m) => m.type !== "document" && m.type !== "image" && m.type !== "video"
  );
  
  const openMaterialViewer = (material: Material) => {
    setSelectedMaterial(material);
    setViewerOpen(true);
  };
  
  if (loading) {
    return (
      <Layout>
        <div className="container py-8">
          <div className="h-8 bg-gray-100 animate-pulse rounded w-48 mb-4"></div>
          <div className="h-4 bg-gray-100 animate-pulse rounded w-96 mb-8"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-16 bg-gray-100 animate-pulse rounded-lg"></div>
            ))}
          </div>
        </div>
      </Layout>
    );
  }
  
  if (!subject) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Subject Not Found</h2>
          <p className="text-gray-500 mb-6">The subject you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <a href="/subjects">Back to Subjects</a>
          </Button>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container py-8">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <a href="/" className="hover:text-primary">Home</a>
          <ChevronRight className="h-4 w-4 mx-2" />
          <a href="/subjects" className="hover:text-primary">Subjects</a>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-gray-700 font-medium">{subject.title}</span>
        </div>
        
        {/* Subject Header */}
        <div className="flex items-start gap-4 mb-8">
          <div className={`w-12 h-12 rounded-md flex items-center justify-center bg-${subject.color}-100 text-${subject.color}-700 border-${subject.color}-200`}>
            <FolderOpen className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-1">{subject.title}</h1>
            <p className="text-gray-500 mb-2">{subject.description}</p>
            <div className="text-sm text-gray-500">
              <span className="font-medium">{subject.materialsCount}</span> materials available
            </div>
          </div>
        </div>
        
        {/* Search and Filter */}
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
        
        {/* Materials Tabs */}
        <Tabs defaultValue="all" className="mb-8">
          <TabsList>
            <TabsTrigger value="all">
              All ({filteredMaterials.length})
            </TabsTrigger>
            <TabsTrigger value="documents">
              Documents ({documentMaterials.length})
            </TabsTrigger>
            <TabsTrigger value="images">
              Images ({imageMaterials.length})
            </TabsTrigger>
            <TabsTrigger value="videos">
              Videos ({videoMaterials.length})
            </TabsTrigger>
            {otherMaterials.length > 0 && (
              <TabsTrigger value="other">
                Other ({otherMaterials.length})
              </TabsTrigger>
            )}
          </TabsList>
          
          <TabsContent value="all" className="space-y-3 mt-4">
            {filteredMaterials.length > 0 ? (
              filteredMaterials.map((material) => (
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
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No materials match your search query.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="documents" className="space-y-3 mt-4">
            {documentMaterials.length > 0 ? (
              documentMaterials.map((material) => (
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
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No document materials available.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="images" className="space-y-3 mt-4">
            {imageMaterials.length > 0 ? (
              imageMaterials.map((material) => (
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
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No image materials available.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="videos" className="space-y-3 mt-4">
            {videoMaterials.length > 0 ? (
              videoMaterials.map((material) => (
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
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No video materials available.</p>
              </div>
            )}
          </TabsContent>
          
          {otherMaterials.length > 0 && (
            <TabsContent value="other" className="space-y-3 mt-4">
              {otherMaterials.map((material) => (
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
            </TabsContent>
          )}
        </Tabs>
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

export default SubjectDetailPage;
