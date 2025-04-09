
import { useState, useEffect } from "react";

export interface Subject {
  id: string;
  title: string;
  description: string;
  materialsCount: number;
  icon: string;
  color: "blue" | "green" | "yellow" | "purple" | "red";
}

export interface Material {
  id: string;
  subjectId: string;
  title: string;
  description: string;
  type: "document" | "image" | "video" | "archive" | "other";
  uploadDate: string;
  fileSize: string;
  downloadUrl: string;
  viewUrl: string;
  url: string;
}

// Mock data for subjects
const mockSubjects: Subject[] = [
  {
    id: "math-101",
    title: "Mathematics",
    description: "Algebra, calculus, geometry, and mathematical concepts",
    materialsCount: 15,
    icon: "folder",
    color: "blue"
  },
  {
    id: "physics-101",
    title: "Physics",
    description: "Mechanics, thermodynamics, and physics experiments",
    materialsCount: 12,
    icon: "folder",
    color: "green"
  },
  {
    id: "chem-101",
    title: "Chemistry",
    description: "Chemical reactions, organic chemistry, and lab observations",
    materialsCount: 9,
    icon: "folder",
    color: "purple"
  },
  {
    id: "bio-101",
    title: "Biology",
    description: "Cell biology, genetics, ecology, and biological processes",
    materialsCount: 10,
    icon: "folder",
    color: "red"
  },
  {
    id: "cs-101",
    title: "Computer Science",
    description: "Programming, algorithms, data structures, and software development",
    materialsCount: 14,
    icon: "folder",
    color: "yellow"
  },
  {
    id: "eng-101",
    title: "English Literature",
    description: "Literary analysis, writing techniques, and language arts",
    materialsCount: 8,
    icon: "folder",
    color: "blue"
  }
];

