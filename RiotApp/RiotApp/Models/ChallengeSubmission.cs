using System;

namespace RiotApp.Models
{
    public class ChallengeSubmission
    {
        public long SummonerId { get; set; }
        public int ChampionId { get; set; }
        public DateTime EndDate { get; set; }
    }
}