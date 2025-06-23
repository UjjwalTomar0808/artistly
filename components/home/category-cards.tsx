"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Music, Users, Mic, Headphones } from "lucide-react"

const categories = [
  {
    name: "Musicians",
    description: "Solo artists, bands, and orchestras",
    icon: Music,
    count: "150+ artists",
    color: "bg-blue-50 text-blue-600",
    href: "/artists?category=musicians",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Dancers",
    description: "Contemporary, classical, and cultural dancers",
    icon: Users,
    count: "120+ artists",
    color: "bg-purple-50 text-purple-600",
    href: "/artists?category=dancers",
    image:
      "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Speakers",
    description: "Motivational and keynote speakers",
    icon: Mic,
    count: "80+ artists",
    color: "bg-green-50 text-green-600",
    href: "/artists?category=speakers",
    image:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "DJs",
    description: "Professional DJs for all occasions",
    icon: Headphones,
    count: "100+ artists",
    color: "bg-orange-50 text-orange-600",
    href: "/artists?category=djs",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

export function CategoryCards() {
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Explore Artist Categories</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find the perfect performer for your event from our diverse range of talented artists
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {categories.map((category, index) => (
            <motion.div key={category.name} variants={cardVariants}>
              <Link href={category.href}>
                <Card className="group hover:shadow-xl transition-all duration-500 cursor-pointer border-2 hover:border-blue-200 overflow-hidden">
                  <CardContent className="p-0">
                    {/* Image Section */}
                    <div className="relative h-48 overflow-hidden">
                      <motion.img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                        viewport={{ once: true }}
                        className={`absolute top-4 right-4 w-12 h-12 rounded-full ${category.color} flex items-center justify-center shadow-lg`}
                      >
                        <category.icon className="h-6 w-6" />
                      </motion.div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 text-center">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-gray-600 mb-3">{category.description}</p>
                      <motion.span
                        className="text-sm font-medium text-blue-600"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        {category.count}
                      </motion.span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
