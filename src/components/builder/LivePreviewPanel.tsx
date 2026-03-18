"use client";

import { useResumeStore } from "@/lib/store/useResumeStore";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import { ResumePDF } from "./ResumePDF";
import { ResumeMinimal } from "./ResumeMinimal";
import { ResumeModern } from "./ResumeModern";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
export function LivePreviewPanel() {
  const { data, setTemplate } = useResumeStore();
  
  // Debounce the data to prevent react-pdf from crashing on rapid keystrokes
  const [debouncedData, setDebouncedData] = useState(data);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedData(data);
    }, 500); // 500ms debounce
    return () => clearTimeout(timer);
  }, [data]);

  // We need to mount the PDFViewer only on the client side 
  // because @react-pdf relies on browser APIs that break SSR.
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="flex-1 w-full h-full flex flex-col items-center justify-center p-8 pt-24 pb-24 text-slate-400">
         <Loader2 className="h-8 w-8 animate-spin text-blue-500 mb-4" />
         <p>Initializing PDF Engine...</p>
      </div>
    );
  }

  const getActiveTemplate = (resumeData: any) => {
    switch (resumeData.template) {
      case 'minimal': return <ResumeMinimal data={resumeData} />;
      case 'modern': return <ResumeModern data={resumeData} />;
      case 'professional': default: return <ResumePDF data={resumeData} />;
    }
  };

  const fileName = debouncedData.personalInfo.fullName  
    ? `${debouncedData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf` 
    : 'Resume.pdf';

  return (
    <div className="relative flex-1 flex flex-col h-full w-full bg-slate-100/50">
      
      {/* Floating Toolbar */}
      <header className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md shadow-lg border border-slate-200/60 rounded-full px-2 py-2 flex items-center gap-4 z-20">
         <div className="pl-2 pr-2">
            <Select value={data.template} onValueChange={(v: any) => setTemplate(v)}>
              <SelectTrigger className="w-[180px] h-9 bg-transparent border-none shadow-none focus-visible:ring-0 text-slate-700 font-semibold">
                <SelectValue placeholder="Select Template" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="modern">Modern</SelectItem>
                <SelectItem value="minimal">Minimal</SelectItem>
              </SelectContent>
            </Select>
         </div>
         <div className="w-px h-6 bg-slate-200"></div>
         <PDFDownloadLink document={getActiveTemplate(debouncedData)} fileName={fileName}>
            {({ loading }) => (
              <Button 
                size="sm" 
                className="rounded-full bg-blue-600 hover:bg-blue-700 shadow-md gap-2 pl-3 pr-4"
                disabled={loading}
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
                {loading ? "Generating..." : "Download PDF"}
              </Button>
            )}
         </PDFDownloadLink>
      </header>

      {/* PDF Document Canvas */}
      <div className="flex-1 overflow-hidden p-4 md:p-8 pt-20 flex items-center relative z-10 w-full h-full">
         <div className="w-full h-full max-w-5xl mx-auto shadow-2xl rounded-sm overflow-hidden border border-slate-200 bg-white">
            <PDFViewer width="100%" height="100%" className="border-none bg-slate-50">
               {getActiveTemplate(debouncedData)}
            </PDFViewer>
         </div>
      </div>
    </div>
  );
}
