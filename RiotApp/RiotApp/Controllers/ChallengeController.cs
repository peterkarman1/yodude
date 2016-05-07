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
    }
}