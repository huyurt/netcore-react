using System.Threading.Tasks;
using Application.Profiller;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProfilController : BaseController
    {
        [HttpGet("{username}")]
        public async Task<ActionResult<Profil>> Get(string username)
        {
            return await Mediator.Send(new Detaylar.Query { UserName = username });
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Edit(Edit.Command command)
        {
            return await Mediator.Send(command);
        }
    }
}