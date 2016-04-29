using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using RiotApp.Models;

namespace RiotApp.Controllers
{
    public class MockDataController : ApiController
    {
        private readonly MockRepository _mockRepository = new MockRepository();

        [HttpGet]
        public Login GetLogin(string userName)
        {
            return _mockRepository.GetLogin(userName);
        }

        [HttpGet]
        public CurrentChallenge GetMockChallenge()
        {
            return _mockRepository.GetChallenge();
        }
    }
}
