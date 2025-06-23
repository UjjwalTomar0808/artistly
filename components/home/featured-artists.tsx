"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, ArrowRight } from "lucide-react"
import Link from "next/link"

const featuredArtists = [
  {
    id: 1,
    name: "Sarah Johnson",
    category: "Singer",
    location: "New York, NY",
    rating: 4.9,
    reviews: 45,
    priceRange: "$500-1000",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    specialties: ["Jazz", "Pop", "Soul"],
  },
  {
    id: 2,
    name: "Dance Fusion Crew",
    category: "Dancers",
    location: "Los Angeles, CA",
    rating: 4.8,
    reviews: 32,
    priceRange: "$800-1500",
    image:
      "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    specialties: ["Hip Hop", "Contemporary", "Street"],
  },
  {
    id: 3,
    name: "DJ Mike Stevens",
    category: "DJ",
    location: "Miami, FL",
    rating: 4.9,
    reviews: 67,
    priceRange: "$400-800",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    specialties: ["Electronic", "House", "Wedding"],
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

export function FeaturedArtists() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Artists</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover some of our top-rated performers who consistently deliver exceptional experiences
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {featuredArtists.map((artist, index) => (
            <motion.div key={artist.id} variants={cardVariants}>
              <Card className="group hover:shadow-2xl transition-all duration-500 overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <motion.img
                      src={artist.image}
                      alt={artist.name}
                      className="w-full h-48 object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                      viewport={{ once: true }}
                      className="absolute top-4 right-4"
                    >
                      <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
                        {artist.category}
                      </Badge>
                    </motion.div>
                  </div>

                  <div className="p-6">
                    <motion.h3
                      className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {artist.name}
                    </motion.h3>

                    <div className="flex items-center text-gray-600 mb-3">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{artist.location}</span>
                    </div>

                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm font-medium">{artist.rating}</span>
                        <span className="ml-1 text-sm text-gray-500">({artist.reviews} reviews)</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {artist.specialties.map((specialty, specialtyIndex) => (
                        <motion.div
                          key={specialty}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: 0.3 + specialtyIndex * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <Badge variant="outline" className="text-xs">
                            {specialty}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-blue-600">{artist.priceRange}</span>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button size="sm" className="group">
                          Ask for Quote
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button asChild size="lg" variant="outline" className="group">
              <Link href="/artists">
                View All Artists
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
