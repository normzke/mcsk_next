export interface Event {
  id: string
  title: string
  description: string
  date: string // ISO string (from DateTime)
  location: string | null
  image: string | null
  category: string | null
  venue: string | null
  startTime: string | null // ISO string (from DateTime)
  endTime: string | null   // ISO string (from DateTime)
  isActive: boolean
  createdAt: string | Date // ISO string (from DateTime)
  updatedAt: string | Date // ISO string (from DateTime)
  deletedAt: string | Date | null // ISO string (from DateTime)
}

export interface Gallery {
  id: string
  title: string
  description: string | null
  image: string
  type: 'image' | 'video'
  order: number
  isActive: boolean
  createdAt: string | Date
  updatedAt: string | Date
  deletedAt: string | Date | null
}

export interface Download {
  id: string
  title: string
  description: string | null
  file: string
  order: number
  downloads: number
  isActive: boolean
  createdAt: string | Date
  updatedAt: string | Date
  deletedAt: string | Date | null
}

export interface Faq {
  id: string
  question: string
  answer: string
  order: number
  isActive: boolean
  createdAt: string | Date
  updatedAt: string | Date
  deletedAt: string | Date | null
}

export interface BoardMember {
  id: string
  name: string
  position: string
  image: string | null
  bio: string | null
  order: number
  phone?: string | null
  email?: string | null
  linkedinUrl?: string | null
  twitterUrl?: string | null
  isActive: boolean
  createdAt: string | Date
  updatedAt: string | Date
  deletedAt: string | Date | null
}

export interface ManagementMember {
  id: string
  name: string
  firstName: string
  lastName: string
  email: string
  phone?: string | null
  profileImage?: string | null
  /** Full name alias */
  image?: string | null
  position: string
  role: 'board_member' | 'executive' | 'director' | 'manager'
  department: 'board' | 'finance' | 'licensing' | 'distribution' | 'legal' | 'operations' | 'it' | 'hr'
  status: 'active' | 'inactive' | 'on_leave'
  bio?: string | null
  order: number
  startDate?: string | Date
  endDate?: string | Date | null
  isActive: boolean
  createdAt?: string | Date
  updatedAt?: string | Date
  deletedAt?: string | Date | null
  twitterUrl?: string | null
  linkedinUrl?: string | null
}


export interface News {
  id: string
  title: string
  content: string
  image: string | null
  slug: string
  isActive: boolean
  createdAt: string | Date
  updatedAt: string | Date
  deletedAt: string | Date | null
  excerpt?: string
  category?: string
  is_active?: boolean
  is_featured?: boolean
  published_at?: string | Date
  created_at?: string | Date
  updated_at?: string | Date
  tags?: string[]
}

export interface Announcement {
  id: string
  title: string
  content: string
  type: 'info' | 'warning' | 'success' | 'danger'
  image: string | null
  publishAt: string
  expireAt: string | null
  isFeatured: boolean
  isPublished: boolean
  buttonText: string | null
  buttonUrl: string | null
  attachment: string | null
  createdAt: string | Date
  updatedAt: string | Date
  deletedAt?: string | Date | null
}

export interface Page {
  id: string
  title: string
  content: string
  slug: string
  isActive: boolean
  createdAt: string | Date
  updatedAt: string | Date
  deletedAt: string | Date | null
}

export interface Service {
  id: string
  title: string
  description: string
  icon: string | null
  order: number
  isActive: boolean
  createdAt: string | Date
  updatedAt: string | Date
  deletedAt: string | Date | null
}

export interface Partner {
  id: string
  name: string
  description?: string
  website?: string
  logoUrl?: string
  status?: 'active' | 'inactive'
  order?: number
  logo?: string | null
  createdAt?: string | Date
  updatedAt?: string | Date
  deletedAt?: string | Date | null
}

export interface LicenseType {
  id: string
  title: string
  description: string
  requirements: string[]
  fees: Array<{
    amount: number
    currency: string
    period?: string
  }>
  icon: string
  order: number | null
  isActive: boolean
  createdAt: string | Date
  updatedAt: string | Date
  deletedAt?: string | Date | null
}

export interface License {
  id: string
  licenseNumber: string
  licenseTypeId: string
  memberId: string
  status: 'pending' | 'approved' | 'rejected'
  issuedAt: string | null
  expiresAt: string | null
  createdAt: string | Date
  updatedAt: string | Date
  deletedAt: string | Date | null
  member?: {
    id: string
    name: string
    email: string
  }
  licenseType?: {
    id: string
    title: string
    category: string
  }
}

export interface Member {
  id: string
  membershipNumber?: string
  firstName?: string
  lastName?: string
  email: string
  phone?: string | null
  address?: string | null
  idNumber?: string | null
  dateOfBirth?: string | Date | null
  city?: string | null
  country?: string | null
  membershipType?: string | null
  status?: 'active' | 'inactive' | 'suspended' | 'pending'
  joinDate?: string | Date | null
  profileImage?: string | null
  /** Full name alias */
  name?: string
  /** Legacy photo */
  image?: string | null
  profilePhoto?: string | null // alias for backward compatibility
  bio?: string | null
  bankName?: string | null
  bankAccount?: string | null
  mpesaNumber?: string | null
  createdAt?: string | Date
  updatedAt?: string | Date
  deletedAt?: string | Date | null
  category?: {
    id: string
    title: string
  }
}


export interface Setting {
  id: string
  key: string
  value: string
  type: string
  group: string
  description?: string | null
  order?: number
  createdAt: string | Date
  updatedAt: string | Date
  deletedAt?: string | Date | null
}

export interface SeoMeta {
  id: string
  path: string
  title: string | null
  description: string | null
  keywords: string | null
  ogTitle: string | null
  ogDescription: string | null
  ogImage: string | null
  createdAt: string | Date
  updatedAt: string | Date
}

export interface NewsletterSubscriber {
  id: string
  email: string
  isActive: boolean
  createdAt: string | Date
  updatedAt: string | Date
}

export interface HeroSlide {
  id: string;
  title: string;
  subtitle?: string | null;
  description?: string | null;
  /** Primary image path */
  image?: string;
  /** Alias kept for backward compatibility */
  imageUrl?: string;
  buttonText?: string | null;
  buttonLink?: string | null;
  order?: number;
  isActive?: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  deletedAt?: string | Date | null;
}

export interface Contact {
  id: string
  name: string
  email: string
  phone: string | null
  subject: string
  message: string
  isRead: boolean
  createdAt: string | Date
  updatedAt: string | Date
  deletedAt: string | Date | null
}

export interface Wave {
  id: string
  title: string
  artist: string
  album: string | null
  genre: string
  releaseDate: string | Date
  duration: number
  coverArt: string
  audioFile: string
  status: boolean
  isFeatured: boolean
  playCount: number
  memberId: string
  member: {
    id: string
    name: string
  }
  isrcCode: string
  lyrics: string | null
  description: string | null
  copyrightInfo: string
  createdAt: string | Date
  updatedAt: string | Date
  deletedAt: string | Date | null
}

export interface Job {
  id: string
  title: string
  department: string
  location: string
  type: 'full-time' | 'part-time' | 'contract'
  experience: string
  description: string
  responsibilities: string[]
  requirements: string[]
  benefits: string[]
  deadline: string
  createdAt: string | Date
  updatedAt: string | Date
}

export interface MembershipCategory {
  id: string
  title: string
  features: string[]
  order: number | null
  isActive: boolean
  createdAt: string | Date
  updatedAt: string | Date
} 