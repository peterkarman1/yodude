using System;
using System.Collections.Generic;
using System.Web.Mvc;
using RiotApp.Models;

namespace RiotApp.Controllers
{
    public class ChallengeController : Controller
    {
        [HttpGet]
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Submit(Challenge submission)
        {
            return new HttpStatusCodeResult(500);
        }

        [HttpGet]
        public ActionResult GetChallenges(int userId)
        {
            List<Challenge> challenges = GetChallenges();
            var a = Json(new { challenges }, JsonRequestBehavior.AllowGet);
            return a;
        }

        private List<Challenge> GetChallenges()
        {
            // Get mock data for two challenges
            return new List<Challenge>
            {
                new Challenge
                {
                    ChallengeId = 1,
                    ChampionId = 99,
                    ChampionName = "Lux",//TODO API call this
                    EndDate = DateTime.Today.AddDays(-2),
                    StartDate = DateTime.Today.AddDays(-5),
                    ChallengerId = 49064382,
                    ChallengerName = "ThePeteK",//TODO API call this
                    ChallengerStartPoints = 0,
                    ChallengerCurrentPoints = 2000,//TODO API call this
                    ChallengeeId = 19320017,
                    ChallengeeName = "Frios",//TODO API call this
                    ChallengeeStartPoints = 5000,
                    ChallengeeCurrentPoints = 15000//TODO API call this
                },
                new Challenge
                {
                    ChallengeId = 1,
                    ChampionId = 53,
                    ChampionName = "Blitzcrank",//TODO API call this
                    EndDate = DateTime.Today.AddDays(-1),
                    StartDate = DateTime.Today.AddDays(-4),
                    ChallengerId = 49064382,
                    ChallengerName = "ThePeteK",//TODO API call this
                    ChallengerStartPoints = 0,
                    ChallengerCurrentPoints = 2000,//TODO API call this
                    ChallengeeId = 19320017,
                    ChallengeeName = "Frios",//TODO API call this
                    ChallengeeStartPoints = 0,
                    ChallengeeCurrentPoints = 1500//TODO API call this
                },
                new Challenge
                {
                    ChallengeId = 2,
                    ChampionId = 7,
                    ChampionName = "LeBlanc",//TODO API call this
                    EndDate = DateTime.Today.AddDays(3),
                    StartDate = DateTime.Today,
                    ChallengerId = 19320017,
                    ChallengerName = "Frios",//TODO API call this
                    ChallengerStartPoints = 10000,
                    ChallengerCurrentPoints = 10000,//TODO API call this
                    ChallengeeId = 49064382,
                    ChallengeeName = "ThePeteK",//TODO API call this
                    ChallengeeStartPoints = 1000,
                    ChallengeeCurrentPoints = 1000//TODO API call this
                }
            };
        }
    }
}