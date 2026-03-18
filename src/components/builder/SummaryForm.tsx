"use client";

import { useResumeStore } from "@/lib/store/useResumeStore";
import { Textarea } from "@/components/ui/textarea";

export function SummaryForm() {
  const { data, updateSummary } = useResumeStore();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
         <p className="text-sm text-slate-500">
           Write a brief, 2-3 sentence overview of your professional background and key strengths.
         </p>
         {/* Placeholder for AI Generator button here later */}
      </div>
      <Textarea 
        placeholder="E.g. Results-driven Software Engineer with 5+ years of experience in full-stack web development..." 
        className="min-h-[150px] resize-y"
        value={data.summary}
        onChange={(e) => updateSummary(e.target.value)}
      />
    </div>
  );
}
