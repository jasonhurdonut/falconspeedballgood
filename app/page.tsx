"use client"
import { useTournament } from "@/context/tournament-context"
import { TournamentBracket } from "@/components/tournament-bracket"

export default function Home() {
  const { tournament, isLoading } = useTournament()

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[50vh]">
        <div className="text-tournament-gold">Loading tournament data...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <div className="px-4 mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-tournament-gold text-center">
          {tournament.name}
        </h1>
      </div>

      <div className="bg-tournament-black/50 rounded-lg shadow-lg overflow-hidden">
        <TournamentBracket tournament={tournament} />
      </div>
    </div>
  )
}

