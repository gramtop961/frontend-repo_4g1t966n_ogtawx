import React, { useState } from 'react'
import Button from './ui/Button'
import Input from './ui/Input'

export default function Filters({ onApply }){
  const [brand, setBrand] = useState('')
  const [model, setModel] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [releaseFrom, setReleaseFrom] = useState('')
  const [releaseTo, setReleaseTo] = useState('')

  const apply = () => onApply?.({ brand, model, min_price: minPrice, max_price: maxPrice, release_from: releaseFrom, release_to: releaseTo })

  return (
    <div className="grid grid-cols-2 md:grid-cols-6 gap-3 bg-slate-900/60 border border-white/10 p-3 rounded-lg">
      <Input placeholder="Brand" value={brand} onChange={e=>setBrand(e.target.value)} />
      <Input placeholder="Model" value={model} onChange={e=>setModel(e.target.value)} />
      <Input placeholder="Min $" value={minPrice} onChange={e=>setMinPrice(e.target.value)} />
      <Input placeholder="Max $" value={maxPrice} onChange={e=>setMaxPrice(e.target.value)} />
      <Input placeholder="From YYYY-MM-DD" value={releaseFrom} onChange={e=>setReleaseFrom(e.target.value)} />
      <Input placeholder="To YYYY-MM-DD" value={releaseTo} onChange={e=>setReleaseTo(e.target.value)} />
      <div className="col-span-2 md:col-span-6 text-right">
        <Button onClick={apply}>Apply Filters</Button>
      </div>
    </div>
  )
}
