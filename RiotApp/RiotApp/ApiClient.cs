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
        public  async Task<string> GetAsync(string url)
        {
            var responseObject = "";
            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                HttpResponseMessage response = client.GetAsync(new Uri(url)).Result;
                if (response.IsSuccessStatusCode)
                {
                    responseObject= response.Content.ReadAsStringAsync().Result;
                    
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