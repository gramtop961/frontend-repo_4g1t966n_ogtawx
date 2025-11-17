import React from 'react'
import clsx from 'clsx'

export default function Button({ as: Tag = 'button', className = '', variant = 'primary', size = 'md', ...props }) {
  const base = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none'
  const variants = {
    primary: 'bg-emerald-500 hover:bg-emerald-600 text-white focus:ring-emerald-500/50',
    secondary: 'bg-slate-700 hover:bg-slate-600 text-white focus:ring-slate-500/50',
    ghost: 'bg-transparent hover:bg-white/5 text-white focus:ring-white/20',
    outline: 'border border-white/20 text-white hover:bg-white/5 focus:ring-white/20',
  }
  const sizes = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-6 text-base',
  }
  return <Tag className={clsx(base, variants[variant], sizes[size], className)} {...props} />
}
