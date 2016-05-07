using System;

namespace RiotApp.Models
{
    public class ChallengeSubmission
    {
        public long SummonerId { get; set; }
        public int Points { get; set; }
        public DateTime EndDate { get; set; }
    }
}