using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Mvc;
using RiotApp.Models;

namespace RiotApp.Controllers
{
    public class ChampionMasteryController : ApiController
    {
        private readonly ApiClient _client = new ApiClient();
        private const string _key = "somekey";
        private string[] _regions = {"na","jp","ru"};
        private string _replaceable = "replacemehomie";
        
        public ChampionMastery GetMasteryInfo(string summonerId, string championId)
        {
            var url = $"https://na.api.pvp.net/api/lol//championmastery/location/{_replaceable}/player/{summonerId}/champion/{championId}?api_key={_key}";
            return CycleThroughRegionsAndReturnFirstResult<ChampionMastery>(url);
        }

        public Summoner GetSummonerInfo(string summonerName)
        {
            string formattedSummoner = summonerName.ToLower().Replace(" ", "").Trim();
            var url = $"https://na.api.pvp.net/api/lol/{_replaceable}/v1.4/summoner/by-name/{formattedSummoner}";
            return CycleThroughRegionsAndReturnFirstResult<Summoner>(url);
        }

        private T CycleThroughRegionsAndReturnFirstResult<T>(string url) where T : class, new()
        {
            var model  = new T();
            foreach (var region in _regions)
            {
                var replacedurl = url.Replace(_replaceable, region);
                var result = _client.GetAsync<T>(url).Result;
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
