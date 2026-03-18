"use client";

import { useState } from "react";
import { steps } from "./steps";
import { PersonalInfoForm } from "./PersonalInfoForm";
import { SummaryForm } from "./SummaryForm";
import { ExperienceForm } from "./ExperienceForm";
import { EducationForm } from "./EducationForm";
import { SkillsForm } from "./SkillsForm";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function EditorPanel() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const renderCurrentForm = () => {
    switch (steps[currentStepIndex].id) {
      case 'personal': return <PersonalInfoForm />;
      case 'summary': return <SummaryForm />;
      case 'experience': return <ExperienceForm />;
      case 'education': return <EducationForm />;
      case 'skills': return <SkillsForm />;
      default: return null;
    }
  };

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white relative">
      <div className="flex-1 overflow-y-auto p-6 scroll-smooth pb-32">
        <div className="max-w-xl mx-auto space-y-8">
          
          {/* Stepper Header */}
          <div className="flex items-center justify-between mb-8">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center">
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors
                  ${index === currentStepIndex 
                    ? 'bg-blue-600 text-white ring-4 ring-blue-100' 
                    : index < currentStepIndex 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {index + 1}
                </div>
                <span className={`text-xs mt-2 font-medium hidden sm:block ${index === currentStepIndex ? 'text-blue-600' : 'text-slate-400'}`}>
                  {step.title}
                </span>
              </div>
            ))}
          </div>

          <div className="bg-white p-1">
             <h3 className="text-2xl font-bold text-slate-800 mb-6">{steps[currentStepIndex].title}</h3>
             {renderCurrentForm()}
          </div>

        </div>
      </div>

       {/* Floating Fixed Footer for Navigation */}
      <div className="absolute bottom-0 left-0 right-0 border-t bg-white/80 backdrop-blur-md p-4 flex items-center justify-between w-full shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <Button 
          variant="outline" 
          onClick={handleBack} 
          disabled={currentStepIndex === 0}
          className="w-24 bg-white"
        >
          <ChevronLeft className="h-4 w-4 mr-1" /> Back
        </Button>
        <div className="text-sm font-medium text-slate-500">
           Step {currentStepIndex + 1} of {steps.length}
        </div>
        <Button 
          onClick={handleNext} 
          className="w-24 bg-blue-600 hover:bg-blue-700 shadow-sm"
        >
          {currentStepIndex === steps.length - 1 ? "Finish" : "Next"}
          {currentStepIndex !== steps.length - 1 && <ChevronRight className="h-4 w-4 ml-1" />}
        </Button>
      </div>
    </div>
  );
}
