"use client";

import { useResumeStore } from "@/lib/store/useResumeStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function PersonalInfoForm() {
  const { data, updatePersonalInfo } = useResumeStore();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input 
            id="fullName" 
            placeholder="John Doe" 
            value={data.personalInfo.fullName}
            onChange={(e) => updatePersonalInfo({ fullName: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="jobTitle">Job Title</Label>
          <Input 
            id="jobTitle" 
            placeholder="Software Engineer" 
            value={data.personalInfo.jobTitle}
            onChange={(e) => updatePersonalInfo({ jobTitle: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="john@example.com" 
            value={data.personalInfo.email}
            onChange={(e) => updatePersonalInfo({ email: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input 
            id="phone" 
            type="tel" 
            placeholder="+1 (555) 000-0000" 
            value={data.personalInfo.phone}
            onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="address">Location</Label>
          <Input 
            id="address" 
            placeholder="New York, NY" 
            value={data.personalInfo.address}
            onChange={(e) => updatePersonalInfo({ address: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="linkedin">LinkedIn / Portfolio</Label>
          <Input 
            id="linkedin" 
            placeholder="linkedin.com/in/johndoe" 
            value={data.personalInfo.linkedin}
            onChange={(e) => updatePersonalInfo({ linkedin: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
}
