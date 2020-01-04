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

namespace Application.Takipciler
{
    public class Ekle
    {
        public class Command : IRequest
        {
            public string KullaniciAdi { get; set; }
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
                var gozlemci = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _kullaniciErisimi.GetCurrentUserName());

                var hedef = await _context.Users.SingleOrDefaultAsync(x => x.UserName == request.KullaniciAdi);

                if (hedef == null)
                    throw new RestException(HttpStatusCode.NotFound, new { Kullanici = "Bulunamadı" });

                var takipEdilen = await _context.TakipEdilenler.SingleOrDefaultAsync(x => x.GozlemciId == gozlemci.Id && x.HedefId == hedef.Id);

                if (takipEdilen != null)
                    throw new RestException(HttpStatusCode.BadRequest, new { Kullanici = "Bu kullanıcıyı zaten takip ediyorsunuz." });

                if (takipEdilen == null)
                {
                    takipEdilen = new KullaniciTakibi
                    {
                        Gozlemci = gozlemci,
                        Hedef = hedef
                    };

                    _context.TakipEdilenler.Add(takipEdilen);
                }

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Etkinlik kaydedilirken sorun oluştu.");
            }
        }
    }
}