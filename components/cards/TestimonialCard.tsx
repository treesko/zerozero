import React from 'react'

type Props = {
  quote: string
  name: string
  role: string
}

export function TestimonialCard({ quote, name, role }: Props) {
  return (
    <figure className="reveal rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 text-3xl text-accent">“</div>
      <blockquote className="text-slate-700">{quote}</blockquote>
      <figcaption className="mt-4 text-sm font-medium text-primary">
        {name} <span className="ml-2 font-normal text-slate-500">{role}</span>
      </figcaption>
    </figure>
  )
}

