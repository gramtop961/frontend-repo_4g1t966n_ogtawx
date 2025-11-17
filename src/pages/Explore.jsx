import React, { useEffect, useState } from 'react'
import SiteShell from '../components/layout/SiteShell'
import Filters from '../components/Filters'
import { api } from '../lib/api'
import { Link } from 'react-router-dom'

export default function Explore(){
  const [params, setParams] = useState({})
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)

  const run = async(p = params)=>{
    setLoading(true)
    try{ setItems(await api.search(p)) } finally{ setLoading(false) }
  }

  useEffect(()=>{ run({}) },[])

  return (
    <SiteShell>
      <div className="flex items-end justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Product Explorer</h1>
          <p className="text-slate-400">Search and filter by brand, price, model, release date</p>
        </div>
      </div>

      <Filters onApply={(f)=>{ setParams(f); run(f) }} />

      <div className="mt-6">
        {loading && <div className="text-slate-400">Loading...</div>}
        {!loading && !items.length && <div className="text-slate-400">No results</div>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(item=> (
            <Link key={item.id} to={`/sneaker/${item.id}`} className="group bg-slate-900/60 border border-white/10 rounded-xl overflow-hidden hover:border-emerald-500/40 transition-colors">
              <div className="aspect-[4/3] bg-slate-800 overflow-hidden">
                <img src={item.media?.imageUrl} alt={item.model} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform"/>
              </div>
              <div className="p-4">
                <div className="text-xs uppercase tracking-wide text-slate-400">{item.brand}</div>
                <div className="font-semibold">{item.model}</div>
                <div className="text-sm text-slate-400">{item.colorway}</div>
                <div className="mt-2 text-emerald-400 text-sm">Last sale ${item.stockx?.lastSale?.toLocaleString?.() || item.stockx?.lastSale}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </SiteShell>
  )
}
