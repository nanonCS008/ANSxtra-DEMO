import clubsData from '@/data/clubs.json'
import { Club } from './types/club'

export function getClubs(): Club[] {
  return clubsData as Club[]
}

export function getClubById(id: string): Club | undefined {
  return (clubsData as Club[]).find(club => club.id === id)
}

export function getFeaturedClubs(): Club[] {
  // Return first 6 clubs as featured
  return (clubsData as Club[]).slice(0, 6)
}

