'use client'

import { useState } from 'react'
import { Button } from '../Button'

type HealthTranslations = {
  title: string
  subtitle: string
  questionOf: string
  outOf100: string
  recommendations: string
  emailPrompt: string
  emailPlaceholder: string
  sendReport: string
  reportSent: string
  expertHelp: string
  retakeQuiz: string
  questions: {
    bookkeeping: string
    cashflow: string
    taxes: string
    reports: string
    separation: string
  }
  answers: {
    bookkeeping: { monthly: string; quarterly: string; annually: string; rarely: string }
    cashflow: { weekly: string; monthly: string; sometimes: string; never: string }
    taxes: { proactive: string; quarterly: string; deadline: string; reactive: string }
    reports: { detailed: string; basic: string; annual: string; none: string }
    separation: { complete: string; mostly: string; mixed: string; none: string }
  }
  levels: {
    needsAttention: string
    needsAttentionDesc: string
    roomForImprovement: string
    roomForImprovementDesc: string
    goodFoundation: string
    goodFoundationDesc: string
    excellent: string
    excellentDesc: string
  }
  recs: {
    setupBookkeeping: string
    separateAccounts: string
    cashFlowSystem: string
    consultAccountant: string
    increaseFrequency: string
    implementReporting: string
    developForecast: string
    reviewTaxStrategy: string
    detailedReports: string
    taxOptimization: string
    kpiDashboards: string
    automation: string
    maintain: string
    advancedAnalytics: string
    strategicPlanning: string
    growthOptimization: string
  }
}

type Question = {
  id: string
  questionKey: keyof HealthTranslations['questions']
  options: {
    labelKey: string
    score: number
  }[]
}

const questions: Question[] = [
  {
    id: 'bookkeeping',
    questionKey: 'bookkeeping',
    options: [
      { labelKey: 'monthly', score: 20 },
      { labelKey: 'quarterly', score: 15 },
      { labelKey: 'annually', score: 8 },
      { labelKey: 'rarely', score: 0 },
    ],
  },
  {
    id: 'cashflow',
    questionKey: 'cashflow',
    options: [
      { labelKey: 'weekly', score: 20 },
      { labelKey: 'monthly', score: 15 },
      { labelKey: 'sometimes', score: 8 },
      { labelKey: 'never', score: 0 },
    ],
  },
  {
    id: 'taxes',
    questionKey: 'taxes',
    options: [
      { labelKey: 'proactive', score: 20 },
      { labelKey: 'quarterly', score: 15 },
      { labelKey: 'deadline', score: 8 },
      { labelKey: 'reactive', score: 0 },
    ],
  },
  {
    id: 'reports',
    questionKey: 'reports',
    options: [
      { labelKey: 'detailed', score: 20 },
      { labelKey: 'basic', score: 12 },
      { labelKey: 'annual', score: 5 },
      { labelKey: 'none', score: 0 },
    ],
  },
  {
    id: 'separation',
    questionKey: 'separation',
    options: [
      { labelKey: 'complete', score: 20 },
      { labelKey: 'mostly', score: 12 },
      { labelKey: 'mixed', score: 5 },
      { labelKey: 'none', score: 0 },
    ],
  },
]

type ScoreLevel = {
  min: number
  max: number
  labelKey: 'needsAttention' | 'roomForImprovement' | 'goodFoundation' | 'excellent'
  descKey: 'needsAttentionDesc' | 'roomForImprovementDesc' | 'goodFoundationDesc' | 'excellentDesc'
  color: string
  recKeys: (keyof HealthTranslations['recs'])[]
}

const scoreLevels: ScoreLevel[] = [
  {
    min: 0,
    max: 30,
    labelKey: 'needsAttention',
    descKey: 'needsAttentionDesc',
    color: 'text-red-500',
    recKeys: ['setupBookkeeping', 'separateAccounts', 'cashFlowSystem', 'consultAccountant'],
  },
  {
    min: 31,
    max: 60,
    labelKey: 'roomForImprovement',
    descKey: 'roomForImprovementDesc',
    color: 'text-yellow-500',
    recKeys: ['increaseFrequency', 'implementReporting', 'developForecast', 'reviewTaxStrategy'],
  },
  {
    min: 61,
    max: 80,
    labelKey: 'goodFoundation',
    descKey: 'goodFoundationDesc',
    color: 'text-blue-500',
    recKeys: ['detailedReports', 'taxOptimization', 'kpiDashboards', 'automation'],
  },
  {
    min: 81,
    max: 100,
    labelKey: 'excellent',
    descKey: 'excellentDesc',
    color: 'text-green-500',
    recKeys: ['maintain', 'advancedAnalytics', 'strategicPlanning', 'growthOptimization'],
  },
]

function getScoreLevel(score: number): ScoreLevel {
  return scoreLevels.find((level) => score >= level.min && score <= level.max) || scoreLevels[0]
}

type HealthScoreQuizProps = {
  locale: string
  t: HealthTranslations | Record<string, unknown>
}

