import { create } from 'zustand';

// Temporary schema shapes until Supabase schemas are fully defined.
export type ResumeData = {
  personalInfo: {
    fullName: string;
    jobTitle: string;
    email: string;
    phone: string;
    address: string;
    linkedin: string;
  };
  summary: string;
  workExperience: Array<{
    id: string;
    company: string;
    role: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  education: Array<{
    id: string;
    institution: string;
    degree: string;
    graduationYear: string;
  }>;
  skills: string[];
  template: 'professional' | 'modern' | 'minimal';
};

interface ResumeStore {
  data: ResumeData;
  updatePersonalInfo: (info: Partial<ResumeData['personalInfo']>) => void;
  updateSummary: (summary: string) => void;
  updateWorkExperience: (index: number, experience: Partial<ResumeData['workExperience'][0]>) => void;
  addWorkExperience: () => void;
  removeWorkExperience: (id: string) => void;
  updateEducation: (index: number, education: Partial<ResumeData['education'][0]>) => void;
  addEducation: () => void;
  removeEducation: (id: string) => void;
  addSkill: (skill: string) => void;
  removeSkill: (skill: string) => void;
  setTemplate: (template: ResumeData['template']) => void;
}

const initialData: ResumeData = {
  personalInfo: {
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    address: '',
    linkedin: '',
  },
  summary: '',
  workExperience: [
    {
      id: "1",
      company: '',
      role: '',
      startDate: '',
      endDate: '',
      description: '',
    }
  ],
  education: [],
  skills: [],
  template: 'professional',
};

export const useResumeStore = create<ResumeStore>((set) => ({
  data: initialData,
  updatePersonalInfo: (info) =>
    set((state) => ({
      data: {
        ...state.data,
        personalInfo: { ...state.data.personalInfo, ...info },
      },
    })),
  updateSummary: (summary) =>
    set((state) => ({
      data: { ...state.data, summary },
    })),
  updateWorkExperience: (index, experience) =>
    set((state) => {
      const newExp = [...state.data.workExperience];
      newExp[index] = { ...newExp[index], ...experience };
      return { data: { ...state.data, workExperience: newExp } };
    }),
  addWorkExperience: () =>
    set((state) => ({
      data: {
        ...state.data,
        workExperience: [
          ...state.data.workExperience,
          { id: crypto.randomUUID(), company: '', role: '', startDate: '', endDate: '', description: '' },
        ],
      },
    })),
  removeWorkExperience: (id) =>
    set((state) => ({
      data: {
        ...state.data,
        workExperience: state.data.workExperience.filter((exp) => exp.id !== id),
      },
    })),
  updateEducation: (index, education) =>
    set((state) => {
      const newEdu = [...state.data.education];
      newEdu[index] = { ...newEdu[index], ...education };
      return { data: { ...state.data, education: newEdu } };
    }),
  addEducation: () =>
    set((state) => ({
      data: {
        ...state.data,
        education: [
          ...state.data.education,
          { id: crypto.randomUUID(), institution: '', degree: '', graduationYear: '' },
        ],
      },
    })),
  removeEducation: (id) =>
    set((state) => ({
      data: {
        ...state.data,
        education: state.data.education.filter((edu) => edu.id !== id),
      },
    })),
  addSkill: (skill) =>
    set((state) => ({
      data: {
        ...state.data,
        skills: [...state.data.skills, skill],
      },
    })),
  removeSkill: (skillToRemove) =>
    set((state) => ({
      data: {
        ...state.data,
        skills: state.data.skills.filter((skill) => skill !== skillToRemove),
      },
    })),
  setTemplate: (template) =>
    set((state) => ({
      data: {
        ...state.data,
        template,
      },
    })),
}));
