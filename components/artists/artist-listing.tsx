"use client"

import { useState, useMemo } from "react"
import { ArtistCard } from "./artist-card"
import { ArtistFilters } from "./artist-filters"
import { mockArtists } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Grid, List } from "lucide-react"

export interface FilterState {
  category: string
  location: string
  priceRange: string
  availability: string
  verified: boolean
}

export function ArtistListing() {
  const [filters, setFilters] = useState<FilterState>({
    category: "",
    location: "",
    priceRange: "",
    availability: "",
    verified: false,
  })
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // Filter artists based on current filters
  const filteredArtists = useMemo(() => {
    return mockArtists.filter((artist) => {
      if (filters.category && artist.category !== filters.category) return false
      if (filters.location && artist.location !== filters.location) return false
      if (filters.priceRange && !isPriceInRange(artist.priceRange, filters.priceRange)) return false
      if (filters.availability && artist.availability !== filters.availability) return false
      if (filters.verified && !artist.verified) return false
      return true
    })
  }, [filters])

  // Helper function to check if price is in range
  function isPriceInRange(artistPrice: string, filterRange: string): boolean {
    if (!filterRange) return true

    // Extract numbers from price strings
    const extractPrice = (price: string) => {
      const matches = price.match(/\d+/g)
      return matches ? Number.parseInt(matches[0]) : 0
    }

    const artistMinPrice = extractPrice(artistPrice)

    switch (filterRange) {
      case "$0-500":
        return artistMinPrice <= 500
      case "$500-1000":
        return artistMinPrice >= 500 && artistMinPrice <= 1000
      case "$1000-1500":
        return artistMinPrice >= 1000 && artistMinPrice <= 1500
      case "$1500-2000":
        return artistMinPrice >= 1500 && artistMinPrice <= 2000
      case "$2000+":
        return artistMinPrice >= 2000
      default:
        return true
    }
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <ArtistFilters filters={filters} onFiltersChange={setFilters} />

      {/* Results header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">{filteredArtists.length} Artists Found</h2>
          <p className="text-gray-600">Showing results based on your filters</p>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center space-x-2">
          <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")}>
            <Grid className="h-4 w-4" />
          </Button>
          <Button variant={viewMode === "list" ? "default" : "outline"} size="sm" onClick={() => setViewMode("list")}>
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Artists grid/list */}
      {filteredArtists.length > 0 ? (
        <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
          {filteredArtists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} viewMode={viewMode} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Grid className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No artists found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your filters to see more results</p>
          <Button
            variant="outline"
            onClick={() =>
              setFilters({
                category: "",
                location: "",
                priceRange: "",
                availability: "",
                verified: false,
              })
            }
          >
            Clear All Filters
          </Button>
        </div>
      )}
    </div>
  )
}
