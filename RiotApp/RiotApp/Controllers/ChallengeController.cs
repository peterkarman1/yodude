using System;
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
            return submission.Points > 10000 ? new HttpStatusCodeResult(500) : new HttpStatusCodeResult(200);
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
                Points = id == 1 ? 4587 : 2300,
                SummonerId = 1
            };
        }

        private ChallengeSubmission GetPlayer1Model(int id)
        {
            return new ChallengeSubmission
            {
                EndDate = id == 1 ? DateTime.Now : DateTime.Today.AddDays(1),
                Points = id == 1 ? 5000 : 2345,
                SummonerId = 1
            };
        }
    }
}