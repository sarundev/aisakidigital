'use client';

import { useEffect, useState, useCallback } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import type { ServiceProduct } from '@/lib/products';
import type { WebService } from '@/lib/services';

/* ─── Shared ─────────────────────────────────────────────────────────────── */

const PRODUCT_COLORS = ['green', 'purple', 'blue', 'orange'] as const;
const ICON_TYPES = ['website', 'mobile', 'fullstack', 'uiux', 'ecommerce', 'seo'] as const;

const colorLabel:  Record<string, string> = { green: '#1a7a05', purple: '#4f46e5', blue: '#1877F2', orange: '#ea580c' };
const colorBg:     Record<string, string> = { green: 'rgba(57,255,20,0.08)', purple: 'rgba(99,102,241,0.08)', blue: 'rgba(24,119,242,0.08)', orange: 'rgba(234,88,12,0.08)' };
const colorBorder: Record<string, string> = { green: 'rgba(57,255,20,0.2)', purple: 'rgba(99,102,241,0.2)', blue: 'rgba(24,119,242,0.2)', orange: 'rgba(234,88,12,0.2)' };

const inputStyle = { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff' };
const inputCls   = 'w-full rounded-xl px-3 py-2.5 text-sm outline-none';
const labelCls   = 'block text-[11px] font-bold uppercase tracking-widest mb-1.5';

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <span className="relative flex h-5 w-9 shrink-0 items-center rounded-full cursor-pointer transition-colors duration-200"
      style={{ background: on ? '#39FF14' : 'rgba(255,255,255,0.12)' }}
      onClick={onToggle}
    >
      <span className="absolute left-0.5 h-4 w-4 rounded-full transition-transform duration-200"
        style={{ background: '#fff', transform: on ? 'translateX(16px)' : 'translateX(0)' }}
      />
    </span>
  );
}

