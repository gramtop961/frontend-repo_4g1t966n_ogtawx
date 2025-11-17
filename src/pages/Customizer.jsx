import React, { useMemo, useState } from 'react'
import SiteShell from '../components/layout/SiteShell'
import Button from '../components/ui/Button'
import { useParams } from 'react-router-dom'
import { api } from '../lib/api'

const PARTS = ['upper','swoosh','heel','midsole','outsole','laces']
const COLORS = ['#111827','#e5e7eb','#ef4444','#10b981','#3b82f6','#f59e0b','#a855f7']
const MATERIALS = ['leather','suede','mesh','knit','patent']

function ColorSwatch({ value, selected, onClick }){
  return (
    <button onClick={onClick} className={`w-7 h-7 rounded-full border ${selected?'ring-2 ring-emerald-400':'border-white/20'}`} style={{ background: value }} />
  )
}

export default function Customizer(){
  const { id } = useParams()
  const [name, setName] = useState('My Custom Sneaker')
  const [colors, setColors] = useState({ upper:'#e5e7eb', swoosh:'#111827', heel:'#e5e7eb', midsole:'#ffffff', outsole:'#111827', laces:'#ffffff' })
  const [materials, setMaterials] = useState({ upper:'leather', swoosh:'leather', heel:'leather' })
  const [pattern, setPattern] = useState(null)
  const [saving, setSaving] = useState(false)

  const previewStyle = useMemo(()=>({
    '--upper': colors.upper,
    '--swoosh': colors.swoosh,
    '--heel': colors.heel,
    '--midsole': colors.midsole || '#ffffff',
    '--outsole': colors.outsole,
    '--laces': colors.laces || '#ffffff',
  }),[colors])

  const updateColor = (part, val)=> setColors(c=> ({ ...c, [part]: val }))
  const updateMaterial = (part, val)=> setMaterials(m=> ({ ...m, [part]: val }))

  const save = async()=>{
    setSaving(true)
    try {
      const res = await api.saveDesign({ sneakerId: id || 'custom-demo', name, colors, materials, pattern })
      alert(`Saved! id: ${res.id}`)
    } catch(e){
      alert('Save failed: '+ e.message)
    } finally{ setSaving(false) }
  }

  return (
    <SiteShell>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-slate-900/60 border border-white/10 rounded-xl p-6">
          <div className="text-sm text-slate-400 mb-2">Live Preview</div>
          <div className="relative mx-auto max-w-md">
            <div className="sneaker-preview" style={previewStyle}>
              <div className="part upper" />
              <div className="part swoosh" />
              <div className="part heel" />
              <div className="part midsole" />
              <div className="part outsole" />
              <div className="part laces" />
            </div>
          </div>
          <style>{`
            .sneaker-preview{ position:relative; width:100%; padding-top:55%; background: #0b1220; border-radius: 16px; overflow:hidden; }
            .part{ position:absolute; border-radius: 999px; opacity:.95; }
            .upper{ left:8%; top:24%; width:76%; height:40%; background: var(--upper); }
            .swoosh{ left:30%; top:40%; width:36%; height:10%; background: var(--swoosh); border-radius: 999px; }
            .heel{ right:6%; top:30%; width:10%; height:34%; background: var(--heel); }
            .midsole{ left:10%; bottom:18%; width:75%; height:10%; background: var(--midsole); border-radius: 24px; }
            .outsole{ left:9%; bottom:14%; width:78%; height:6%; background: var(--outsole); border-radius: 24px; }
            .laces{ left:28%; top:28%; width:28%; height:6%; background: var(--laces); border-radius: 12px; }
          `}</style>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900/60 border border-white/10 rounded-xl p-6">
            <div className="text-sm text-slate-400 mb-1">Design name</div>
            <input className="w-full bg-slate-800/60 border border-white/10 rounded-md px-3 h-10 text-white" value={name} onChange={(e)=>setName(e.target.value)} />
          </div>

          <div className="bg-slate-900/60 border border-white/10 rounded-xl p-6">
            <div className="font-semibold mb-3">Colors</div>
            {PARTS.map(part => (
              <div key={part} className="mb-4">
                <div className="text-sm text-slate-400 mb-1 capitalize">{part}</div>
                <div className="flex items-center gap-2 flex-wrap">
                  {COLORS.map(c => (
                    <ColorSwatch key={c} value={c} selected={(colors[part]||'')===c} onClick={()=>updateColor(part, c)} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-slate-900/60 border border-white/10 rounded-xl p-6">
            <div className="font-semibold mb-3">Materials</div>
            {['upper','swoosh','heel'].map(part => (
              <div key={part} className="mb-3">
                <div className="text-sm text-slate-400 mb-1 capitalize">{part}</div>
                <div className="flex gap-2 flex-wrap">
                  {MATERIALS.map(m => (
                    <button key={m} onClick={()=>updateMaterial(part, m)} className={`px-3 py-1 rounded-md border ${materials[part]===m? 'border-emerald-400 bg-emerald-500/10':'border-white/10 bg-white/5'}`}>{m}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <Button onClick={save} disabled={saving} className="w-full">{saving? 'Saving...':'Save Variant'}</Button>
        </div>
      </div>
    </SiteShell>
  )
}
