using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Profiller;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class EtkinlikListele
    {
        public class Query : IRequest<List<KullaniciEtkinlikDto>>
        {
            public string KullaniciAdi { get; set; }
            public string Predicate { get; set; }
        }

        public class Handler : IRequestHandler<Query, List<KullaniciEtkinlikDto>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<KullaniciEtkinlikDto>> Handle(Query request,
                CancellationToken cancellationToken)
            {
                var kullanici = await _context.Users.SingleOrDefaultAsync(x => x.UserName == request.KullaniciAdi);

                if (kullanici == null)
                    throw new RestException(HttpStatusCode.NotFound, new { Kullanici = "Bulunamadı" });

                var queryable = kullanici.KullaniciEtkinlikler
                    .OrderBy(a => a.Etkinlik.Tarih)
                    .AsQueryable();

                switch (request.Predicate)
                {
                    case "past":
                        queryable = queryable.Where(a => a.Etkinlik.Tarih <= DateTime.Now);
                        break;
                    case "hosting":
                        queryable = queryable.Where(a => a.YayinlandiMi);
                        break;
                    default:
                        queryable = queryable.Where(a => a.Etkinlik.Tarih >= DateTime.Now);
                        break;
                }

                var etkinlikler = queryable.ToList();
                var resultEtkinlikler = new List<KullaniciEtkinlikDto>();

                foreach (var etkinlik in etkinlikler)
                {
                    var kullaniciEtkinlik = new KullaniciEtkinlikDto
                    {
                        Id = etkinlik.Etkinlik.Id,
                        Baslik = etkinlik.Etkinlik.Baslik,
                        Kategori = etkinlik.Etkinlik.Kategori,
                        Tarih = etkinlik.Etkinlik.Tarih
                    };

                    resultEtkinlikler.Add(kullaniciEtkinlik);
                }

                return resultEtkinlikler;
            }
        }
    }
}