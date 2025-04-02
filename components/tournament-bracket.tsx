"use client"
import { useState } from "react"
import type { Tournament, Match } from "@/types/tournament"
import { MatchCard } from "./match-card"
import { ChevronRight } from "lucide-react"

interface TournamentBracketProps {
  tournament: Tournament
  isAdmin?: boolean
  onEditMatch?: (match: Match) => void
}

export function TournamentBracket({ tournament, isAdmin = false, onEditMatch }: TournamentBracketProps) {
  return (
    <div className="flex flex-col w-full">
      {/* Bracket Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-tournament-black/80 border-b border-tournament-gold/30 sticky top-0 z-10">
        <h2 className="text-tournament-gold font-bold">Tournament Bracket</h2>
        <div className="md:hidden flex items-center text-tournament-gold/60 text-sm">
          <span>Scroll</span>
          <ChevronRight className="h-4 w-4 ml-1" />
        </div>
      </div>

      {/* Mobile Horizontal Scroll View */}
      <div className="md:hidden w-full overflow-x-auto scrollbar-hide">
        <div className="flex flex-row min-w-max p-4 gap-4">
          {tournament.rounds.map((round) => (
            <div 
              key={round.id} 
              className="flex-none w-[280px] first:pl-0 last:pr-4"
            >
              <div className="bg-tournament-black/40 rounded-lg p-4">
                <h3 className="text-tournament-gold font-bold mb-4 text-center">
                  {round.name}
                </h3>
                <div className="space-y-4">
                  {round.matches.map((match) => (
                    <MatchCard
                      key={match.id}
                      match={match}
                      teams={tournament.teams}
                      isAdmin={isAdmin}
                      onEdit={onEditMatch}
                      isMobile={true}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block tournament-bracket w-full overflow-x-auto">
        <div className="flex flex-row justify-between min-w-[900px] p-4">
          {tournament.rounds.map((round) => (
            <div key={round.id} className="bracket-round flex-1 px-2 md:px-4">
              <h3 className="text-tournament-gold font-bold text-center mb-6 text-lg">{round.name}</h3>
              <div className="space-y-0">
                {round.matches.map((match, index) => {
                  const spacingMultiplier = Math.pow(2, round.id - 1)
                  const marginTop = round.id > 1 ? (round.id > 2 ? `${spacingMultiplier * 6.75}rem`: `${spacingMultiplier * 4}rem`) : "0"
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
                      <MatchCard 
                        match={match} 
                        teams={tournament.teams} 
                        isAdmin={isAdmin} 
                        onEdit={onEditMatch} 
                      />
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

