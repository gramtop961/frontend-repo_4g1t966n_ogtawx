import React, { useEffect, useState } from 'react'
import SiteShell from '../components/layout/SiteShell'
import { api } from '../lib/api'
import Button from '../components/ui/Button'
import { Bell, Palette } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'

export default function Sneaker(){
  const { id } = useParams()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    let mounted = true
    api.sneaker(id).then(d=>{ if(mounted) setData(d) }).finally(()=> setLoading(false))
    return ()=>{ mounted=false }
  },[id])

  return (
    <SiteShell>
      {loading && <div className="text-slate-400">Loading...</div>}
      {!loading && !data && <div className="text-slate-400">Not found</div>}
      {data && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-slate-900/60 border border-white/10 rounded-xl overflow-hidden">
            <img src={data.media?.imageUrl} alt={data.model} className="w-full h-auto object-cover" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wide text-slate-400">{data.brand}</div>
            <h1 className="text-3xl font-bold">{data.model}</h1>
            <div className="text-slate-400">{data.colorway}</div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="bg-slate-900/60 p-4 rounded-lg border border-white/10">
                <div className="text-xs text-slate-400">Last Sale</div>
                <div className="text-xl font-semibold">${data.stockx?.lastSale}</div>
              </div>
              <div className="bg-slate-900/60 p-4 rounded-lg border border-white/10">
                <div className="text-xs text-slate-400">Lowest Ask</div>
                <div className="text-xl font-semibold">${data.stockx?.lowestAsk}</div>
              </div>
              <div className="bg-slate-900/60 p-4 rounded-lg border border-white/10">
                <div className="text-xs text-slate-400">Highest Bid</div>
                <div className="text-xl font-semibold">${data.stockx?.highestBid}</div>
              </div>
            </div>

            <div className="mt-6">
              <div className="text-sm text-slate-400 mb-2">Sizes</div>
              <div className="flex flex-wrap gap-2">
                {data.sizes?.map(s => (
                  <div key={s} className="px-3 py-2 rounded-md bg-slate-800 border border-white/10 text-sm">{s}</div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <Button className="gap-2"><Bell size={18}/> Notify me</Button>
              <Link to={`/customize/${data.id}`}><Button variant="secondary" className="gap-2"><Palette size={18}/> Customize this Sneaker</Button></Link>
            </div>
          </div>
        </div>
      )}
    </SiteShell>
  )
}
