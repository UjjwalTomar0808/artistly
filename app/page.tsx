import { Hero } from "@/components/home/hero"
import { CategoryCards } from "@/components/home/category-cards"
import { FeaturedArtists } from "@/components/home/featured-artists"
import { HowItWorks } from "@/components/home/how-it-works"
import { Stats } from "@/components/home/stats"

export default function HomePage() {
  return (
    <div className="space-y-16 md:space-y-24">
      <Hero />
      <CategoryCards />
      <FeaturedArtists />
      <HowItWorks />
      <Stats />
    </div>
  )
}
