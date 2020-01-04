using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Takipciler
{
    public class Sil
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

                if (takipEdilen == null)
                    throw new RestException(HttpStatusCode.BadRequest, new { Kullanici = "Bu kullanıcıyı takip etmiyorsunuz." });

                if (takipEdilen != null)
                    _context.TakipEdilenler.Remove(takipEdilen);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Etkinlik kaydedilirken sorun oluştu.");
            }
        }
    }
}