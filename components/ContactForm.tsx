"use client"
import React from 'react'
import { Button } from './Button'

type Dict = {
  contact: {
    fields: {
      name: string
      company: string
      email: string
      phone: string
      size: string
      message: string
    }
    checkbox: string
    submit: string
    success: string
    sending?: string
    errors?: {
      name?: string
      email?: string
      emailInvalid?: string
      message?: string
      agree?: string
    }
    placeholders?: {
      name?: string
      company?: string
      email?: string
      phone?: string
      message?: string
    }
  }
}

type FormErrors = {
  name?: string
  email?: string
  message?: string
  agree?: string
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

export function ContactForm({ t }: { t: Dict }) {
  const [status, setStatus] = React.useState<FormStatus>('idle')
  const [errors, setErrors] = React.useState<FormErrors>({})
  const [touched, setTouched] = React.useState<Set<string>>(new Set())
  const formRef = React.useRef<HTMLFormElement>(null)

  const defaultErrors = {
    name: t.contact.errors?.name || 'Name is required',
    email: t.contact.errors?.email || 'Email is required',
    emailInvalid: t.contact.errors?.emailInvalid || 'Please enter a valid email',
    message: t.contact.errors?.message || 'Message is required',
    agree: t.contact.errors?.agree || 'Please agree to the privacy policy',
  }

  const placeholders = {
    name: t.contact.placeholders?.name || 'John Smith',
    company: t.contact.placeholders?.company || 'Acme Inc.',
    email: t.contact.placeholders?.email || 'john@example.com',
    phone: t.contact.placeholders?.phone || '+1 (555) 123-4567',
    message: t.contact.placeholders?.message || 'Tell us about your business and how we can help...',
  }

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'name':
        return value.trim() ? undefined : defaultErrors.name
      case 'email':
        if (!value.trim()) return defaultErrors.email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(value) ? undefined : defaultErrors.emailInvalid
      case 'message':
        return value.trim() ? undefined : defaultErrors.message
      default:
        return undefined
    }
  }

  const validateForm = (formData: FormData): FormErrors => {
    const newErrors: FormErrors = {}

    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const message = formData.get('message') as string
    const agree = formData.get('agree')

    const nameError = validateField('name', name)
    const emailError = validateField('email', email)
    const messageError = validateField('message', message)

    if (nameError) newErrors.name = nameError
    if (emailError) newErrors.email = emailError
    if (messageError) newErrors.message = messageError
    if (!agree) newErrors.agree = defaultErrors.agree

    return newErrors
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setTouched((prev) => new Set(prev).add(name))

    const error = validateField(name, value)
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    if (touched.has(name)) {
      const error = validateField(name, value)
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }))
    }
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setErrors((prev) => ({ ...prev, agree: undefined }))
    }
  }

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    const validationErrors = validateForm(formData)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      setTouched(new Set(['name', 'email', 'message', 'agree']))
      return
    }

    setStatus('submitting')
    setErrors({})

    // Simulate API call (replace with actual API endpoint)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setStatus('success')
      form.reset()
      setTouched(new Set())

      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setStatus('idle')
      }, 5000)
    } catch {
      setStatus('error')
    }
  }

  const inputBaseClass = 'w-full rounded-md border px-4 py-3 text-base outline-none transition-colors duration-200 focus:ring-2 focus:ring-accent/20 dark:bg-primary-900 dark:text-white'
  const inputNormalClass = 'border-primary-200 focus:border-accent dark:border-primary-700'
  const inputErrorClass = 'border-red-400 focus:border-red-400 focus:ring-red-200 dark:border-red-500'

  return (
    <div className="mx-auto mt-8 max-w-3xl">
      {/* Status messages with aria-live for accessibility */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {status === 'submitting' && 'Sending your message...'}
        {status === 'success' && t.contact.success}
        {status === 'error' && 'An error occurred. Please try again.'}
      </div>

      {status === 'success' && (
        <div
          className="mb-4 rounded-md border border-green-200 bg-green-50 p-4 text-sm text-green-800 dark:border-green-800 dark:bg-green-900/20 dark:text-green-300"
          role="status"
        >
          <div className="flex items-center gap-2">
            <svg className="h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>{t.contact.success}</span>
          </div>
        </div>
      )}

      {status === 'error' && (
        <div
          className="mb-4 rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-800 dark:border-red-800 dark:bg-red-900/20 dark:text-red-300"
          role="alert"
        >
          <div className="flex items-center gap-2">
            <svg className="h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span>Something went wrong. Please try again.</span>
          </div>
        </div>
      )}

      <form
        ref={formRef}
        onSubmit={onSubmit}
        className="reveal grid grid-cols-1 gap-4 rounded-xl border border-primary-100 bg-white p-4 shadow-sm sm:p-6 md:grid-cols-2 dark:border-primary-800 dark:bg-primary-900"
        noValidate
      >
        {/* Name */}
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium text-primary-700 dark:text-primary-200">
            {t.contact.fields.name}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder={placeholders.name}
            aria-invalid={errors.name ? 'true' : undefined}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className={`${inputBaseClass} ${errors.name ? inputErrorClass : inputNormalClass}`}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {errors.name && (
            <p id="name-error" className="mt-1 text-xs text-red-600 dark:text-red-400" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        {/* Company */}
        <div>
          <label htmlFor="company" className="mb-1 block text-sm font-medium text-primary-700 dark:text-primary-200">
            {t.contact.fields.company}
          </label>
          <input
            id="company"
            name="company"
            type="text"
            placeholder={placeholders.company}
            className={`${inputBaseClass} ${inputNormalClass}`}
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-primary-700 dark:text-primary-200">
            {t.contact.fields.email}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder={placeholders.email}
            aria-invalid={errors.email ? 'true' : undefined}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={`${inputBaseClass} ${errors.email ? inputErrorClass : inputNormalClass}`}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {errors.email && (
            <p id="email-error" className="mt-1 text-xs text-red-600 dark:text-red-400" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="mb-1 block text-sm font-medium text-primary-700 dark:text-primary-200">
            {t.contact.fields.phone}
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder={placeholders.phone}
            className={`${inputBaseClass} ${inputNormalClass}`}
          />
        </div>

        {/* Company Size */}
        <div>
          <label htmlFor="size" className="mb-1 block text-sm font-medium text-primary-700 dark:text-primary-200">
            {t.contact.fields.size}
          </label>
          <select
            id="size"
            name="size"
            className={`${inputBaseClass} ${inputNormalClass} bg-white dark:bg-primary-900`}
          >
            <option value="1-5">1-5 employees</option>
            <option value="6-20">6-20 employees</option>
            <option value="21-50">21-50 employees</option>
            <option value="51-200">51-200 employees</option>
            <option value="200+">200+ employees</option>
          </select>
        </div>

        {/* Message */}
        <div className="md:col-span-2">
          <label htmlFor="message" className="mb-1 block text-sm font-medium text-primary-700 dark:text-primary-200">
            {t.contact.fields.message}
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={4}
            placeholder={placeholders.message}
            aria-invalid={errors.message ? 'true' : undefined}
            aria-describedby={errors.message ? 'message-error' : undefined}
            className={`${inputBaseClass} ${errors.message ? inputErrorClass : inputNormalClass} resize-none`}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {errors.message && (
            <p id="message-error" className="mt-1 text-xs text-red-600 dark:text-red-400" role="alert">
              {errors.message}
            </p>
          )}
        </div>

        {/* Checkbox */}
        <div className="md:col-span-2">
          <div className="flex items-start gap-3">
            <input
              id="agree"
              name="agree"
              type="checkbox"
              required
              aria-invalid={errors.agree ? 'true' : undefined}
              aria-describedby={errors.agree ? 'agree-error' : undefined}
              className="mt-1 h-5 w-5 rounded border-primary-300 text-accent focus:ring-accent"
              onChange={handleCheckboxChange}
            />
            <label htmlFor="agree" className="text-sm text-primary-700 dark:text-primary-200">
              {t.contact.checkbox}
            </label>
          </div>
          {errors.agree && (
            <p id="agree-error" className="mt-1 text-xs text-red-600 dark:text-red-400" role="alert">
              {errors.agree}
            </p>
          )}
        </div>

        {/* Submit */}
        <div className="md:col-span-2">
          <Button
            type="submit"
            className="w-full md:w-auto"
            loading={status === 'submitting'}
            loadingText={t.contact.sending || 'Sending...'}
          >
            {t.contact.submit}
          </Button>
        </div>
      </form>
    </div>
  )
}
