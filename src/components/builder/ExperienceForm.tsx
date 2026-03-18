"use client";

import { useResumeStore } from "@/lib/store/useResumeStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

export function ExperienceForm() {
  const { data, updateWorkExperience, addWorkExperience, removeWorkExperience } = useResumeStore();

  return (
    <div className="space-y-8">
      {data.workExperience.map((exp, index) => (
        <div key={exp.id} className="relative p-6 rounded-xl border border-slate-200 bg-slate-50/50 space-y-6">
          
          <div className="absolute right-4 top-4">
            <Button 
               variant="ghost" 
               size="icon" 
               className="text-slate-400 hover:text-red-600 hover:bg-red-50"
               onClick={() => removeWorkExperience(exp.id)}
               disabled={data.workExperience.length === 1}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="space-y-2">
              <Label>Company Name</Label>
              <Input 
                placeholder="Google" 
                value={exp.company}
                onChange={(e) => updateWorkExperience(index, { company: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Job Title</Label>
              <Input 
                placeholder="Senior Engineer" 
                value={exp.role}
                onChange={(e) => updateWorkExperience(index, { role: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Input 
                placeholder="Jan 2020" 
                value={exp.startDate}
                onChange={(e) => updateWorkExperience(index, { startDate: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>End Date</Label>
              <Input 
                placeholder="Present" 
                value={exp.endDate}
                onChange={(e) => updateWorkExperience(index, { endDate: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Description / Responsibilities</Label>
            <Textarea 
              placeholder="Developed scalable web applications..." 
              className="min-h-[120px]"
              value={exp.description}
              onChange={(e) => updateWorkExperience(index, { description: e.target.value })}
            />
            <p className="text-xs text-slate-500">Tip: Use bullet points for better ATS readability.</p>
          </div>
        </div>
      ))}

      <Button 
        variant="outline" 
        className="w-full border-dashed border-2 text-slate-600 hover:text-slate-900"
        onClick={addWorkExperience}
      >
        <Plus className="mr-2 h-4 w-4" /> Add Another Role
      </Button>
    </div>
  );
}
