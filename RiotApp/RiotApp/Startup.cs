using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(RiotApp.Startup))]
namespace RiotApp
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
