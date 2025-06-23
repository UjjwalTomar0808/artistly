"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Search, MessageCircle, Calendar, Star } from "lucide-react"

const steps = [
  {
    step: 1,
    title: "Browse & Search",
    description: "Explore our curated list of talented artists and filter by category, location, and budget.",
    icon: Search,
    color: "bg-blue-50 text-blue-600",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
  {
    step: 2,
    title: "Connect & Discuss",
    description: "Reach out to artists directly to discuss your event requirements and get personalized quotes.",
    icon: MessageCircle,
    color: "bg-green-50 text-green-600",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
  {
    step: 3,
    title: "Book & Schedule",
    description: "Confirm your booking, handle contracts, and coordinate event details seamlessly.",
    icon: Calendar,
    color: "bg-purple-50 text-purple-600",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
  {
    step: 4,
    title: "Enjoy & Review",
    description: "Experience an amazing performance and share your feedback to help other event planners.",
    icon: Star,
    color: "bg-orange-50 text-orange-600",
    image:
      "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
}

export function HowItWorks() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Getting started with Artistly is simple. Follow these easy steps to book your perfect performer.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {steps.map((step, index) => (
            <motion.div key={step.step} variants={cardVariants}>
              <Card className="relative text-center border-2 hover:border-blue-200 transition-all duration-500 group overflow-hidden">
                <CardContent className="p-0">
                  {/* Image Section */}
                  <div className="relative h-32 overflow-hidden">
                    <motion.img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>

                  {/* Content Section */}
                  <div className="p-6 relative">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                      viewport={{ once: true }}
                      className={`w-16 h-16 rounded-full ${step.color} flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <step.icon className="h-8 w-8" />
                    </motion.div>

                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                      viewport={{ once: true }}
                      className="absolute -top-3 left-6 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-lg"
                    >
                      {step.step}
                    </motion.div>

                    <motion.h3
                      className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors"
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      {step.title}
                    </motion.h3>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                </CardContent>

                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 + index * 0.2 }}
                    viewport={{ once: true }}
                    className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-300 to-purple-300 transform -translate-y-1/2 z-10"
                  />
                )}
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
