"use client"
import React from 'react'
import { Button } from './Button'

type Dict = any

export function ContactForm({ t }: { t: Dict }) {
  const [sent, setSent] = React.useState(false)
  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    const form = e.currentTarget
    if (!form.checkValidity()) return
    setSent(true)
    form.reset()
  }
  return (
    <div className="mx-auto mt-8 max-w-3xl">
      {sent && (
        <div className="mb-4 rounded-md border border-green-200 bg-green-50 p-4 text-sm text-green-800">{t.contact.success}</div>
      )}
      <form onSubmit={onSubmit} className="reveal grid grid-cols-1 gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">{t.contact.fields.name}</label>
          <input name="name" required className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-accent" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">{t.contact.fields.company}</label>
          <input name="company" className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-accent" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">{t.contact.fields.email}</label>
          <input name="email" type="email" required className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-accent" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">{t.contact.fields.phone}</label>
          <input name="phone" type="tel" className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-accent" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">{t.contact.fields.size}</label>
          <select name="size" className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-accent">
            <option>1-5</option>
            <option>6-20</option>
            <option>21-50</option>
            <option>51-200</option>
            <option>200+</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium text-slate-700">{t.contact.fields.message}</label>
          <textarea name="message" required rows={4} className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-accent" />
        </div>
        <div className="flex items-center gap-2 md:col-span-2">
          <input id="agree" type="checkbox" required className="h-4 w-4 rounded border-slate-300 text-accent focus:ring-accent" />
          <label htmlFor="agree" className="text-sm text-slate-700">{t.contact.checkbox}</label>
        </div>
        <div className="md:col-span-2">
          <Button type="submit" className="w-full md:w-auto">{t.contact.submit}</Button>
        </div>
      </form>
    </div>
  )
}
