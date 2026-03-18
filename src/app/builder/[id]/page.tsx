import { EditorPanel } from "@/components/builder/EditorPanel";
import { LivePreviewPanel } from "@/components/builder/LivePreviewPanel";


export default function BuilderPage() {
  // In a real app we'd fetch the resume from Supabase using params.id
  // and hydrate the Zustand store here.
  
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      
      {/* Left Panel: Editor (40%) */}
      <section className="w-full md:w-[40%] h-full border-r bg-white flex flex-col shadow-[4px_0_24px_-10px_rgba(0,0,0,0.1)] z-10">
        
        {/* Editor Header / Stepper Placeholder */}
        <header className="h-16 border-b flex items-center px-6 shrink-0 bg-white">
          <div className="flex items-center justify-between w-full">
            <h2 className="font-semibold text-slate-800">Resume Editor</h2>
            <div className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
              Draft Mode
            </div>
          </div>
        </header>
        
        {/* Editor Form Area via EditorPanel component */}
        <div className="flex-1 overflow-hidden relative">
          <EditorPanel />
        </div>
        
      </section>

      {/* Right Panel: Live Preview (60%) */}
      <section className="hidden md:flex flex-1 h-full flex-col relative z-0">
        <LivePreviewPanel />
      </section>

    </div>
  );
}
