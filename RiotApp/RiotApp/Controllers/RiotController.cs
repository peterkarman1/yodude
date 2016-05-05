using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Http;
using RiotApp.Models;

namespace RiotApp.Controllers
{
    public class RiotController : ApiController
    {
        private readonly ApiClient _client = new ApiClient();
        private const string Key = "";

        private readonly string[] _regions = {"na","na1","jp","ru"};
        private string _replaceable = "replacemehomie";

        [HttpGet]
        public string GetMasteryInfo(string summonerId, string championId)
        {
            var url = $"https://na.api.pvp.net/championmastery/location/{_replaceable}/player/{summonerId}/champion/{championId}?api_key={Key}";
            return CycleThroughRegionsAndReturnFirstResult(url);
        }

        [HttpGet]
        public string GetSummonerInfo(string summonerName)
        {
            string formattedSummoner = summonerName.ToLower().Replace(" ", "").Trim();
            var url = $"https://na.api.pvp.net/api/lol/{_replaceable}/v1.4/summoner/by-name/{formattedSummoner}?api_key={Key}";
            return CycleThroughRegionsAndReturnFirstResult(url);
        }

        [HttpGet]
        public string GetAllMasteryInfo(string summonerId)
        {
            var url = $"https://na.api.pvp.net/championmastery/location/{_replaceable}/player/{summonerId}/champions?api_key={Key}";
            return CycleThroughRegionsAndReturnFirstResult(url);
        }

        [HttpGet]
        public string GetAllChamps()
        {
            var url = $"https://na.api.pvp.net/api/lol/static-data/{_replaceable}/v1.2/champion?api_key={Key}";
            return CycleThroughRegionsAndReturnFirstResult(url);
        }

        [HttpGet]
        public string GetSpecificChamp(string championId)
        {
            var url = $"https://na.api.pvp.net/api/lol/static-data/{_replaceable}/v1.2/champion/{championId}?api_key={Key}&champData=all";
            return CycleThroughRegionsAndReturnFirstResult(url);
        }

        [HttpGet]
        public System.Web.Mvc.ActionResult CheckSummoner(string summonerName) 
        {
            return null;
        }

        private string CycleThroughRegionsAndReturnFirstResult(string url)
        {
            var model = "";
            foreach (var region in _regions)
            {
                var replacedurl = url.Replace(_replaceable, region);
                var result = _client.GetAsync(replacedurl).Result;
                if (!string.IsNullOrWhiteSpace(result))
                {
                    model = result;
                    break;
                }
            }

            return model;
        }
    }
}
