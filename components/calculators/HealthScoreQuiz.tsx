'use client'

import { useState } from 'react'
import { Button } from '../Button'

type Question = {
  id: string
  question: string
  options: {
    label: string
    score: number
  }[]
}

const questions: Question[] = [
  {
    id: 'bookkeeping',
    question: 'How often do you reconcile your books?',
    options: [
      { label: 'Monthly or more frequently', score: 20 },
      { label: 'Quarterly', score: 15 },
      { label: 'Annually', score: 8 },
      { label: 'Rarely or never', score: 0 },
    ],
  },
  {
    id: 'cashflow',
    question: 'Do you have visibility into your cash flow forecast?',
    options: [
      { label: 'Yes, I review it weekly', score: 20 },
      { label: 'Yes, I check it monthly', score: 15 },
      { label: 'Sometimes, when needed', score: 8 },
      { label: 'No, I don\'t track it', score: 0 },
    ],
  },
  {
    id: 'taxes',
    question: 'How do you handle tax planning?',
    options: [
      { label: 'Proactive year-round planning', score: 20 },
      { label: 'Quarterly reviews with advisor', score: 15 },
      { label: 'Only before tax deadlines', score: 8 },
      { label: 'React to tax bills as they come', score: 0 },
    ],
  },
  {
    id: 'reports',
    question: 'Do you receive regular financial reports?',
    options: [
      { label: 'Yes, detailed monthly reports', score: 20 },
      { label: 'Basic reports quarterly', score: 12 },
      { label: 'Only annual statements', score: 5 },
      { label: 'No regular reports', score: 0 },
    ],
  },
  {
    id: 'separation',
    question: 'Are your business and personal finances separated?',
    options: [
      { label: 'Completely separate with clear processes', score: 20 },
      { label: 'Mostly separate with occasional overlap', score: 12 },
      { label: 'Somewhat mixed', score: 5 },
      { label: 'Not really separated', score: 0 },
    ],
  },
]

type ScoreLevel = {
  min: number
  max: number
  label: string
  color: string
  description: string
  recommendations: string[]
}

const scoreLevels: ScoreLevel[] = [
  {
    min: 0,
    max: 30,
    label: 'Needs Attention',
    color: 'text-red-500',
    description: 'Your business finances need immediate attention. There are significant gaps that could be costing you money and creating risk.',
    recommendations: [
      'Set up monthly bookkeeping immediately',
      'Separate business and personal accounts',
      'Establish a cash flow tracking system',
      'Consult with an accountant about tax planning',
    ],
  },
  {
    min: 31,
    max: 60,
    label: 'Room for Improvement',
    color: 'text-yellow-500',
    description: 'You have some financial processes in place, but there\'s room for improvement. Optimizing these areas could lead to significant savings.',
    recommendations: [
      'Increase bookkeeping frequency to monthly',
      'Implement regular financial reporting',
      'Develop a 12-month cash flow forecast',
      'Review your tax strategy with a professional',
    ],
  },
  {
    min: 61,
    max: 80,
    label: 'Good Foundation',
    color: 'text-blue-500',
    description: 'Your business has a solid financial foundation. A few optimizations could help you reach the next level of financial clarity.',
    recommendations: [
      'Consider more detailed management reports',
      'Explore tax optimization opportunities',
      'Set up KPI dashboards for real-time insights',
      'Review processes for automation opportunities',
    ],
  },
  {
    min: 81,
    max: 100,
    label: 'Excellent Health',
    color: 'text-green-500',
    description: 'Congratulations! Your business finances are in excellent shape. You\'re practicing best-in-class financial management.',
    recommendations: [
      'Maintain your current practices',
      'Explore advanced analytics and forecasting',
      'Consider strategic financial planning',
      'Look into growth optimization strategies',
    ],
  },
]

function getScoreLevel(score: number): ScoreLevel {
  return scoreLevels.find((level) => score >= level.min && score <= level.max) || scoreLevels[0]
}

type HealthScoreQuizProps = {
  locale: string
  title?: string
  subtitle?: string
}

export function HealthScoreQuiz({
  locale,
  title = 'Business Health Score',
  subtitle = 'Answer 5 quick questions to assess your financial health',
}: HealthScoreQuizProps) {
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
    // In production, this would send to an API
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

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-700 dark:bg-slate-800 md:p-8">
        {!showResult ? (
          <>
            {/* Header */}
            <div className="mb-6 text-center">
              <h3 className="mb-2 text-2xl font-bold text-primary dark:text-white">{title}</h3>
              <p className="text-slate-600 dark:text-slate-400">{subtitle}</p>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="mb-2 flex justify-between text-sm text-slate-500 dark:text-slate-400">
                <span>Question {currentQuestion + 1} of {questions.length}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
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
              <h4 className="mb-6 text-lg font-semibold text-slate-800 dark:text-white">
                {questions[currentQuestion].question}
              </h4>

              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(questions[currentQuestion].id, option.score)}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 p-4 text-left transition-all hover:border-accent hover:bg-accent/5 dark:border-slate-600 dark:bg-slate-700 dark:hover:border-accent dark:hover:bg-accent/10"
                  >
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                      {option.label}
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
                    <span className="text-4xl font-bold text-slate-800 dark:text-white">
                      {totalScore}
                    </span>
                    <span className="text-sm text-slate-500 dark:text-slate-400">out of 100</span>
                  </div>
                </div>
              </div>

              {/* Score Label */}
              <h4 className={`mb-2 text-xl font-bold ${scoreLevel.color}`}>
                {scoreLevel.label}
              </h4>
              <p className="mb-6 text-sm text-slate-600 dark:text-slate-400">
                {scoreLevel.description}
              </p>

              {/* Recommendations */}
              <div className="mb-6 text-left">
                <p className="mb-3 text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Our Recommendations:
                </p>
                <ul className="space-y-2">
                  {scoreLevel.recommendations.map((rec, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400"
                    >
                      <span className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">
                        {index + 1}
                      </span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Email Capture */}
              {!emailSubmitted ? (
                <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-700">
                  <p className="mb-3 text-sm font-medium text-slate-700 dark:text-slate-300">
                    Get a detailed PDF report with personalized insights:
                  </p>
                  <form onSubmit={handleEmailSubmit} className="flex gap-2">
                    <input
                      type="email"
                      required
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 dark:border-slate-600 dark:bg-slate-800"
                    />
                    <Button type="submit">Send Report</Button>
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
                    <span className="text-sm font-medium">Report sent! Check your inbox.</span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button as="a" href={`/${locale}#contact`} className="flex-1">
                  Get Expert Help
                </Button>
                <Button variant="secondary" onClick={resetQuiz} className="flex-1">
                  Retake Quiz
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
