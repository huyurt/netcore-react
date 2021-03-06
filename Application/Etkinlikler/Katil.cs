using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Etkinlikler
{
    public class Katil
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IKullaniciErisimi _kullaniciErisimi;
            public Handler(DataContext context, IKullaniciErisimi kullaniciErisimi)
            {
                _kullaniciErisimi = kullaniciErisimi;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var etkinlik = await _context.Etkinlikler.FindAsync(request.Id);

                if (etkinlik == null)
                    throw new RestException(HttpStatusCode.NotFound, new { Etkinlik = "Etkinlik bulunamadı" });

                var kullanici = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _kullaniciErisimi.GetCurrentUserName());

                var katilimci = await _context.KullaniciEtkinlikler.SingleOrDefaultAsync(x => x.EtkinlikId == etkinlik.Id && x.AppKullaniciId == kullanici.Id);

                if (katilimci != null)
                    throw new RestException(HttpStatusCode.BadRequest, new { Katilimci = "Bu etkinliğe zaten katılınmış" });

                katilimci = new KullaniciEtkinlik
                {
                    Etkinlik = etkinlik,
                    AppKullanici = kullanici,
                    YayinlandiMi = false,
                    KatilmaTarihi = DateTime.Now
                };

                _context.KullaniciEtkinlikler.Add(katilimci);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Etkinlik kaydedilirken sorun oluştu.");
            }
        }
    }
}