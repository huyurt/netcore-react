using System.Threading.Tasks;
using Application.Kullanici;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
    public class KullaniciController : BaseController
    {
        [HttpPost("login")]
        public async Task<ActionResult<Kullanici>> Login(Login.Query query)
        {
            return await Mediator.Send(query);
        }
    }
}