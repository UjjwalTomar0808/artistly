"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, CheckCircle, MessageCircle, ArrowRight } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { Artist } from "@/lib/mock-data"

interface ArtistCardProps {
  artist: Artist
  viewMode: "grid" | "list"
}

// Real artist images from Unsplash
const artistImages = [
  "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
]

export function ArtistCard({ artist, viewMode }: ArtistCardProps) {
  const { toast } = useToast()

  const handleQuoteRequest = () => {
    toast({
      title: "Quote Request Sent!",
      description: `Your quote request has been sent to ${artist.name}. They will respond within 24 hours.`,
    })
  }

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "available":
        return "bg-green-100 text-green-800"
      case "busy":
        return "bg-yellow-100 text-yellow-800"
      case "unavailable":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Use a consistent image based on artist ID
  const artistImage = artistImages[artist.id % artistImages.length]

  if (viewMode === "list") {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.02 }}
      >
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Image */}
              <div className="flex-shrink-0">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="relative overflow-hidden rounded-lg"
                >
                  <img
                    src={artistImage || "/placeholder.svg"}
                    alt={artist.name}
                    className="w-full md:w-32 h-32 object-cover"
                  />
                  {artist.verified && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      className="absolute bottom-2 right-2"
                    >
                      <CheckCircle className="h-5 w-5 text-blue-600 bg-white rounded-full" />
                    </motion.div>
                  )}
                </motion.div>
              </div>

              {/* Content */}
              <div className="flex-1 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <motion.h3
                        className="text-xl font-semibold text-gray-900"
                        whileHover={{ color: "#2563eb" }}
                        transition={{ duration: 0.2 }}
                      >
                        {artist.name}
                      </motion.h3>
                      {artist.verified && <CheckCircle className="h-5 w-5 text-blue-600" />}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <Badge variant="secondary">{artist.category}</Badge>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {artist.location}
                      </div>
                    </div>
                  </div>
                  <Badge className={getAvailabilityColor(artist.availability)}>{artist.availability}</Badge>
                </div>

                <p className="text-gray-600 line-clamp-2">{artist.bio}</p>

                <div className="flex flex-wrap gap-1">
                  {artist.specialties.slice(0, 3).map((specialty, index) => (
                    <motion.div
                      key={specialty}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Badge variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    </motion.div>
                  ))}
                  {artist.specialties.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{artist.specialties.length - 3} more
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm font-medium">{artist.rating}</span>
                      <span className="ml-1 text-sm text-gray-500">({artist.reviews})</span>
                    </div>
                    <span className="text-lg font-semibold text-blue-600">{artist.priceRange}</span>
                  </div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button onClick={handleQuoteRequest} className="group">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Ask for Quote
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      <Card className="group hover:shadow-xl transition-all duration-500 overflow-hidden">
        <CardContent className="p-0">
          <div className="relative overflow-hidden">
            <motion.img
              src={artistImage}
              alt={artist.name}
              className="w-full h-48 object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="absolute top-4 left-4"
            >
              <Badge className={getAvailabilityColor(artist.availability)}>{artist.availability}</Badge>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="absolute top-4 right-4"
            >
              <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
                {artist.category}
              </Badge>
            </motion.div>

            {artist.verified && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="absolute bottom-4 right-4"
              >
                <CheckCircle className="h-6 w-6 text-blue-600 bg-white rounded-full shadow-lg" />
              </motion.div>
            )}
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

            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{artist.bio}</p>

            <div className="flex flex-wrap gap-1 mb-4">
              {artist.specialties.slice(0, 2).map((specialty, index) => (
                <motion.div
                  key={specialty}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                >
                  <Badge variant="outline" className="text-xs">
                    {specialty}
                  </Badge>
                </motion.div>
              ))}
              {artist.specialties.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{artist.specialties.length - 2}
                </Badge>
              )}
            </div>

            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-blue-600">{artist.priceRange}</span>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="sm" onClick={handleQuoteRequest} className="group">
                  Ask for Quote
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
