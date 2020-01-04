using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Profiller;
using Application.Takipciler;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/profiller")]
    public class TakipciController : BaseController
    {
        [HttpPost("{kullaniciadi}/takip")]
        public async Task<ActionResult<Unit>> TakipEt(string kullaniciAdi)
        {
            return await Mediator.Send(new Ekle.Command { KullaniciAdi = kullaniciAdi });
        }

        [HttpDelete("{kullaniciadi}/takip")]
        public async Task<ActionResult<Unit>> TakibiBirak(string kullaniciAdi)
        {
            return await Mediator.Send(new Sil.Command { KullaniciAdi = kullaniciAdi });
        }

        [HttpGet("{kullaniciadi}/takip")]
        public async Task<ActionResult<List<Profil>>> TakipEdilenler(string kullaniciAdi, string predicate)
        {
            return await Mediator.Send(new Listele.Query { KullaniciAdi = kullaniciAdi, Predicate = predicate });
        }
    }
}