'use client'

import { useState } from 'react'
import { cn } from '@/lib/cn'

type FAQItem = {
  question: string
  answer: string
}

type FAQProps = {
  title: string
  intro: string
  items: FAQItem[]
}

function FAQItem({ question, answer, isOpen, onToggle }: FAQItem & { isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-primary-100 dark:border-primary-800">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-accent"
        aria-expanded={isOpen}
      >
        <span className="text-base font-semibold text-primary dark:text-white">{question}</span>
        <span
          className={cn(
            'flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-primary-200 text-primary-600 transition-all dark:border-primary-700 dark:text-primary-300',
            isOpen && 'rotate-45 bg-accent border-accent text-white dark:bg-accent dark:border-accent dark:text-white'
          )}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>
      </button>
      <div
        className={cn(
          'grid transition-all duration-300 ease-out',
          isOpen ? 'grid-rows-[1fr] opacity-100 pb-5' : 'grid-rows-[0fr] opacity-0'
        )}
      >
        <div className="overflow-hidden">
          <p className="text-primary-600 dark:text-primary-300 leading-relaxed pr-12">{answer}</p>
        </div>
      </div>
    </div>
  )
}

export function FAQ({ title, intro, items }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div>
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <h2 className="reveal mb-3 text-3xl font-bold text-primary dark:text-white">{title}</h2>
        <p className="reveal text-primary-600 dark:text-primary-300">{intro}</p>
      </div>

      <div className="reveal mx-auto max-w-3xl rounded-xl border border-primary-100 bg-white p-6 shadow-sm dark:border-primary-800 dark:bg-primary-900 sm:p-8">
        {items.map((item, index) => (
          <FAQItem
            key={index}
            question={item.question}
            answer={item.answer}
            isOpen={openIndex === index}
            onToggle={() => handleToggle(index)}
          />
        ))}
      </div>
    </div>
  )
}
