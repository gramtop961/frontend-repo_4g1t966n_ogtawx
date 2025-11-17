import React, { useEffect, useState } from 'react'
import { api } from '../lib/api'
import { Link } from 'react-router-dom'

function Card({ item }){
  return (
    <Link to={`/sneaker/${item.id}`} className="group bg-slate-900/60 border border-white/10 rounded-xl overflow-hidden hover:border-emerald-500/40 transition-colors">
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
  )
}

export default function TrendingGrid(){
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    let mounted = true
    api.trending(12).then(d=>{ if(mounted) setItems(d) }).finally(()=> setLoading(false))
    return ()=>{ mounted=false }
  },[])

  if(loading) return <div className="text-slate-400">Loading trending...</div>
  if(!items.length) return <div className="text-slate-400">No trending items</div>

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map(it=> <Card key={it.id} item={it} />)}
    </div>
  )
}
