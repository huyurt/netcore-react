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
        public async Task<ActionResult<List<Etkinlik>>> Listele()
        {
            return await Mediator.Send(new Listele.Query());
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<Etkinlik>> Detaylar(Guid id)
        {
            return await Mediator.Send(new Detaylar.Query { Id = id });
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Olustur([FromBody]Olustur.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Duzenle(Guid id, [FromBody]Duzenle.Command command)
        {
            command.Id = id;
            return await Mediator.Send(command);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Sil(Guid id)
        {
            return await Mediator.Send(new Sil.Command { Id = id });
        }
    }
}