using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Mvc;

namespace RiotApp.Controllers
{
    public class ChampionMasteryController : ApiController
    {
        private readonly ApiClient _client = new ApiClient();
        private const string _key = "somekey";

        
        public JsonResult GetMasteryInfo(string summonerName, string championId)
        {
            var url =
        }

        
    }
}
