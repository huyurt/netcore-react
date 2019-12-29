using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Resimler
{
    public class Ekle
    {
        public class Command : IRequest<Resim>
        {
            public IFormFile File { get; set; }
        }

        public class Handler : IRequestHandler<Command, Resim>
        {
            private readonly DataContext _context;
            private readonly IKullaniciErisimi _kullaniciErisimi;
            private readonly IResimErisimi _resimErisimi;
            public Handler(DataContext context, IKullaniciErisimi kullaniciErisimi, IResimErisimi resimErisimi)
            {
                _resimErisimi = resimErisimi;
                _kullaniciErisimi = kullaniciErisimi;
                _context = context;
            }

            public async Task<Resim> Handle(Command request, CancellationToken cancellationToken)
            {
                var photoUploadResult = _resimErisimi.ResimEkle(request.File);

                var kullanici = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _kullaniciErisimi.GetCurrentUserName());

                var resim = new Resim
                {
                    Id = photoUploadResult.PublicId,
                    Url = photoUploadResult.Url
                };

                if (!kullanici.Resimler.Any(x => x.AnaResimMi))
                    resim.AnaResimMi = true;

                kullanici.Resimler.Add(resim);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return resim;

                throw new Exception("Resim kaydedilirken sorun oluştu.");
            }
        }
    }
}