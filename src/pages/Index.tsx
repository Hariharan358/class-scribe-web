
import { useState } from "react";
import { ArrowRight, BookOpen, ChevronRight, Clock, Download } from "lucide-react";
import Layout from "@/components/Layout";
import SubjectCard from "@/components/SubjectCard";
import MaterialItem from "@/components/MaterialItem";
import MaterialViewer from "@/components/MaterialViewer";
import { Button } from "@/components/ui/button";
import { useMockData, Material } from "@/hooks/useMockData";

const Index = () => {
  const { subjects, loading, getRecentMaterials } = useMockData();
  const [viewerOpen, setViewerOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
  
  const recentMaterials = getRecentMaterials(4);
  
  const openMaterialViewer = (material: Material) => {
    setSelectedMaterial(material);
    setViewerOpen(true);
  };
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-12 md:py-20">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Your Learning Materials, <span className="text-blue-600">All in One Place</span>
              </h1>
              <p className="text-lg text-gray-600 mb-6 max-w-2xl">
                Access your class materials, observations, and records instantly. Download, view, and organize resources effortlessly.
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <Button size="lg" asChild>
                  <a href="/subjects">
                    Browse Subjects <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="/recent">
                    Recent Materials <Clock className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
            <div className="flex-1 flex justify-center md:justify-end">
              <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 max-w-md">
                <img
                  src="https://picsum.photos/id/24/600/400"
                  alt="Students studying with digital materials"
                  className="rounded-md w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Subjects Section */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Subjects</h2>
              <p className="text-gray-500">Browse through all available subject materials</p>
            </div>
            <Button variant="ghost" asChild>
              <a href="/subjects" className="flex items-center">
                View All <ChevronRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-48 bg-gray-100 animate-pulse rounded-lg"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subjects.slice(0, 6).map((subject) => (
                <SubjectCard
                  key={subject.id}
                  id={subject.id}
                  title={subject.title}
                  description={subject.description}
                  materialsCount={subject.materialsCount}
                  icon={subject.icon}
                  color={subject.color}
                />
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Recent Materials Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Recently Added</h2>
              <p className="text-gray-500">Check out the latest materials uploaded to the platform</p>
            </div>
            <Button variant="ghost" asChild>
              <a href="/recent" className="flex items-center">
                View All <ChevronRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
          </div>
          
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-16 bg-gray-100 animate-pulse rounded-lg"></div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {recentMaterials.map((material) => (
                <MaterialItem
                  key={material.id}
                  id={material.id}
                  title={material.title}
                  type={material.type}
                  uploadDate={material.uploadDate}
                  fileSize={material.fileSize}
                  downloadUrl={material.downloadUrl}
                  viewUrl={material.viewUrl}
                />
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Everything You Need for Class Management</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Our platform provides comprehensive tools to manage, access, and share class materials efficiently.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Organized Content</h3>
              <p className="text-gray-500">
                All class materials are neatly organized by subject for easy navigation and access.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Download className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Downloads</h3>
              <p className="text-gray-500">
                Download materials with a single click for offline access whenever you need them.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Recent Updates</h3>
              <p className="text-gray-500">
                Stay updated with the latest materials and resources added to each subject.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Material Viewer */}
      <MaterialViewer
        isOpen={viewerOpen}
        onClose={() => setViewerOpen(false)}
        material={selectedMaterial}
      />
    </Layout>
  );
};

export default Index;
