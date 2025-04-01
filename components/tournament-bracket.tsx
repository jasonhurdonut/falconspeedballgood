"use client"
import type { Tournament, Match } from "@/types/tournament"
import { MatchCard } from "./match-card"

interface TournamentBracketProps {
  tournament: Tournament
  isAdmin?: boolean
  onEditMatch?: (match: Match) => void
}

export function TournamentBracket({ tournament, isAdmin = false, onEditMatch }: TournamentBracketProps) {
  return (
    <div className="tournament-bracket w-full overflow-x-auto">
      <div className="flex flex-col md:flex-row justify-between min-w-[900px]">
        {tournament.rounds.map((round) => (
          <div key={round.id} className="bracket-round flex-1 px-2 md:px-4">
            <h3 className="text-tournament-gold font-bold text-center mb-6 text-lg">{round.name}</h3>

            <div className="space-y-0">
              {round.matches.map((match, index) => {
                // Calculate vertical spacing based on round
                const spacingMultiplier = Math.pow(2, round.id - 1)
                const marginTop = round.id > 1 ? (round.id > 2 ? `${spacingMultiplier * 6.75}rem`: `${spacingMultiplier * 4}rem`) : "0"

                // For rounds after the first, add extra spacing to center matches
                const isFirstMatch = index === 0
                const firstMatchOffset = round.id > 1 && isFirstMatch ? (round.id > 2 ? (round.id > 3 ? `${spacingMultiplier * 4}rem` : `${spacingMultiplier * 3.25}rem`): `${spacingMultiplier * 2}rem`) : "0"

                return (
                  <div
                    key={match.id}
                    className="relative"
                    style={{
                      marginTop: index === 0 ? firstMatchOffset : marginTop,
                    }}
                  >
                    <MatchCard match={match} teams={tournament.teams} isAdmin={isAdmin} onEdit={onEditMatch} />

                    
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

