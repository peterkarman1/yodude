namespace RiotApp.Models
{
    public class ChampionMastery
    {
        public long PlayerId { get; set; }
        public int ChampionId { get; set; }
        public int ChampionPoints { get; set; }
        public int ChampionLevel { get; set; }
        public int ChampionPointsUntilNextLevel { get; set; }
        public int ChampionPointsSinceLastLevel { get; set; }
        public string HighestGrade { get; set; }
        public bool ChestGranted { get; set; }
        public string LastPlayTime { get; set; }
    }
}