"use client";

import { useState } from "react";
import { useResumeStore } from "@/lib/store/useResumeStore";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

export function SkillsForm() {
  const { data, addSkill, removeSkill } = useResumeStore();
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      // Avoid duplicates
      if (!data.skills.includes(inputValue.trim())) {
         addSkill(inputValue.trim());
      }
      setInputValue("");
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
         <p className="text-sm text-slate-500 mb-4">
           Type a skill and press <kbd className="font-mono bg-slate-100 border px-1.5 py-0.5 rounded text-xs text-slate-800">Enter</kbd> to add it as a tag.
         </p>
         <Input 
            placeholder="E.g. React, TypeScript, Python..." 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
         />
      </div>

      <div className="flex flex-wrap gap-2 pt-4">
         {data.skills.length === 0 && (
           <p className="text-sm text-slate-400 italic">No skills added yet.</p>
         )}
         {data.skills.map((skill) => (
           <Badge key={skill} variant="secondary" className="px-3 py-1.5 text-sm bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 gap-2 flex items-center">
             {skill}
             <X 
               className="h-3.5 w-3.5 cursor-pointer opacity-50 hover:opacity-100" 
               onClick={() => removeSkill(skill)}
             />
           </Badge>
         ))}
      </div>
    </div>
  );
}
