import React from 'react'

type Props = {
  quote: string
  name: string
  role: string
}

export function TestimonialCard({ quote, name, role }: Props) {
  return (
    <figure className="reveal rounded-xl border border-primary-100 bg-white p-6 shadow-sm dark:border-primary-800 dark:bg-primary-900">
      <div className="mb-4 text-3xl text-accent">"</div>
      <blockquote className="text-primary-700 dark:text-primary-200">{quote}</blockquote>
      <figcaption className="mt-4 text-sm font-medium text-primary dark:text-white">
        {name} <span className="ml-2 font-normal text-primary-500 dark:text-primary-400">{role}</span>
      </figcaption>
    </figure>
  )
}

