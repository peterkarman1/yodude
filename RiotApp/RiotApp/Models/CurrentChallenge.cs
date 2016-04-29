using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RiotApp.Models
{
    public class CurrentChallenge
    {
        public Login SummonerOne{ get; set; }
        public Login SummonerTwo { get; set; }
        public long SummonerOneMasteryLevel { get; set; }
        public long SummonerTwoMasteryLevel { get; set; }
        public string ChampionId { get; set; }
    }
}