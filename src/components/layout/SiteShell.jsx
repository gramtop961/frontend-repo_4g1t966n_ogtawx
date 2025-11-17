import React from 'react'
import { Link } from 'react-router-dom'
import { Search, Bell, Sparkles, Palette } from 'lucide-react'
import Input from '../ui/Input'
import Button from '../ui/Button'

export default function SiteShell({ children, onSearch }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-slate-900/70 bg-slate-900/70 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <Sparkles className="text-emerald-400" size={22} />
            <span>SneakPeak</span>
          </Link>

          <div className="flex-1 max-w-2xl mx-auto hidden md:flex items-center gap-2">
            <Search size={16} className="text-slate-400" />
            <Input placeholder="Search sneakers, brands, or models" onChange={(e)=>onSearch?.(e.target.value)} />
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <Button variant="ghost" className="gap-2"><Bell size={18}/> Alerts</Button>
            <Link to="/customize/demo"><Button variant="secondary" className="gap-2"><Palette size={18}/> Customize</Button></Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="border-t border-white/10 py-8 text-center text-slate-400">© {new Date().getFullYear()} SneakPeak</footer>
    </div>
  )
}
