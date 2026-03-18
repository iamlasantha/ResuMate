import { Plus, Settings, HelpCircle, FileText, Download, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  // Temporary mock data until Supabase is hooked up
  const mockResumes = [
    { id: "1", title: "Software Engineer Resume", date: "Oct 24, 2024", score: 85 },
    { id: "2", title: "Product Manager Variant", date: "Nov 02, 2024", score: 92 },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-white hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-blue-600">
            <FileText className="h-6 w-6" />
            <span>ResuMate</span>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-2 text-sm font-medium">
          <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-md bg-blue-50 text-blue-700">
            <FileText className="h-4 w-4" />
            My Resumes
          </Link>
          <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-md text-slate-600 hover:bg-slate-100 transition-colors">
            <Settings className="h-4 w-4" />
            Account Settings
          </Link>
          <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-md text-slate-600 hover:bg-slate-100 transition-colors">
            <HelpCircle className="h-4 w-4" />
            Help Center
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <header className="h-16 border-b bg-white flex items-center px-6 md:px-8">
          <h1 className="text-xl font-bold text-slate-900">My Resumes</h1>
        </header>

        <div className="flex-1 p-6 md:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            
            {/* Create New Card */}
            <Link href="/builder/new" className="group">
              <Card className="h-72 border-2 border-dashed border-slate-300 hover:border-blue-500 hover:bg-blue-50/50 transition-all flex flex-col items-center justify-center cursor-pointer shadow-sm group-hover:shadow-md">
                <div className="h-14 w-14 rounded-full bg-blue-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Plus className="h-6 w-6 text-blue-600" />
                </div>
                <p className="font-semibold text-slate-900">Create New Resume</p>
                <p className="text-sm text-slate-500 mt-1">Start from scratch</p>
              </Card>
            </Link>

            {/* Existing Resumes Gallery */}
            {mockResumes.map((resume) => (
              <Card key={resume.id} className="h-72 flex flex-col overflow-hidden shadow-sm hover:shadow-md transition-all">
                {/* Preview Image placeholder */}
                <div className="flex-1 bg-slate-100 border-b flex items-center justify-center p-4">
                   <div className="w-full h-full bg-white shadow-sm border rounded-sm flex flex-col p-2 space-y-2 opacity-50">
                      <div className="w-1/3 h-2 bg-slate-200 rounded"></div>
                      <div className="w-1/2 h-1.5 bg-slate-200 rounded"></div>
                      <div className="w-full h-1 bg-slate-100 rounded mt-4"></div>
                      <div className="w-full h-1 bg-slate-100 rounded"></div>
                      <div className="w-3/4 h-1 bg-slate-100 rounded"></div>
                   </div>
                </div>
                <CardHeader className="p-4 pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base text-slate-900 truncate pr-2">{resume.title}</CardTitle>
                      <p className="text-xs text-slate-500 mt-1">Edited {resume.date}</p>
                    </div>
                    {/* Badge placeholder for ATS score */}
                    <div className="flex items-center justify-center bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded-full">
                      {resume.score} ATS
                    </div>
                  </div>
                </CardHeader>
                <CardFooter className="p-4 pt-2 flex justify-between gap-2">
                   <Link href={`/builder/${resume.id}`} className="flex-1">
                     <Button variant="outline" size="sm" className="w-full h-8 flex items-center justify-center gap-1">
                       <Edit className="h-3.5 w-3.5" /> Edit
                     </Button>
                   </Link>
                   <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-blue-600">
                     <Download className="h-4 w-4" />
                   </Button>
                   <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-red-600 hover:bg-red-50">
                     <Trash2 className="h-4 w-4" />
                   </Button>
                </CardFooter>
            </Card>
            ))}

          </div>
        </div>
      </main>
    </div>
  );
}