function DeleteConfirm({ name, onConfirm, onCancel }: { name: string; onConfirm: () => Promise<void>; onCancel: () => void }) {
  const [busy, setBusy] = useState(false);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }} onClick={onCancel}>
      <div className="w-full max-w-sm rounded-3xl p-7"
        style={{ background: '#0f1a12', border: '1px solid rgba(239,68,68,0.3)' }} onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: 'rgba(239,68,68,0.1)' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
        </div>
        <h3 className="text-base font-extrabold mb-2" style={{ color: '#fff' }}>Delete?</h3>
        <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.45)' }}>
          <span style={{ color: '#fff', fontWeight: 700 }}>{name}</span> will be permanently removed.
        </p>
        <div className="flex gap-2.5">
          <button onClick={onCancel} className="flex-1 rounded-xl py-2.5 text-sm font-bold"
            style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.1)' }}>Cancel</button>
          <button disabled={busy} onClick={async () => { setBusy(true); await onConfirm(); setBusy(false); }}
            className="flex-1 rounded-xl py-2.5 text-sm font-bold disabled:opacity-50" style={{ background: '#ef4444', color: '#fff' }}>
            {busy ? 'Deleting…' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Product Form ───────────────────────────────────────────────────────── */

const EMPTY_PRODUCT: Omit<ServiceProduct, 'id'> = {
  name: '', name_kh: '', category: 'Fresh', category_color: 'green',
  duration: '1-3 Hours', price: '$0.00', price_unit: 'per unit',
  stock_quantity: 0, is_featured: false, is_active: true, sort_order: 1,
};

function ProductForm({ initial, onSave, onCancel }: {
  initial: Partial<ServiceProduct>;
  onSave: (d: Omit<ServiceProduct, 'id'>) => Promise<void>;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<Omit<ServiceProduct, 'id'>>({ ...EMPTY_PRODUCT, ...initial });
  const [saving, setSaving] = useState(false);
  const set = (k: keyof typeof form, v: unknown) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(12px)' }} onClick={onCancel}>
      <div className="relative w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl p-7 overflow-y-auto max-h-[92dvh]"
        style={{ background: '#0f1a12', border: '1px solid rgba(57,255,20,0.18)', boxShadow: '0 32px 80px rgba(0,0,0,0.5)' }}
        onClick={(e) => e.stopPropagation()}>
        <div className="absolute top-0 left-10 right-10 h-0.5 rounded-full" style={{ background: 'linear-gradient(90deg, transparent, #39FF14, transparent)' }} />
        <div className="mx-auto mb-5 h-1 w-10 rounded-full sm:hidden" style={{ background: 'rgba(255,255,255,0.15)' }} />
        <h2 className="text-base font-extrabold mb-6" style={{ color: '#fff' }}>{initial.id ? 'Edit Product' : 'Add Product'}</h2>

        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2">
            <label className={labelCls} style={{ color: '#39FF14' }}>Name (EN)</label>
            <input className={inputCls} style={inputStyle} value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="e.g. Gmail Fresh" />
          </div>
          <div className="col-span-2">
            <label className={labelCls} style={{ color: 'rgba(57,255,20,0.5)' }}>Name (KH)</label>
            <input className={inputCls} style={inputStyle} value={form.name_kh} onChange={(e) => set('name_kh', e.target.value)} placeholder="ខ្មែរ" />
          </div>
          <div>
            <label className={labelCls} style={{ color: 'rgba(255,255,255,0.4)' }}>Category</label>
            <input className={inputCls} style={inputStyle} value={form.category} onChange={(e) => set('category', e.target.value)} placeholder="Fresh" />
          </div>
          <div>
            <label className={labelCls} style={{ color: 'rgba(255,255,255,0.4)' }}>Color</label>
            <select className={inputCls} style={{ ...inputStyle, appearance: 'none' }} value={form.category_color} onChange={(e) => set('category_color', e.target.value)}>
              {PRODUCT_COLORS.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className={labelCls} style={{ color: 'rgba(255,255,255,0.4)' }}>Price</label>
            <input className={inputCls} style={inputStyle} value={form.price} onChange={(e) => set('price', e.target.value)} placeholder="$0.0050" />
          </div>
          <div>
            <label className={labelCls} style={{ color: 'rgba(255,255,255,0.4)' }}>Unit</label>
            <input className={inputCls} style={inputStyle} value={form.price_unit} onChange={(e) => set('price_unit', e.target.value)} placeholder="per mail" />
          </div>
          <div>
            <label className={labelCls} style={{ color: 'rgba(255,255,255,0.4)' }}>Duration</label>
            <input className={inputCls} style={inputStyle} value={form.duration} onChange={(e) => set('duration', e.target.value)} placeholder="1-3 Hours" />
          </div>
          <div>
            <label className={labelCls} style={{ color: 'rgba(255,255,255,0.4)' }}>Stock</label>
            <input className={inputCls} style={inputStyle} type="number" min={0} value={form.stock_quantity} onChange={(e) => set('stock_quantity', Number(e.target.value))} />
          </div>
          <div>
            <label className={labelCls} style={{ color: 'rgba(255,255,255,0.4)' }}>Sort Order</label>
            <input className={inputCls} style={inputStyle} type="number" min={1} value={form.sort_order} onChange={(e) => set('sort_order', Number(e.target.value))} />
          </div>
          <div className="flex flex-col gap-2.5 pt-1">
            {(['is_active', 'is_featured'] as const).map((key) => (
              <label key={key} className="flex items-center gap-2.5 cursor-pointer select-none">
                <Toggle on={form[key]} onToggle={() => set(key, !form[key])} />
                <span className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.55)' }}>{key === 'is_active' ? 'Active' : 'Featured'}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex gap-2.5 mt-7">
          <button onClick={onCancel} className="flex-1 rounded-xl py-3 text-sm font-bold"
            style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.1)' }}>Cancel</button>
          <button onClick={async () => { setSaving(true); try { await onSave(form); } finally { setSaving(false); } }}
            disabled={saving || !form.name.trim()} className="flex-1 rounded-xl py-3 text-sm font-bold disabled:opacity-50"
            style={{ background: 'linear-gradient(135deg, #39FF14, #2ee60f)', color: '#000' }}>
            {saving ? 'Saving…' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Service Form ───────────────────────────────────────────────────────── */

const EMPTY_SERVICE: Omit<WebService, 'id'> = {
  title: '', title_kh: '', description: '', tags: [], from_price: '$0',
  icon_type: 'website', popular: false, is_active: true, sort_order: 1,
};

function ServiceForm({ initial, onSave, onCancel }: {
  initial: Partial<WebService>;
  onSave: (d: Omit<WebService, 'id'>) => Promise<void>;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<Omit<WebService, 'id'>>({ ...EMPTY_SERVICE, ...initial });
  const [tagsRaw, setTagsRaw] = useState((initial.tags ?? []).join(', '));
  const [saving, setSaving] = useState(false);
  const set = (k: keyof typeof form, v: unknown) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(12px)' }} onClick={onCancel}>
      <div className="relative w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl p-7 overflow-y-auto max-h-[92dvh]"
        style={{ background: '#0f1a12', border: '1px solid rgba(57,255,20,0.18)', boxShadow: '0 32px 80px rgba(0,0,0,0.5)' }}
        onClick={(e) => e.stopPropagation()}>
        <div className="absolute top-0 left-10 right-10 h-0.5 rounded-full" style={{ background: 'linear-gradient(90deg, transparent, #39FF14, transparent)' }} />
        <div className="mx-auto mb-5 h-1 w-10 rounded-full sm:hidden" style={{ background: 'rgba(255,255,255,0.15)' }} />
        <h2 className="text-base font-extrabold mb-6" style={{ color: '#fff' }}>{initial.id ? 'Edit Service' : 'Add Service'}</h2>

        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2">
            <label className={labelCls} style={{ color: '#39FF14' }}>Title (EN)</label>
            <input className={inputCls} style={inputStyle} value={form.title} onChange={(e) => set('title', e.target.value)} placeholder="e.g. Mobile App" />
          </div>
          <div className="col-span-2">
            <label className={labelCls} style={{ color: 'rgba(57,255,20,0.5)' }}>Title (KH)</label>
            <input className={inputCls} style={inputStyle} value={form.title_kh} onChange={(e) => set('title_kh', e.target.value)} placeholder="ខ្មែរ" />
          </div>
          <div className="col-span-2">
            <label className={labelCls} style={{ color: 'rgba(255,255,255,0.4)' }}>Description</label>
            <textarea className={inputCls} style={{ ...inputStyle, resize: 'none' }} rows={2} value={form.description} onChange={(e) => set('description', e.target.value)} placeholder="Short description…" />
          </div>
          <div>
            <label className={labelCls} style={{ color: 'rgba(255,255,255,0.4)' }}>Icon Type</label>
            <select className={inputCls} style={{ ...inputStyle, appearance: 'none' }} value={form.icon_type} onChange={(e) => set('icon_type', e.target.value as WebService['icon_type'])}>
              {ICON_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className={labelCls} style={{ color: 'rgba(255,255,255,0.4)' }}>Price (from)</label>
            <input className={inputCls} style={inputStyle} value={form.from_price} onChange={(e) => set('from_price', e.target.value)} placeholder="$99" />
          </div>
          <div className="col-span-2">
            <label className={labelCls} style={{ color: 'rgba(255,255,255,0.4)' }}>Tags (comma-separated)</label>
            <input className={inputCls} style={inputStyle} value={tagsRaw}
              onChange={(e) => { setTagsRaw(e.target.value); set('tags', e.target.value.split(',').map((t) => t.trim()).filter(Boolean)); }}
              placeholder="Next.js, React, Tailwind" />
          </div>
          <div>
            <label className={labelCls} style={{ color: 'rgba(255,255,255,0.4)' }}>Sort Order</label>
            <input className={inputCls} style={inputStyle} type="number" min={1} value={form.sort_order} onChange={(e) => set('sort_order', Number(e.target.value))} />
          </div>
          <div className="flex flex-col gap-2.5 pt-1">
            {(['is_active', 'popular'] as const).map((key) => (
              <label key={key} className="flex items-center gap-2.5 cursor-pointer select-none">
                <Toggle on={form[key]} onToggle={() => set(key, !form[key])} />
                <span className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.55)' }}>{key === 'is_active' ? 'Active' : 'Popular'}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex gap-2.5 mt-7">
          <button onClick={onCancel} className="flex-1 rounded-xl py-3 text-sm font-bold"
            style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.1)' }}>Cancel</button>
          <button onClick={async () => { setSaving(true); try { await onSave(form); } finally { setSaving(false); } }}
            disabled={saving || !form.title.trim()} className="flex-1 rounded-xl py-3 text-sm font-bold disabled:opacity-50"
            style={{ background: 'linear-gradient(135deg, #39FF14, #2ee60f)', color: '#000' }}>
            {saving ? 'Saving…' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Products Panel ─────────────────────────────────────────────────────── */

function ProductsPanel() {
  const [products, setProducts]   = useState<ServiceProduct[]>([]);
  const [loading, setLoading]     = useState(true);
  const [form, setForm]           = useState<{ open: boolean; data: Partial<ServiceProduct> }>({ open: false, data: {} });
  const [deleteTarget, setDelete] = useState<ServiceProduct | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setProducts(await fetch('/api/services-products').then((r) => r.json()));
    setLoading(false);
  }, []);
  useEffect(() => { load(); }, [load]);

  const handleSave = async (data: Omit<ServiceProduct, 'id'>) => {
    const url = form.data.id ? `/api/services-products/${form.data.id}` : '/api/services-products';
    await fetch(url, { method: form.data.id ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    setForm({ open: false, data: {} });
    await load();
  };

  const toggleActive = async (p: ServiceProduct) => {
    await fetch(`/api/services-products/${p.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ is_active: !p.is_active }) });
    await load();
  };

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <div className="grid grid-cols-3 gap-3 flex-1 mr-4">
          {[{ label: 'Total', v: products.length }, { label: 'Active', v: products.filter((p) => p.is_active).length }, { label: 'Featured', v: products.filter((p) => p.is_featured).length }].map(({ label, v }) => (
            <div key={label} className="rounded-2xl px-4 py-3" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>{label}</p>
              <p className="text-2xl font-black" style={{ color: '#39FF14' }}>{v}</p>
            </div>
          ))}
        </div>
        <button onClick={() => setForm({ open: true, data: { sort_order: products.length + 1 } })}
          className="flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-bold"
          style={{ background: 'linear-gradient(135deg, #39FF14, #2ee60f)', color: '#000', boxShadow: '0 4px 20px rgba(57,255,20,0.35)' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14" /></svg>
          Add
        </button>
      </div>

      {loading ? (
        <div className="space-y-2.5">{Array.from({ length: 5 }).map((_, i) => <div key={i} className="animate-pulse h-16 rounded-2xl" style={{ background: 'rgba(255,255,255,0.04)' }} />)}</div>
      ) : (
        <div className="space-y-2">
          {products.map((p) => (
            <div key={p.id} className="flex items-center gap-3 rounded-2xl px-4 py-3.5 transition-all duration-200"
              style={{ background: p.is_active ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', opacity: p.is_active ? 1 : 0.55 }}>
              <span className="shrink-0 text-xs font-black w-6 text-right" style={{ color: 'rgba(255,255,255,0.2)' }}>#{p.id}</span>
              <span className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                style={{ background: colorBg[p.category_color], color: colorLabel[p.category_color], border: `1px solid ${colorBorder[p.category_color]}` }}>{p.category}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold truncate" style={{ color: '#fff' }}>{p.name}</p>
                <p className="text-[11px] truncate" style={{ color: 'rgba(255,255,255,0.35)' }}>{p.name_kh}</p>
              </div>
              <span className="shrink-0 text-sm font-black" style={{ color: '#39FF14' }}>{p.price}</span>
              <span className="shrink-0 text-xs hidden sm:block" style={{ color: 'rgba(255,255,255,0.4)' }}>{p.stock_quantity.toLocaleString()}</span>
              {p.is_featured && <svg className="shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="#39FF14"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" /></svg>}
              <Toggle on={p.is_active} onToggle={() => toggleActive(p)} />
              <button onClick={() => setForm({ open: true, data: p })} className="shrink-0 flex h-8 w-8 items-center justify-center rounded-xl" style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg>
              </button>
              <button onClick={() => setDelete(p)} className="shrink-0 flex h-8 w-8 items-center justify-center rounded-xl" style={{ background: 'rgba(239,68,68,0.08)', color: '#ef4444' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
              </button>
            </div>
          ))}
        </div>
      )}

      {form.open && <ProductForm initial={form.data} onSave={handleSave} onCancel={() => setForm({ open: false, data: {} })} />}
      {deleteTarget && (
        <DeleteConfirm name={deleteTarget.name}
          onConfirm={async () => { await fetch(`/api/services-products/${deleteTarget.id}`, { method: 'DELETE' }); setDelete(null); await load(); }}
          onCancel={() => setDelete(null)} />
      )}
    </>
  );
}

/* ─── Services Panel ─────────────────────────────────────────────────────── */

function ServicesPanel() {
  const [services, setServices]   = useState<WebService[]>([]);
  const [loading, setLoading]     = useState(true);
  const [form, setForm]           = useState<{ open: boolean; data: Partial<WebService> }>({ open: false, data: {} });
  const [deleteTarget, setDelete] = useState<WebService | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setServices(await fetch('/api/services').then((r) => r.json()));
    setLoading(false);
  }, []);
  useEffect(() => { load(); }, [load]);

  const handleSave = async (data: Omit<WebService, 'id'>) => {
    const url = form.data.id ? `/api/services/${form.data.id}` : '/api/services';
    await fetch(url, { method: form.data.id ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    setForm({ open: false, data: {} });
    await load();
  };

  const toggleActive = async (s: WebService) => {
    await fetch(`/api/services/${s.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ is_active: !s.is_active }) });
    await load();
  };

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <div className="grid grid-cols-3 gap-3 flex-1 mr-4">
          {[{ label: 'Total', v: services.length }, { label: 'Active', v: services.filter((s) => s.is_active).length }, { label: 'Popular', v: services.filter((s) => s.popular).length }].map(({ label, v }) => (
            <div key={label} className="rounded-2xl px-4 py-3" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>{label}</p>
              <p className="text-2xl font-black" style={{ color: '#39FF14' }}>{v}</p>
            </div>
          ))}
        </div>
        <button onClick={() => setForm({ open: true, data: { sort_order: services.length + 1 } })}
          className="flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-bold"
          style={{ background: 'linear-gradient(135deg, #39FF14, #2ee60f)', color: '#000', boxShadow: '0 4px 20px rgba(57,255,20,0.35)' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14" /></svg>
          Add
        </button>
      </div>

      {loading ? (
        <div className="space-y-2.5">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="animate-pulse h-16 rounded-2xl" style={{ background: 'rgba(255,255,255,0.04)' }} />)}</div>
      ) : (
        <div className="space-y-2">
          {services.map((s) => (
            <div key={s.id} className="flex items-center gap-3 rounded-2xl px-4 py-3.5 transition-all duration-200"
              style={{ background: s.is_active ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', opacity: s.is_active ? 1 : 0.55 }}>
              <span className="shrink-0 text-xs font-black w-6 text-right" style={{ color: 'rgba(255,255,255,0.2)' }}>#{s.id}</span>
              <span className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                style={{ background: 'rgba(57,255,20,0.08)', color: '#1a7a05', border: '1px solid rgba(57,255,20,0.2)' }}>{s.icon_type}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold truncate" style={{ color: '#fff' }}>{s.title}</p>
                <p className="text-[11px] truncate" style={{ color: 'rgba(255,255,255,0.35)' }}>{s.title_kh}</p>
              </div>
              <span className="shrink-0 text-sm font-black" style={{ color: '#39FF14' }}>{s.from_price}</span>
              <div className="hidden sm:flex shrink-0 gap-1 flex-wrap max-w-30">
                {s.tags.slice(0, 2).map((t) => <span key={t} className="text-[10px] rounded px-1.5 py-0.5" style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.4)' }}>{t}</span>)}
              </div>
              {s.popular && <svg className="shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="#39FF14"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" /></svg>}
              <Toggle on={s.is_active} onToggle={() => toggleActive(s)} />
              <button onClick={() => setForm({ open: true, data: s })} className="shrink-0 flex h-8 w-8 items-center justify-center rounded-xl" style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg>
              </button>
              <button onClick={() => setDelete(s)} className="shrink-0 flex h-8 w-8 items-center justify-center rounded-xl" style={{ background: 'rgba(239,68,68,0.08)', color: '#ef4444' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
              </button>
            </div>
          ))}
        </div>
      )}

      {form.open && <ServiceForm initial={form.data} onSave={handleSave} onCancel={() => setForm({ open: false, data: {} })} />}
      {deleteTarget && (
        <DeleteConfirm name={deleteTarget.title}
          onConfirm={async () => { await fetch(`/api/services/${deleteTarget.id}`, { method: 'DELETE' }); setDelete(null); await load(); }}
          onCancel={() => setDelete(null)} />
      )}
    </>
  );
}

/* ─── Admin Page ─────────────────────────────────────────────────────────── */

export default function AdminPage() {
  const [tab, setTab] = useState<'products' | 'services'>('products');

  return (
    <>
      <Navbar />
      <div className="min-h-screen px-4 pb-16 pt-24" style={{ background: '#080f09' }}>
        <div className="mx-auto max-w-5xl">

          {/* Header */}
          <div className="mb-8">
            <p className="text-[11px] font-bold uppercase tracking-widest mb-1" style={{ color: '#39FF14' }}>Admin</p>
            <h1 className="text-2xl font-black mb-6" style={{ color: '#fff' }}>Product Manager</h1>

            {/* Tabs */}
            <div className="flex gap-2 p-1 rounded-2xl w-fit" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
              {(['products', 'services'] as const).map((t) => (
                <button key={t} onClick={() => setTab(t)}
                  className="rounded-xl px-5 py-2 text-sm font-bold capitalize transition-all duration-200"
                  style={tab === t
                    ? { background: 'linear-gradient(135deg, #39FF14, #2ee60f)', color: '#000' }
                    : { color: 'rgba(255,255,255,0.45)' }}>
                  {t === 'products' ? 'Products' : 'Web Services'}
                </button>
              ))}
            </div>
          </div>

          {tab === 'products' ? <ProductsPanel /> : <ServicesPanel />}

          {/* API hint */}
          <div className="mt-8 rounded-2xl px-5 py-4" style={{ background: 'rgba(57,255,20,0.04)', border: '1px solid rgba(57,255,20,0.12)' }}>
            <p className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: 'rgba(57,255,20,0.5)' }}>API Endpoints</p>
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-1 font-mono text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
              <p><span style={{ color: '#39FF14' }}>GET</span>    /api/services-products</p>
              <p><span style={{ color: '#39FF14' }}>GET</span>    /api/services</p>
              <p><span style={{ color: '#39FF14' }}>POST</span>   /api/services-products</p>
              <p><span style={{ color: '#39FF14' }}>POST</span>   /api/services</p>
              <p><span style={{ color: '#fbbf24' }}>PUT</span>    /api/services-products/:id</p>
              <p><span style={{ color: '#fbbf24' }}>PUT</span>    /api/services/:id</p>
              <p><span style={{ color: '#ef4444' }}>DELETE</span> /api/services-products/:id</p>
              <p><span style={{ color: '#ef4444' }}>DELETE</span> /api/services/:id</p>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
}
