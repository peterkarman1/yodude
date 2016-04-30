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
        private const string Key = "somekey";
        private readonly string[] _regions = { "na", "jp", "ru" };
        private string _replaceable = "replacemehomie";

        [HttpGet]
        public List<ChampionMastery> GetMasteryInfo(string summonerId)
        {
            var url = $"https://na.api.pvp.net/api/lol/championmastery/location/{_replaceable}/player/{summonerId}/champions?api_key={Key}";
            return CycleThroughRegionsAndReturnFirstResult<List<ChampionMastery>>(url);
        }

        [HttpGet]
        public Summoner GetSummonerInfo(string summonerName)
        {
            string formattedSummoner = summonerName.ToLower().Replace(" ", "").Trim();
            var url = $"https://na.api.pvp.net/api/lol/{_replaceable}/v1.4/summoner/by-name/{formattedSummoner}?api_key={Key}";
            return CycleThroughRegionsAndReturnFirstResult<Summoner>(url);
        }

        [HttpGet]
        public IEnumerable<Champion> GetAllChamps()
        {
            var url = $"https://na.api.pvp.net/api/lol/static-data/{_replaceable}/v1.2/champion?api_key={Key}";
            return CycleThroughRegionsAndReturnFirstResult<List<Champion>>(url);
        }

        [HttpGet]
        public Champion GetSpecificChamp(string championId)
        {
            var url = $"https://na.api.pvp.net/api/lol/static-data/{_replaceable}/v1.2/champion/{championId}?api_key={Key}&champData=all";
            return CycleThroughRegionsAndReturnFirstResult<Champion>(url);
        }

        private T CycleThroughRegionsAndReturnFirstResult<T>(string url) where T : class, new()
        {
            var model  = new T();
            foreach (var region in _regions)
            {
                var replacedurl = url.Replace(_replaceable, region);
                var result = _client.GetAsync<T>(replacedurl).Result;
                if (result != null)
                {
                    model = result;
                    break;
                }
            }

            return model;
        }
    }
}