// Mock data for materials
const mockMaterials: Material[] = [
  // Mathematics materials
  {
    id: "math-notes-1",
    subjectId: "math-101",
    title: "Algebra Fundamentals",
    description: "Basic algebraic operations and equations",
    type: "document",
    uploadDate: "2023-04-15",
    fileSize: "2.3 MB",
    downloadUrl: "/mock-files/math-notes.pdf",
    viewUrl: "/subjects/math-101/materials/math-notes-1",
    url: "https://mozilla.github.io/pdf.js/web/viewer.html"
  },
  {
    id: "math-calc-1",
    subjectId: "math-101",
    title: "Calculus Formulas",
    description: "Key formulas for differential and integral calculus",
    type: "document",
    uploadDate: "2023-05-20",
    fileSize: "1.7 MB",
    downloadUrl: "/mock-files/calculus.pdf",
    viewUrl: "/subjects/math-101/materials/math-calc-1",
    url: "https://mozilla.github.io/pdf.js/web/viewer.html"
  },
  {
    id: "math-graph-1",
    subjectId: "math-101",
    title: "Function Graphs",
    description: "Visual representation of mathematical functions",
    type: "image",
    uploadDate: "2023-06-10",
    fileSize: "3.2 MB",
    downloadUrl: "/mock-files/graphs.jpg",
    viewUrl: "/subjects/math-101/materials/math-graph-1",
    url: "https://picsum.photos/id/1/800/600"
  },
  
  // Physics materials
  {
    id: "phys-mech-1",
    subjectId: "physics-101",
    title: "Mechanics Lecture",
    description: "Introduction to Newtonian mechanics",
    type: "video",
    uploadDate: "2023-04-18",
    fileSize: "45.6 MB",
    downloadUrl: "/mock-files/mechanics.mp4",
    viewUrl: "/subjects/physics-101/materials/phys-mech-1",
    url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"
  },
  {
    id: "phys-therm-1",
    subjectId: "physics-101",
    title: "Thermodynamics Notes",
    description: "Laws of thermodynamics and heat transfer",
    type: "document",
    uploadDate: "2023-05-05",
    fileSize: "2.1 MB",
    downloadUrl: "/mock-files/thermodynamics.pdf",
    viewUrl: "/subjects/physics-101/materials/phys-therm-1",
    url: "https://mozilla.github.io/pdf.js/web/viewer.html"
  },
  
  // Chemistry materials
  {
    id: "chem-org-1",
    subjectId: "chem-101",
    title: "Organic Chemistry Molecules",
    description: "Structure and properties of organic molecules",
    type: "image",
    uploadDate: "2023-04-25",
    fileSize: "4.3 MB",
    downloadUrl: "/mock-files/organic-chem.png",
    viewUrl: "/subjects/chem-101/materials/chem-org-1",
    url: "https://picsum.photos/id/2/800/600"
  },
  {
    id: "chem-lab-1",
    subjectId: "chem-101",
    title: "Lab Safety Guidelines",
    description: "Safety procedures for chemistry laboratory",
    type: "document",
    uploadDate: "2023-05-15",
    fileSize: "1.5 MB",
    downloadUrl: "/mock-files/lab-safety.pdf",
    viewUrl: "/subjects/chem-101/materials/chem-lab-1",
    url: "https://mozilla.github.io/pdf.js/web/viewer.html"
  },
  
  // Biology materials
  {
    id: "bio-cell-1",
    subjectId: "bio-101",
    title: "Cell Structure Diagram",
    description: "Detailed diagram of plant and animal cells",
    type: "image",
    uploadDate: "2023-04-12",
    fileSize: "2.8 MB",
    downloadUrl: "/mock-files/cell-structure.jpg",
    viewUrl: "/subjects/bio-101/materials/bio-cell-1",
    url: "https://picsum.photos/id/3/800/600"
  },
  {
    id: "bio-gen-1",
    subjectId: "bio-101",
    title: "Genetics Lecture",
    description: "DNA structure and genetic inheritance",
    type: "video",
    uploadDate: "2023-05-28",
    fileSize: "38.2 MB",
    downloadUrl: "/mock-files/genetics.mp4",
    viewUrl: "/subjects/bio-101/materials/bio-gen-1",
    url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"
  },
  
  // Computer Science materials
  {
    id: "cs-algo-1",
    subjectId: "cs-101",
    title: "Algorithm Complexity",
    description: "Time and space complexity analysis of algorithms",
    type: "document",
    uploadDate: "2023-04-08",
    fileSize: "1.9 MB",
    downloadUrl: "/mock-files/algorithms.pdf",
    viewUrl: "/subjects/cs-101/materials/cs-algo-1",
    url: "https://mozilla.github.io/pdf.js/web/viewer.html"
  },
  {
    id: "cs-data-1",
    subjectId: "cs-101",
    title: "Data Structures Overview",
    description: "Common data structures and their applications",
    type: "document",
    uploadDate: "2023-05-17",
    fileSize: "2.5 MB",
    downloadUrl: "/mock-files/data-structures.pdf",
    viewUrl: "/subjects/cs-101/materials/cs-data-1",
    url: "https://mozilla.github.io/pdf.js/web/viewer.html"
  },
  
  // English Literature materials
  {
    id: "eng-lit-1",
    subjectId: "eng-101",
    title: "Literary Analysis Guide",
    description: "Techniques for analyzing literary texts",
    type: "document",
    uploadDate: "2023-04-30",
    fileSize: "1.8 MB",
    downloadUrl: "/mock-files/literary-analysis.pdf",
    viewUrl: "/subjects/eng-101/materials/eng-lit-1",
    url: "https://mozilla.github.io/pdf.js/web/viewer.html"
  }
];

export const useMockData = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch delay
    const timer = setTimeout(() => {
      setSubjects(mockSubjects);
      setMaterials(mockMaterials);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const getSubject = (id: string) => {
    return subjects.find((subject) => subject.id === id) || null;
  };

  const getSubjectMaterials = (subjectId: string) => {
    return materials.filter((material) => material.subjectId === subjectId);
  };

  const getMaterial = (id: string) => {
    return materials.find((material) => material.id === id) || null;
  };

  const getRecentMaterials = (limit = 5) => {
    return [...materials]
      .sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime())
      .slice(0, limit);
  };

  return {
    subjects,
    materials,
    loading,
    getSubject,
    getSubjectMaterials,
    getMaterial,
    getRecentMaterials
  };
};
