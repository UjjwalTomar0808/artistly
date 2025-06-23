"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { categories, locations, priceRanges } from "@/lib/mock-data"
import { FilterX } from "lucide-react"
import type { FilterState } from "./artist-listing"

interface ArtistFiltersProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
}

export function ArtistFilters({ filters, onFiltersChange }: ArtistFiltersProps) {
  const updateFilter = (key: keyof FilterState, value: string | boolean) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    })
  }

  const clearAllFilters = () => {
    onFiltersChange({
      category: "",
      location: "",
      priceRange: "",
      availability: "",
      verified: false,
    })
  }

  const hasActiveFilters = Object.values(filters).some((value) => (typeof value === "boolean" ? value : value !== ""))

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Filter Artists</h3>
          {hasActiveFilters && (
            <Button variant="outline" size="sm" onClick={clearAllFilters} className="text-gray-600">
              <FilterX className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Category Filter */}
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={filters.category} onValueChange={(value) => updateFilter("category", value)}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Location Filter */}
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Select value={filters.location} onValueChange={(value) => updateFilter("location", value)}>
              <SelectTrigger>
                <SelectValue placeholder="All Locations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Price Range Filter */}
          <div className="space-y-2">
            <Label htmlFor="priceRange">Price Range</Label>
            <Select value={filters.priceRange} onValueChange={(value) => updateFilter("priceRange", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Any Price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Price</SelectItem>
                {priceRanges.map((range) => (
                  <SelectItem key={range} value={range}>
                    {range}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Availability Filter */}
          <div className="space-y-2">
            <Label htmlFor="availability">Availability</Label>
            <Select value={filters.availability} onValueChange={(value) => updateFilter("availability", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Any Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Status</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="busy">Busy</SelectItem>
                <SelectItem value="unavailable">Unavailable</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Verified Filter */}
          <div className="space-y-2">
            <Label>Options</Label>
            <div className="flex items-center space-x-2 pt-2">
              <Checkbox
                id="verified"
                checked={filters.verified}
                onCheckedChange={(checked) => updateFilter("verified", checked as boolean)}
              />
              <Label htmlFor="verified" className="text-sm font-normal">
                Verified only
              </Label>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
