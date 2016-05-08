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
        public ActionResult Submit(ChallengeSubmission submission)
        {
            return new HttpStatusCodeResult(500);
        }

        [HttpGet]
        public ActionResult GetChallenges(int userId)
        {
            List<ChallengeSubmission> challenges = GetChallenges();
            var a = Json(new { challenges }, JsonRequestBehavior.AllowGet);
            return a;
        }

        private List<ChallengeSubmission> GetChallenges()
        {
            return new List<ChallengeSubmission>
            {
                GetPlayer1Model(0),
                GetPlayer2Model(1)
            };
        }

        //Mock data for challenge first to 5000 points
        [HttpPost]
        public ActionResult GetChallengeProgress(int challengeId)
        {
            ChallengeSubmission player1 = GetPlayer1Model(challengeId);
            ChallengeSubmission player2 = GetPlayer2Model(challengeId);
            return Json(new {player1 = player1, player2 = player2, challengeComplete = challengeId == 1 , championId = challengeId == 1 ? 266 : 267});
        }

        private ChallengeSubmission GetPlayer2Model(int id)
        {
            return new ChallengeSubmission
            {
                EndDate = id == 1 ? DateTime.Now : DateTime.Today.AddDays(1),
                ChampionId = id == 1 ? 12 : 32,
                SummonerId = 1
            };
        }

        private ChallengeSubmission GetPlayer1Model(int id)
        {
            return new ChallengeSubmission
            {
                EndDate = id == 1 ? DateTime.Now : DateTime.Today.AddDays(1),
                ChampionId = id == 1 ? 12 : 32,
                SummonerId = 1
            };
        }
    }
}