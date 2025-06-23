export interface Artist {
  id: number
  name: string
  category: string
  location: string
  priceRange: string
  rating: number
  reviews: number
  image: string
  bio: string
  specialties: string[]
  languages: string[]
  availability: "available" | "busy" | "unavailable"
  verified: boolean
}

export const mockArtists: Artist[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    category: "Musicians",
    location: "New York, NY",
    priceRange: "$500-1000",
    rating: 4.9,
    reviews: 45,
    image: "/placeholder.svg?height=300&width=300",
    bio: "Professional jazz vocalist with 10+ years of experience performing at weddings, corporate events, and private parties.",
    specialties: ["Jazz", "Pop", "Soul", "Wedding Songs"],
    languages: ["English", "Spanish"],
    availability: "available",
    verified: true,
  },
  {
    id: 2,
    name: "Dance Fusion Crew",
    category: "Dancers",
    location: "Los Angeles, CA",
    priceRange: "$800-1500",
    rating: 4.8,
    reviews: 32,
    image: "/placeholder.svg?height=300&width=300",
    bio: "Award-winning dance crew specializing in contemporary and hip-hop performances for corporate events and entertainment shows.",
    specialties: ["Hip Hop", "Contemporary", "Street Dance", "Choreography"],
    languages: ["English"],
    availability: "available",
    verified: true,
  },
  {
    id: 3,
    name: "DJ Mike Stevens",
    category: "DJs",
    location: "Miami, FL",
    priceRange: "$400-800",
    rating: 4.9,
    reviews: 67,
    image: "/placeholder.svg?height=300&width=300",
    bio: "Professional DJ with expertise in electronic music, weddings, and corporate events. State-of-the-art equipment included.",
    specialties: ["Electronic", "House", "Wedding Music", "Corporate Events"],
    languages: ["English", "Portuguese"],
    availability: "available",
    verified: true,
  },
  {
    id: 4,
    name: "Dr. Amanda Chen",
    category: "Speakers",
    location: "San Francisco, CA",
    priceRange: "$1000-2500",
    rating: 4.9,
    reviews: 28,
    image: "/placeholder.svg?height=300&width=300",
    bio: "Motivational speaker and business consultant with expertise in leadership, innovation, and personal development.",
    specialties: ["Leadership", "Innovation", "Personal Development", "Corporate Training"],
    languages: ["English", "Mandarin"],
    availability: "available",
    verified: true,
  },
  {
    id: 5,
    name: "The Jazz Quartet",
    category: "Musicians",
    location: "Chicago, IL",
    priceRange: "$1200-2000",
    rating: 4.7,
    reviews: 23,
    image: "/placeholder.svg?height=300&width=300",
    bio: "Professional jazz ensemble perfect for upscale events, cocktail parties, and intimate gatherings.",
    specialties: ["Jazz", "Swing", "Blues", "Cocktail Music"],
    languages: ["English"],
    availability: "busy",
    verified: true,
  },
  {
    id: 6,
    name: "Maria Rodriguez",
    category: "Dancers",
    location: "Austin, TX",
    priceRange: "$300-600",
    rating: 4.8,
    reviews: 19,
    image: "/placeholder.svg?height=300&width=300",
    bio: "Flamenco dancer and instructor bringing authentic Spanish culture to your events with passionate performances.",
    specialties: ["Flamenco", "Spanish Dance", "Cultural Performances"],
    languages: ["English", "Spanish"],
    availability: "available",
    verified: true,
  },
  {
    id: 7,
    name: "DJ Luna",
    category: "DJs",
    location: "Las Vegas, NV",
    priceRange: "$600-1200",
    rating: 4.6,
    reviews: 41,
    image: "/placeholder.svg?height=300&width=300",
    bio: "High-energy DJ specializing in EDM, pop, and party music. Perfect for nightclub events and festivals.",
    specialties: ["EDM", "Pop", "Party Music", "Club Events"],
    languages: ["English"],
    availability: "available",
    verified: false,
  },
  {
    id: 8,
    name: "Robert Thompson",
    category: "Speakers",
    location: "Boston, MA",
    priceRange: "$800-1500",
    rating: 4.9,
    reviews: 35,
    image: "/placeholder.svg?height=300&width=300",
    bio: "Technology keynote speaker and startup mentor with 15+ years in Silicon Valley. Inspiring talks on innovation and entrepreneurship.",
    specialties: ["Technology", "Entrepreneurship", "Innovation", "Startups"],
    languages: ["English"],
    availability: "available",
    verified: true,
  },
]

export const categories = ["Musicians", "Dancers", "Speakers", "DJs"]
export const locations = [
  "New York, NY",
  "Los Angeles, CA",
  "Miami, FL",
  "San Francisco, CA",
  "Chicago, IL",
  "Austin, TX",
  "Las Vegas, NV",
  "Boston, MA",
]
export const priceRanges = ["$0-500", "$500-1000", "$1000-1500", "$1500-2000", "$2000+"]

// Mock data for dashboard
export interface ArtistSubmission {
  id: number
  name: string
  category: string
  location: string
  feeRange: string
  status: "pending" | "approved" | "rejected"
  submittedAt: string
  email: string
  phone: string
}

export const mockSubmissions: ArtistSubmission[] = [
  {
    id: 1,
    name: "Emma Wilson",
    category: "Musicians",
    location: "Seattle, WA",
    feeRange: "$400-800",
    status: "pending",
    submittedAt: "2024-01-15",
    email: "emma.wilson@email.com",
    phone: "+1 (555) 123-4567",
  },
  {
    id: 2,
    name: "Carlos Martinez",
    category: "Dancers",
    location: "Phoenix, AZ",
    feeRange: "$600-1000",
    status: "approved",
    submittedAt: "2024-01-14",
    email: "carlos.martinez@email.com",
    phone: "+1 (555) 234-5678",
  },
  {
    id: 3,
    name: "Lisa Chang",
    category: "Speakers",
    location: "Portland, OR",
    feeRange: "$1000-2000",
    status: "pending",
    submittedAt: "2024-01-13",
    email: "lisa.chang@email.com",
    phone: "+1 (555) 345-6789",
  },
  {
    id: 4,
    name: "DJ Alex",
    category: "DJs",
    location: "Denver, CO",
    feeRange: "$300-600",
    status: "rejected",
    submittedAt: "2024-01-12",
    email: "dj.alex@email.com",
    phone: "+1 (555) 456-7890",
  },
  {
    id: 5,
    name: "Symphony Strings",
    category: "Musicians",
    location: "Nashville, TN",
    feeRange: "$1500-2500",
    status: "approved",
    submittedAt: "2024-01-11",
    email: "info@symphonystrings.com",
    phone: "+1 (555) 567-8901",
  },
]
