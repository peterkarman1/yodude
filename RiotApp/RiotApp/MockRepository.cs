using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using RiotApp.Models;

namespace RiotApp
{
    public class MockRepository
    {
        private readonly Login _login1 = new Login {SummonerName = "Frios", UserName = "Friospwnzu"};
        private readonly Login _login2 = new Login {SummonerName = "ThepeteK", UserName = "Thepete123" };

        public Login GetLogin(string userName)
        {
            return userName.ToLower() == "thepete123" ? _login2 : _login1;
        }

        public CurrentChallenge GetChallenge()
        {
            return new CurrentChallenge
            {
                ChampionId = "22",
                SummonerOne = _login1,
                SummonerTwo = _login2,
                SummonerOneMasteryLevel = 1231324,
                SummonerTwoMasteryLevel = 324235
            };
        }
    }
}