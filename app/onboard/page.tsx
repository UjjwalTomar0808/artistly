import { ArtistOnboardingForm } from "@/components/onboard/artist-onboarding-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Artist Onboarding - Artistly",
  description: "Join Artistly as a performing artist. Create your profile and start receiving booking requests.",
}

export default function OnboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Join Artistly as an Artist</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Create your artist profile and start receiving booking requests from event planners worldwide.
          </p>
        </div>
        <ArtistOnboardingForm />
      </div>
    </div>
  )
}
