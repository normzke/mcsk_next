'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Music,
  Users,
  FileText,
  Calendar,
  Image as ImageIcon,
  Download,
  Settings,
  MessageSquare,
  Briefcase,
  Award,
  Users2,
  FileQuestion,
  Newspaper,
  Bell,
  Globe,
  Share2,
} from 'lucide-react'

const navigation = [
  {
    name: 'Dashboard',
    href: '/admin/dashboard',
    icon: LayoutDashboard
  },
  {
    name: 'Wave System',
    href: '/admin/waves',
    icon: Music
  },
  {
    name: 'Members',
    href: '/admin/members',
    icon: Users
  },
  {
    name: 'Licenses',
    href: '/admin/licenses',
    icon: Award
  },
  {
    name: 'Events',
    href: '/admin/events',
    icon: Calendar
  },
  {
    name: 'News',
    href: '/admin/news',
    icon: Newspaper
  },
  {
    name: 'Announcements',
    href: '/admin/announcements',
    icon: Bell
  },
  {
    name: 'Pages',
    href: '/admin/pages',
    icon: FileText
  },
  {
    name: 'Gallery',
    href: '/admin/gallery',
    icon: ImageIcon
  },
  {
    name: 'Downloads',
    href: '/admin/downloads',
    icon: Download
  },
  {
    name: 'Careers',
    href: '/admin/careers',
    icon: Briefcase
  },
  {
    name: 'Board Members',
    href: '/admin/board-members',
    icon: Users2
  },
  {
    name: 'Management',
    href: '/admin/management',
    icon: Users2
  },
  {
    name: 'Partners',
    href: '/admin/partners',
    icon: Share2
  },
  {
    name: 'Services',
    href: '/admin/services',
    icon: Globe
  },
  {
    name: 'FAQs',
    href: '/admin/faqs',
    icon: FileQuestion
  },
  {
    name: 'Messages',
    href: '/admin/messages',
    icon: MessageSquare
  },
  {
    name: 'Settings',
    href: '/admin/settings',
    icon: Settings
  },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-white shadow-sm h-[calc(100vh-4rem)] overflow-y-auto">
      <nav className="px-4 py-6">
        <ul className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname.startsWith(item.href)
            const Icon = item.icon

            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all',
                    isActive 
                      ? 'bg-gray-100 text-gray-900 font-medium'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  )}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  <span className="truncate">{item.name}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
} 