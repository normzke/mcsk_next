'use client'

"use client"

import { motion } from "framer-motion"

interface PageHeaderProps {
  title: string
  description?: string
  image: string
  overlay?: {
    color: string
    opacity: number
  }
}

export default function PageHeader({
  title,
  description,
  image,
  overlay = { color: "bg-slate-900", opacity: 0.75 },
}: PageHeaderProps) {
  return (
    <div className="relative bg-slate-900">
      <div className="absolute inset-0">
        <img
          className="h-full w-full object-cover"
          src={image}
          alt={title}
        />
        <div
          className={`absolute inset-0 ${overlay.color}`}
          style={{ opacity: overlay.opacity }}
        />
      </div>
      <div className="relative mx-auto max-w-7xl py-24 px-4 sm:py-32 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto"
        >
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 max-w-3xl text-xl text-slate-300 mx-auto"
            >
              {description}
            </motion.p>
          )}
        </motion.div>
      </div>
    </div>
  )
} 