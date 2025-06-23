import { ArtistListing } from "@/components/artists/artist-listing"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Browse Artists - Artistly",
  description: "Discover talented performing artists for your next event. Filter by category, location, and budget.",
}

export default function ArtistsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Browse Artists</h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          Discover talented performing artists for your next event. Use our filters to find the perfect match for your
          requirements.
        </p>
      </div>
      <ArtistListing />
    </div>
  )
}
