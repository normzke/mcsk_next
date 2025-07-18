'use client'

"use client"

import { useInView } from "framer-motion"
import { useRef } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import CountUp from "react-countup"

interface Stat {
  number: string
  label: string
  icon: string
}

function parseNumber(value: string): number {
  return parseInt(value.replace(/[^0-9]/g, ''))
}

export default function StatsSection({ stats }: { stats: Stat[] }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-16 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="text-blue-600 text-3xl mb-4 transform transition-transform duration-300 hover:scale-110">
                    <i className={`fas fa-${stat.icon}`}></i>
                  </div>
                  <motion.div
                    className="text-3xl font-bold text-gray-900 mb-2 tabular-nums"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                  >
                    {isInView && (
                      <>
                        <CountUp
                          end={parseNumber(stat.number)}
                          duration={2}
                          separator=","
                        />
                        {stat.number.includes('+') && (
                          <span className="text-blue-600">+</span>
                        )}
                      </>
                    )}
                  </motion.div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                  
                  {/* Decorative Element */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent transform scale-x-0 transition-transform duration-700 group-hover:scale-x-100" />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700">
            <i className="fas fa-shield-check"></i>
            <span className="text-sm font-medium">Trusted by Musicians Across Kenya</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 