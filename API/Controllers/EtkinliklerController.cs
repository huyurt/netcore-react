using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Etkinlikler;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class EtkinliklerController : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<List<EtkinlikDto>>> Listele()
        {
            return await Mediator.Send(new Listele.Query());
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<EtkinlikDto>> Detaylar(Guid id)
        {
            return await Mediator.Send(new Detaylar.Query { Id = id });
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Olustur([FromBody]Olustur.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpPut("{id}")]
        [Authorize(Policy = "EtkinlikYayinladiMi")]
        public async Task<ActionResult<Unit>> Duzenle(Guid id, [FromBody]Duzenle.Command command)
        {
            command.Id = id;
            return await Mediator.Send(command);
        }

        [HttpDelete("{id}")]
        [Authorize(Policy = "EtkinlikYayinladiMi")]
        public async Task<ActionResult<Unit>> Sil(Guid id)
        {
            return await Mediator.Send(new Sil.Command { Id = id });
        }

        [HttpPost("{id}/katil")]
        public async Task<ActionResult<Unit>> Katil(Guid id)
        {
            return await Mediator.Send(new Katil.Command { Id = id });
        }

        [HttpDelete("{id}/katil")]
        public async Task<ActionResult<Unit>> Ayril(Guid id)
        {
            return await Mediator.Send(new Ayril.Command { Id = id });
        }
    }
}