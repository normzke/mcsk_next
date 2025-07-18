export interface LeadershipMember {
  id: string
  name: string
  position: string
  image: string
  bio: string
  expertise: string[]
  contact: {
    email: string
    phone?: string
    linkedin?: string
  }
  quote?: string
}

export interface LeadershipCommitmentValue {
  title: string
  description: string
}

export interface LeadershipCommitment {
  title: string
  description: string
  values: LeadershipCommitmentValue[]
}

export interface LeadershipHero {
  title: string
  description: string
  image: string
}

export interface LeadershipData {
  hero: LeadershipHero
  boardMembers: LeadershipMember[]
  managementTeam: LeadershipMember[]
  commitment: LeadershipCommitment
}
