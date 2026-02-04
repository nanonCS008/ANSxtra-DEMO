export interface ClubLeader {
  name: string
  year: string | null
  email: string
}

export interface ClubTeacher {
  name: string
  email: string
}

export interface ClubQuestion {
  id: string
  label: string
  type: 'text' | 'textarea' | 'select' | 'date' | 'checkbox'
  required: boolean
  options?: string[]
  helperLink?: string
}

export interface Club {
  id: string
  name: string
  tagline: string
  description: string
  meetingDay: string
  meetingTime: string
  location: string
  yearGroup: string
  /** Min year (7–13) for filtering */
  yearGroupMin?: number
  /** Max year (7–13) for filtering */
  yearGroupMax?: number
  leaders: ClubLeader[]
  teachers: ClubTeacher[]
  contact: string
  specialConditions: string | null
  questions: ClubQuestion[]
  roles: string[]
  accepting: boolean
  image: string
  /** All club images for carousel (main first). Club images are in same folder as club. */
  images?: string[]
  /** Raw application questions text from CSV (if present). */
  applicationQuestionsRaw?: string | null
}

export interface JoinSubmission {
  clubId: string
  clubName: string
  studentId: string
  role?: string
  answers?: Record<string, string>
  submittedAt: string
}
