
import { useState } from "react";
import { Search } from "lucide-react";
import Layout from "@/components/Layout";
import SubjectCard from "@/components/SubjectCard";
import { Input } from "@/components/ui/input";
import { useMockData } from "@/hooks/useMockData";

const SubjectsPage = () => {
  const { subjects, loading } = useMockData();
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredSubjects = subjects.filter((subject) =>
    subject.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    subject.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-2">Subjects</h1>
        <p className="text-gray-500 mb-8">Browse through all available subjects and their materials</p>
        
        <div className="relative max-w-md mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search subjects..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-48 bg-gray-100 animate-pulse rounded-lg"></div>
            ))}
          </div>
        ) : filteredSubjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSubjects.map((subject) => (
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
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">No subjects found</h3>
            <p className="text-gray-500">
              No subjects match your search query. Try using different keywords.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SubjectsPage;
