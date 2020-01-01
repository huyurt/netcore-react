using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Application.Yorumlar;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR
{
    public class ChatHub : Hub
    {
        private readonly IMediator _mediator;
        public ChatHub(IMediator mediator)
        {
            _mediator = mediator;
        }

        public async Task YorumGonder(Olustur.Command command)
        {
            var kullaniciAdi = Context.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;

            command.KullaniciAdi = kullaniciAdi;

            var yorum = await _mediator.Send(command);

            await Clients.All.SendAsync("YorumYapildi", yorum);
        }
    }
}