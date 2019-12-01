using System.Threading.Tasks;
using Application.Kullanici;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class KullaniciController : BaseController
    {
        [AllowAnonymous]
        [HttpPost("giris")]
        public async Task<ActionResult<Kullanici>> Login(Login.Query query)
        {
            return await Mediator.Send(query);
        }

        [AllowAnonymous]
        [HttpPost("kayit")]
        public async Task<ActionResult<Kullanici>> Register(Register.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpGet]
        public async Task<ActionResult<Kullanici>> CurrentUser()
        {
            return await Mediator.Send(new CurrentUser.Query());
        }
    }
}