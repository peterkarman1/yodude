using System;

namespace RiotApp.Models
{
    public class Challenge
    {
        public int ChallengeId { get; set; }
        public long ChallengerId { get; set; }
        public string ChallengerName { get; set; }
        public int ChallengerStartPoints { get; set; }
        public int ChallengerCurrentPoints { get; set; }
        public long ChallengeeId { get; set; }
        public string ChallengeeName { get; set; }
        public int ChallengeeStartPoints { get; set; }
        public int ChallengeeCurrentPoints { get; set; }
        public int ChampionId { get; set; }
        public string ChampionName { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}