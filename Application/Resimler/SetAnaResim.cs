using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Resimler
{
    public class SetAnaResim
    {
        public class Command : IRequest
        {
            public string Id { get; set; }
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
                var kullanici = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _kullaniciErisimi.GetCurrentUserName());

                var resim = kullanici.Resimler.FirstOrDefault(x => x.Id == request.Id);

                if (resim == null)
                    throw new RestException(HttpStatusCode.NotFound, new { Resim = "Bulunamadı" });

                var currentMain = kullanici.Resimler.FirstOrDefault(x => x.AnaResimMi);
                currentMain.AnaResimMi = false;
                resim.AnaResimMi = true;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Etkinlik kaydedilirken sorun oluştu.");
            }
        }
    }
}