using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web;
using Microsoft.Owin.Security.Provider;
using Newtonsoft.Json;

namespace RiotApp
{
    public class ApiClient
    {
        public  async Task<T> GetAsync<T>(string url) where T : class, new()
        {
            var responseObject = new T();
            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                HttpResponseMessage response = await client.GetAsync(url);
                if (response.IsSuccessStatusCode)
                {
                    string jsonString = await response.Content.ReadAsStringAsync();
                    responseObject = JsonConvert.DeserializeObject<T>(jsonString);
                }
                else
                {
                    responseObject = null;
                }
            }
            return responseObject;
        }
    }
}