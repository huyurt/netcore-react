using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Etkinlikler;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EtkinliklerController : ControllerBase
    {
        private readonly IMediator _mediator;
        public EtkinliklerController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<List<Etkinlik>>> Listele()
        {
            return await _mediator.Send(new Listele.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Etkinlik>> Detaylar(Guid id)
        {
            return await _mediator.Send(new Detaylar.Query { Id = id });
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Olustur([FromBody]Olustur.Command command)
        {
            return await _mediator.Send(command);
        }

        [HttpPost("{id}")]
        public async Task<ActionResult<Unit>> Duzenle(Guid id, [FromBody]Duzenle.Command command)
        {
            command.Id = id;
            return await _mediator.Send(command);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Sil(Guid id)
        {
            return await _mediator.Send(new Sil.Command { Id = id });
        }
    }
}