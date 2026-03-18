"use client";

import { useResumeStore } from "@/lib/store/useResumeStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

export function EducationForm() {
  const { data, updateEducation, addEducation, removeEducation } = useResumeStore();

  return (
    <div className="space-y-8">
      {data.education.map((edu, index) => (
        <div key={edu.id} className="relative p-6 rounded-xl border border-slate-200 bg-slate-50/50 space-y-4">
          
          <div className="absolute right-4 top-4">
            <Button 
               variant="ghost" 
               size="icon" 
               className="text-slate-400 hover:text-red-600 hover:bg-red-50"
               onClick={() => removeEducation(edu.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="space-y-2">
              <Label>Institution / School</Label>
              <Input 
                placeholder="University of Colombo" 
                value={edu.institution}
                onChange={(e) => updateEducation(index, { institution: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Degree / Certification</Label>
              <Input 
                placeholder="BSc in Computer Science" 
                value={edu.degree}
                onChange={(e) => updateEducation(index, { degree: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Graduation Year</Label>
              <Input 
                placeholder="2024" 
                value={edu.graduationYear}
                onChange={(e) => updateEducation(index, { graduationYear: e.target.value })}
              />
            </div>
          </div>
        </div>
      ))}

      <Button 
        variant="outline" 
        className="w-full border-dashed border-2 text-slate-600 hover:text-slate-900"
        onClick={addEducation}
      >
        <Plus className="mr-2 h-4 w-4" /> Add Education
      </Button>
    </div>
  );
}
