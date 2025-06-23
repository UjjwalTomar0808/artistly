"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Calendar, Star, Globe } from "lucide-react"

const stats = [
  {
    label: "Active Artists",
    value: "500+",
    icon: Users,
    description: "Verified performers",
    color: "text-white",
  },
  {
    label: "Events Booked",
    value: "1,000+",
    icon: Calendar,
    description: "Successful bookings",
    color: "text-white",
  },
  {
    label: "Average Rating",
    value: "4.9",
    icon: Star,
    description: "Customer satisfaction",
    color: "text-white",
  },
  {
    label: "Cities Covered",
    value: "50+",
    icon: Globe,
    description: "Worldwide reach",
    color: "text-white",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

export function Stats() {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Trusted by Thousands</h2>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Join our growing community of event planners and artists creating unforgettable experiences together.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div key={stat.label} variants={cardVariants}>
              <Card className="bg-white/10 border-white/20 text-center backdrop-blur-sm hover:bg-white/20 transition-all duration-300 group">
                <CardContent className="p-6">
                  <motion.div whileHover={{ scale: 1.1, rotate: 5 }} transition={{ duration: 0.3 }} className="mb-4">
                    <stat.icon className="h-8 w-8 text-white mx-auto" />
                  </motion.div>

                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-3xl font-bold text-white mb-2 group-hover:scale-110 transition-transform"
                  >
                    {stat.value}
                  </motion.div>

                  <div className="text-lg font-semibold text-white mb-1">{stat.label}</div>
                  <div className="text-sm text-blue-100">{stat.description}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
