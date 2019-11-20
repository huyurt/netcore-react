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
        public async Task<ActionResult<List<Etkinlik>>> List(){
            return await _mediator.Send(new List.Query());
        }
    }
}