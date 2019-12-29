using System.Threading.Tasks;
using Application.Resimler;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ResimlerController : BaseController
    {
        [HttpPost]
        public async Task<ActionResult<Resim>> Ekle([FromBody]Ekle.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpDelete]
        public async Task<ActionResult<Unit>> Sil(string id)
        {
            return await Mediator.Send(new Sil.Command { Id = id });
        }

        [HttpPost("{id}/setmain")]
        public async Task<ActionResult<Unit>> SetMain(string id)
        {
            return await Mediator.Send(new SetAnaResim.Command { Id = id });
        }
    }
}