'use client'

import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Container } from '@/components/ui/Container'
import { Input, Textarea } from '@/components/ui/Input'
import { RadioGroup } from '@/components/ui/RadioGroup'
import { getClubById } from '@/lib/data'
import { saveSubmission } from '@/lib/storage'
import { JoinSubmission } from '@/lib/types/club'
import { cn } from '@/lib/utils/cn'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { notFound, useParams, useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'

// Get role/group label based on club
function getRoleLabel(clubId: string): { title: string; description: string; label: string } {
  if (clubId === 'interact') {
    return {
      title: 'Select Your Role',
      description: 'Which role would you like to be a part of?',
      label: 'Role'
    }
  }
  if (clubId === 'unicef') {
    return {
      title: 'Select Your Group',
      description: 'Which group do you want to join within UNICEF?',
      label: 'Group'
    }
  }
  return {
    title: 'Select Your Role',
    description: 'Choose the role you\'d like to take on in this club.',
    label: 'Role'
  }
}

export default function JoinPage() {
  const params = useParams()
  const router = useRouter()
  const clubId = params.id as string
  const club = getClubById(clubId)

  const [studentId, setStudentId] = useState('')
  const [selectedRole, setSelectedRole] = useState('')
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [checkboxes, setCheckboxes] = useState<Record<string, boolean>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!club) {
    notFound()
  }

  const hasRoles = club.roles.length > 0
  const hasQuestions = club.questions.length > 0
  const roleLabels = getRoleLabel(club.id)
  const isDofE = club.id === 'dofe'

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    // Validate student ID (4-8 digits)
    if (!studentId) {
      newErrors.studentId = 'Student ID is required'
    } else if (!/^\d{4,8}$/.test(studentId)) {
      newErrors.studentId = 'Student ID must be 4-8 digits'
    }

    // Validate role if required
    if (hasRoles && !selectedRole) {
      newErrors.role = `Please select a ${roleLabels.label.toLowerCase()}`
    }

    // Validate questions
    club.questions.forEach((question) => {
      if (question.type === 'checkbox') {
        if (question.required && !checkboxes[question.id]) {
          newErrors[question.id] = 'You must confirm this to proceed'
        }
      } else {
        if (question.required && !answers[question.id]?.trim()) {
          newErrors[question.id] = 'This field is required'
        }
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return
    if (!club.accepting) return

    setIsSubmitting(true)

    // Merge answers with checkbox values
    const allAnswers: Record<string, string> = { ...answers }
    Object.entries(checkboxes).forEach(([key, value]) => {
      allAnswers[key] = value ? 'Yes' : 'No'
    })

    const submission: JoinSubmission = {
      clubId: club.id,
      clubName: club.name,
      studentId,
      role: selectedRole || undefined,
      answers: Object.keys(allAnswers).length > 0 ? allAnswers : undefined,
      submittedAt: new Date().toISOString(),
    }

    // Try API first, fallback to localStorage
    try {
      const response = await fetch('/api/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submission),
      })
      
      if (!response.ok) throw new Error('API failed')
    } catch {
      // API failed, save to localStorage
      saveSubmission(submission)
    }

    // Navigate to confirmation
    const urlParams = new URLSearchParams({
      club: club.name,
      studentId,
    })
    if (selectedRole) urlParams.set('role', selectedRole)

    router.push(`/join/confirmation?${urlParams.toString()}`)
  }

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
    if (errors[questionId]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[questionId]
        return newErrors
      })
    }
  }

  const handleCheckboxChange = (questionId: string, checked: boolean) => {
    setCheckboxes((prev) => ({ ...prev, [questionId]: checked }))
    if (errors[questionId]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[questionId]
        return newErrors
      })
    }
  }

  // Render different input types based on question type
  const renderQuestionInput = (question: typeof club.questions[0]) => {
    switch (question.type) {
      case 'select':
        return (
          <RadioGroup
            label={question.label}
            name={question.id}
            options={(question.options || []).map((opt) => ({ value: opt, label: opt }))}
            value={answers[question.id] || ''}
            onChange={(value) => handleAnswerChange(question.id, value)}
            error={errors[question.id]}
            required={question.required}
          />
        )

      case 'date':
        return (
          <div className="w-full">
            <label htmlFor={question.id} className="block text-sm font-medium text-white/90 mb-2">
              {question.label}
              {question.required && <span className="text-brand-pink ml-1">*</span>}
            </label>
            <input
              type="date"
              id={question.id}
              value={answers[question.id] || ''}
              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
              className={cn(
                'w-full min-h-[48px] px-4 py-3 rounded-xl',
                'bg-brand-navy/80 border border-white/10',
                'text-white',
                'focus:outline-none focus:border-brand-pink/50 focus:ring-2 focus:ring-brand-pink/20',
                'transition-all duration-200',
                '[color-scheme:dark]',
                errors[question.id] && 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20'
              )}
              required={question.required}
            />
            {errors[question.id] && <p className="mt-2 text-sm text-red-400">{errors[question.id]}</p>}
          </div>
        )

      case 'checkbox':
        return (
          <div className="w-full">
            <label
              className={cn(
                'flex items-start gap-4 min-h-[48px] p-4 rounded-xl cursor-pointer',
                'bg-brand-navy/60 border border-white/10',
                'transition-all duration-200',
                'hover:border-white/20 hover:bg-brand-navy/80',
                checkboxes[question.id] && 'border-brand-pink/50 bg-brand-pink/10',
                errors[question.id] && 'border-red-500/50'
              )}
            >
              <input
                type="checkbox"
                id={question.id}
                checked={checkboxes[question.id] || false}
                onChange={(e) => handleCheckboxChange(question.id, e.target.checked)}
                className="sr-only"
              />
              <span
                className={cn(
                  'w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 mt-0.5',
                  'transition-all duration-200',
                  checkboxes[question.id]
                    ? 'border-brand-pink bg-brand-pink'
                    : 'border-white/30 bg-transparent'
                )}
              >
                {checkboxes[question.id] && (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </span>
              <span className="text-white/90 text-sm leading-relaxed">
                {question.label}
                {question.required && <span className="text-brand-pink ml-1">*</span>}
              </span>
            </label>
            {errors[question.id] && <p className="mt-2 text-sm text-red-400">{errors[question.id]}</p>}
          </div>
        )

      case 'textarea':
        return (
          <div className="w-full">
            <Textarea
              id={question.id}
              label={question.label}
              value={answers[question.id] || ''}
              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
              error={errors[question.id]}
              required={question.required}
              placeholder="Your answer..."
            />
            {question.helperLink && (
              <a
                href={question.helperLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium hover:bg-red-500/20 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                Watch TEDx Amnuaysilpa School Youth
              </a>
            )}
          </div>
        )

      default:
        return (
          <Input
            id={question.id}
            label={question.label}
            value={answers[question.id] || ''}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            error={errors[question.id]}
            required={question.required}
            placeholder="Your answer..."
          />
        )
    }
  }

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <Container size="narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link
            href={`/clubs/${club.id}`}
            className="inline-flex items-center text-white/60 hover:text-white mb-6 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to {club.name}
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Join {club.name}
          </h1>
          <p className="text-white/60 mb-8">
            {isDofE 
              ? 'Complete this application to register for the DofE International Award.'
              : 'Fill out the form below to register for this club.'
            }
          </p>

          {/* Not accepting notice */}
          {!club.accepting && (
            <Card padding="lg" className="border-amber-500/30 bg-amber-500/10 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400 flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-amber-400 font-semibold mb-1">Not Accepting Members</h3>
                  <p className="text-white/70 text-sm">
                    This club is currently not accepting new members. Please check back later.
                  </p>
                </div>
              </div>
            </Card>
          )}

          <form onSubmit={handleSubmit}>
            {/* Student ID Card */}
            <Card padding="lg" className="mb-6">
              <h2 className="text-lg font-bold text-white mb-6">Student Information</h2>
              
              <Input
                id="studentId"
                label="Student ID"
                placeholder="e.g., 79528"
                value={studentId}
                onChange={(e) => {
                  setStudentId(e.target.value)
                  if (errors.studentId) {
                    setErrors((prev) => {
                      const newErrors = { ...prev }
                      delete newErrors.studentId
                      return newErrors
                    })
                  }
                }}
                error={errors.studentId}
                helperText="Your school student ID number (4-8 digits)"
                required
                inputMode="numeric"
                pattern="\d*"
                maxLength={8}
              />
            </Card>

            {/* Role/Group selection */}
            {hasRoles && (
              <Card padding="lg" className="mb-6">
                <h2 className="text-lg font-bold text-white mb-2">{roleLabels.title}</h2>
                <p className="text-white/60 text-sm mb-6">
                  {roleLabels.description}
                </p>
                
                <RadioGroup
                  label={roleLabels.label}
                  name="role"
                  options={club.roles.map((role) => ({ value: role, label: role }))}
                  value={selectedRole}
                  onChange={(value) => {
                    setSelectedRole(value)
                    if (errors.role) {
                      setErrors((prev) => {
                        const newErrors = { ...prev }
                        delete newErrors.role
                        return newErrors
                      })
                    }
                  }}
                  error={errors.role}
                  required
                />
              </Card>
            )}

            {/* Application questions */}
            {hasQuestions && (
              <Card padding="lg" className="mb-6">
                <h2 className="text-lg font-bold text-white mb-2">
                  {isDofE ? 'Application Details' : 'Application Questions'}
                </h2>
                <p className="text-white/60 text-sm mb-6">
                  {isDofE 
                    ? 'Please provide the following information to complete your application.'
                    : 'Please answer the following questions.'
                  }
                </p>
                
                <div className="space-y-6">
                  {club.questions.map((question) => (
                    <div key={question.id}>
                      {renderQuestionInput(question)}
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Submit button */}
            <Button
              type="submit"
              size="lg"
              fullWidth
              disabled={!club.accepting || isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Submitting...
                </span>
              ) : (
                'Submit Registration'
              )}
            </Button>

            <p className="text-white/40 text-sm text-center mt-4">
              By submitting, you agree to participate in club activities and follow club guidelines.
            </p>
          </form>
        </motion.div>
      </Container>
    </div>
  )
}
