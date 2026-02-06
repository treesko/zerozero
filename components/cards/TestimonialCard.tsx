import React from 'react'

type Props = {
  quote: string
  name: string
  role: string
}

export function TestimonialCard({ quote, name, role }: Props) {
  return (
    <figure className="reveal rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <div className="mb-4 text-3xl text-accent">"</div>
      <blockquote className="text-slate-700 dark:text-slate-300">{quote}</blockquote>
      <figcaption className="mt-4 text-sm font-medium text-primary dark:text-white">
        {name} <span className="ml-2 font-normal text-slate-500 dark:text-slate-400">{role}</span>
      </figcaption>
    </figure>
  )
}

