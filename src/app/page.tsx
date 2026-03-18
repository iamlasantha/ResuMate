import { FileText, Github, LayoutTemplate, PenTool, Sparkles, Wand2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <header className="px-6 lg:px-14 h-16 flex items-center justify-between border-b bg-white">
        <div className="flex items-center gap-2 font-bold text-xl text-blue-600">
          <FileText className="h-6 w-6" />
          <span>ResuMate</span>
        </div>
        <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
          <Link href="#features" className="hover:text-blue-600 transition-colors">Features</Link>
          <Link href="#templates" className="hover:text-blue-600 transition-colors">Templates</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" className="font-semibold text-slate-600">Login</Button>
          </Link>
          <Link href="/dashboard">
            <Button className="bg-blue-600 hover:bg-blue-700 font-semibold shadow-md">Sign up</Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 lg:py-32 xl:py-40 flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-400/20 rounded-full blur-[100px] -z-10" />
          
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm text-blue-600 shadow-sm font-medium mx-auto mb-4">
              <Sparkles className="mr-2 h-4 w-4" />
              විනාඩි 5කින් වෘත්තීය මට්ටමේ Resume එකක් හදන්න
            </div>
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl text-slate-900 leading-[1.1]">
              Build a Professional, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">AI-Powered</span> Resume in Minutes.
            </h1>
            <p className="mx-auto max-w-[700px] text-slate-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-6">
              ඔබේ සුදුසුකම් වලට ගැලපෙන රැකියාවක් ලබා ගැනීමට අවශ්‍ය නිවැරදිම Resume එක දැන්ම සාදාගන්න.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <Link href="/dashboard">
                <Button size="lg" className="w-full sm:w-auto h-12 px-8 text-base bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/30">
                  Build My Resume Now
                </Button>
              </Link>
              <Link href="#features">
                <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 px-8 text-base bg-white border-slate-300">
                  Learn More
                </Button>
              </Link>
            </div>
            <p className="text-sm text-slate-500 mt-6 pt-4 font-medium flex items-center justify-center gap-2">
              <span className="flex -space-x-2">
                <div className="w-6 h-6 rounded-full bg-blue-200 border border-white"></div>
                <div className="w-6 h-6 rounded-full bg-indigo-200 border border-white"></div>
                <div className="w-6 h-6 rounded-full bg-emerald-200 border border-white"></div>
              </span>
              1,000+ Students already used
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Key Features</h2>
              <p className="mt-4 text-lg text-slate-500">Everything you need to land your dream job.</p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
              {/* Feature 1 */}
              <div className="flex flex-col items-center text-center p-8 rounded-3xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 duration-300">
                <div className="p-4 bg-blue-50 rounded-2xl mb-6">
                  <Wand2 className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">AI-Optimized Bullets</h3>
                <p className="text-slate-500 leading-relaxed">Transform your experiences into powerful, action-driven statements instantly using Gemini AI.</p>
              </div>
              
              {/* Feature 2 */}
              <div className="flex flex-col items-center text-center p-8 rounded-3xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 duration-300">
                <div className="p-4 bg-emerald-50 rounded-2xl mb-6">
                  <PenTool className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">ATS Formatting</h3>
                <p className="text-slate-500 leading-relaxed">Built to easily pass Applicant Tracking Systems without breaking your clean document layout.</p>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-col items-center text-center p-8 rounded-3xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 duration-300">
                <div className="p-4 bg-purple-50 rounded-2xl mb-6">
                  <LayoutTemplate className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Modern Templates</h3>
                <p className="text-slate-500 leading-relaxed">Professional, clean, and modern layout templates suited for any competitive industry.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t border-slate-200 bg-white py-8 px-6 mt-auto">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-bold text-lg text-slate-900">
            <FileText className="h-5 w-5 text-blue-600" />
            <span>ResuMate</span>
          </div>
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} ResuMate. Built by LaSantha.
          </p>
          <div className="flex items-center gap-4">
            <a href="https://github.com/iamlasantha/ResuMate" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-slate-900 transition-colors">
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
