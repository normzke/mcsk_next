'use client'

"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Service {
  id: number
  title: string
  description: string
  icon: string
  link: string
}

export default function ServicesGrid({ services }: { services: Service[] }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Empowering musicians through comprehensive copyright management and licensing solutions
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service) => (
            <motion.div key={service.id} variants={itemVariants}>
              <Card className="h-full group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
                <CardHeader>
                  <div className="text-blue-600 text-3xl mb-4 transform transition-transform duration-300 group-hover:scale-110">
                    <i className={`fas fa-${service.icon}`}></i>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900">{service.title}</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <Button
                    variant="outline"
                    className="group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300"
                    asChild
                  >
                    <a href={service.link}>
                      Learn More
                      <i className="fas fa-arrow-right ml-2 transform transition-transform duration-300 group-hover:translate-x-1"></i>
                    </a>
                  </Button>

                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-blue-50 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-blue-50 rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <Button size="lg" className="rounded-full" asChild>
            <a href="/contact">
              Get Started Today
              <i className="fas fa-arrow-right ml-2"></i>
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
} 