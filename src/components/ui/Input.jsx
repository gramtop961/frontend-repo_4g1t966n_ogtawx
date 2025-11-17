import React from 'react'

export default function Input({ className = '', ...props }) {
  return (
    <input
      className={`w-full bg-slate-800/60 border border-white/10 rounded-md px-3 h-10 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 ${className}`}
      {...props}
    />
  )
}
