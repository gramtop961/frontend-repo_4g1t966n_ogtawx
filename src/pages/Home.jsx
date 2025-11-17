import React, { useState } from 'react'
import SiteShell from '../components/layout/SiteShell'
import TrendingGrid from '../components/TrendingGrid'
import Filters from '../components/Filters'

export default function Home(){
  const [q, setQ] = useState('')

  return (
    <SiteShell onSearch={setQ}>
      <div className="flex items-end justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Trending Sneakers</h1>
          <p className="text-slate-400">Live market vibes inspired by StockX</p>
        </div>
      </div>
      <TrendingGrid />

      <div className="mt-12 space-y-4">
        <h2 className="text-xl font-semibold">Explore</h2>
        <Filters onApply={(f)=> console.log('apply filters', f)} />
      </div>
    </SiteShell>
  )
}
