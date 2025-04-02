"use client"
import type { Match, Team } from "@/types/tournament"
import { getTeamById, formatMatchDate, isWinner } from "@/utils/tournament-utils"
import { Trophy } from "lucide-react"

interface MatchCardProps {
  match: Match
  teams: Team[]
  isAdmin?: boolean
  isMobile?: boolean
  onEdit?: (match: Match) => void
}

interface TeamRowProps {
  team: Team | null
  score: number | null
  isWinner: boolean
  isMobile?: boolean
}

function TeamRow({ team, score, isWinner, isMobile = false }: TeamRowProps) {
  if (!team) return <div className="h-6"></div>

  return (
    <div className={`flex items-center justify-between ${isWinner ? "font-bold" : ""}`}>
      <div className="flex items-center space-x-2 overflow-hidden">
        <div className="team-emoji flex-shrink-0">{team.logoUrl}</div>
        <span className="truncate max-w-[120px] sm:max-w-[150px]">{team.name}</span>
        {isWinner && <Trophy className="h-4 w-4 text-tournament-gold flex-shrink-0" />}
      </div>
      <div className={`${isMobile ? "text-base" : "text-sm"} font-mono ${score !== null ? "text-tournament-gold" : "text-gray-500"}`}>
        {score !== null ? score : "-"}
      </div>
    </div>
  )
}

export function MatchCard({ match, teams, isAdmin = false, isMobile = false, onEdit }: MatchCardProps) {
  const team1 = getTeamById(teams, match.team1Id)
  const team2 = getTeamById(teams, match.team2Id)

  const handleClick = () => {
    if (isAdmin && onEdit) {
      onEdit(match)
    }
  }

  // Determine match status class
  const statusClass = match.status || (match.played ? "completed" : "upcoming")

  return (
    <div
      className={`match-card p-3 mb-4 ${statusClass} ${isAdmin ? "cursor-pointer hover:scale-105 active:scale-100" : ""} ${isMobile ? "touch-manipulation" : ""}`}
      onClick={handleClick}
    >
      <div className="text-xs text-tournament-gold mb-2 flex justify-between items-center">
        <span>{formatMatchDate(match.date)}</span>
        {match.status === "in-progress" && (
          <span className="bg-tournament-gold/20 text-tournament-gold text-xs px-2 py-0.5 rounded-full">Live</span>
        )}
      </div>

      <div className="space-y-2">
        <TeamRow team={team1} score={match.team1Score} isWinner={isWinner(match, match.team1Id)} isMobile={isMobile} />

        <div className="border-b border-tournament-gold/30 my-2"></div>

        <TeamRow team={team2} score={match.team2Score} isWinner={isWinner(match, match.team2Id)} isMobile={isMobile} />
      </div>

      {!team1 && !team2 && <div className="text-center text-tournament-gold/50 py-2">Awaiting teams</div>}
    </div>
  )
}