export function HealthScoreQuiz({ locale, t: tRaw }: HealthScoreQuizProps) {
  const t = tRaw as HealthTranslations
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [showResult, setShowResult] = useState(false)
  const [email, setEmail] = useState('')
  const [emailSubmitted, setEmailSubmitted] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleAnswer = async (questionId: string, score: number) => {
    setIsAnimating(true)
    setAnswers((prev) => ({ ...prev, [questionId]: score }))

    await new Promise((resolve) => setTimeout(resolve, 300))

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    } else {
      setShowResult(true)
    }
    setIsAnimating(false)
  }

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setEmailSubmitted(true)
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setShowResult(false)
    setEmail('')
    setEmailSubmitted(false)
  }

  const totalScore = Object.values(answers).reduce((sum, score) => sum + score, 0)
  const scoreLevel = getScoreLevel(totalScore)
  const progress = ((currentQuestion + 1) / questions.length) * 100

  const currentQ = questions[currentQuestion]
  const answersForQuestion = t.answers[currentQ.questionKey] as Record<string, string>

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-2xl border border-primary-100 bg-white p-4 shadow-lg sm:p-6 dark:border-primary-800 dark:bg-primary-900 lg:p-8">
        {!showResult ? (
          <>
            {/* Header */}
            <div className="mb-6 text-center">
              <h3 className="mb-2 text-2xl font-bold text-primary dark:text-white">{t.title}</h3>
              <p className="text-primary-600 dark:text-primary-300">{t.subtitle}</p>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="mb-2 flex justify-between text-sm text-primary-500 dark:text-primary-400">
                <span>
                  {t.questionOf
                    .replace('{current}', String(currentQuestion + 1))
                    .replace('{total}', String(questions.length))}
                </span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-primary-200 dark:bg-primary-800">
                <div
                  className="h-full bg-accent transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Current Question */}
            <div
              className={`transition-all duration-300 ${
                isAnimating ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'
              }`}
            >
              <h4 className="mb-6 text-lg font-semibold text-primary-800 dark:text-white">
                {t.questions[currentQ.questionKey]}
              </h4>

              <div className="space-y-3">
                {currentQ.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(currentQ.id, option.score)}
                    className="w-full rounded-lg border border-primary-100 bg-primary-50 p-4 text-left transition-all hover:border-accent hover:bg-accent/5 dark:border-primary-700 dark:bg-primary-800 dark:hover:border-accent dark:hover:bg-accent/10"
                  >
                    <span className="text-sm font-medium text-slate-700 dark:text-primary-100">
                      {answersForQuestion[option.labelKey]}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Results */}
            <div className="text-center">
              {/* Animated Score */}
              <div className="mb-6">
                <div className="relative mx-auto h-40 w-40">
                  {/* Background circle */}
                  <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="8"
                      className="text-slate-200 dark:text-slate-700"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="8"
                      strokeDasharray={`${(totalScore / 100) * 283} 283`}
                      strokeLinecap="round"
                      className={`${scoreLevel.color} transition-all duration-1000`}
                      style={{
                        animation: 'score-fill 1.5s ease-out forwards',
                      }}
                    />
                  </svg>
                  {/* Score number */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold text-primary-800 dark:text-white">
                      {totalScore}
                    </span>
                    <span className="text-sm text-primary-500 dark:text-primary-400">{t.outOf100}</span>
                  </div>
                </div>
              </div>

              {/* Score Label */}
              <h4 className={`mb-2 text-xl font-bold ${scoreLevel.color}`}>
                {t.levels[scoreLevel.labelKey]}
              </h4>
              <p className="mb-6 text-sm text-primary-600 dark:text-primary-300">
                {t.levels[scoreLevel.descKey]}
              </p>

              {/* Recommendations */}
              <div className="mb-6 text-left">
                <p className="mb-3 text-sm font-semibold text-primary-700 dark:text-primary-200">
                  {t.recommendations}
                </p>
                <ul className="space-y-2">
                  {scoreLevel.recKeys.map((recKey, index) => (
                    <li
                      key={recKey}
                      className="flex items-start gap-2 text-sm text-primary-600 dark:text-primary-300"
                    >
                      <span className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">
                        {index + 1}
                      </span>
                      {t.recs[recKey]}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Email Capture */}
              {!emailSubmitted ? (
                <div className="rounded-lg bg-primary-50 p-4 dark:bg-primary-800">
                  <p className="mb-3 text-sm font-medium text-primary-700 dark:text-primary-200">
                    {t.emailPrompt}
                  </p>
                  <form onSubmit={handleEmailSubmit} className="flex gap-2">
                    <input
                      type="email"
                      required
                      placeholder={t.emailPlaceholder}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 rounded-md border border-primary-200 px-3 py-2 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 dark:border-primary-700 dark:bg-primary-900 dark:text-white"
                    />
                    <Button type="submit">{t.sendReport}</Button>
                  </form>
                </div>
              ) : (
                <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-900/20">
                  <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm font-medium">{t.reportSent}</span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button as="a" href={`/${locale}#contact`} className="flex-1">
                  {t.expertHelp}
                </Button>
                <Button variant="secondary" onClick={resetQuiz} className="flex-1">
                  {t.retakeQuiz}
                </Button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Score animation keyframes */}
      <style jsx>{`
        @keyframes score-fill {
          from {
            stroke-dasharray: 0 283;
          }
        }
      `}</style>
    </div>
  )
}
