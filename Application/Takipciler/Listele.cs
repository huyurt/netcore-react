using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Profiller;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Takipciler
{
    public class Listele
    {
        public class Query : IRequest<List<Profil>>
        {
            public string KullaniciAdi { get; set; }
            public string Predicate { get; set; }
        }

        public class Handler : IRequestHandler<Query, List<Profil>>
        {
            private readonly DataContext _context;
            private readonly IProfilReader _profilReader;
            public Handler(DataContext context, IProfilReader profilReader)
            {
                _profilReader = profilReader;
                _context = context;
            }

            public async Task<List<Profil>> Handle(Query request, CancellationToken cancellationToken)
            {
                var queryable = _context.TakipEdilenler.AsQueryable();

                var kullaniciTakibi = new List<KullaniciTakibi>();
                var profil = new List<Profil>();

                switch (request.Predicate)
                {
                    case "takipciler":
                        {
                            kullaniciTakibi = await queryable.Where(x => x.Hedef.UserName == request.KullaniciAdi).ToListAsync();

                            foreach (var takipci in kullaniciTakibi)
                            {
                                profil.Add(await _profilReader.ReadProfil(takipci.Gozlemci.UserName));
                            }
                        }
                        break;
                    case "takipedilen":
                        {
                            kullaniciTakibi = await queryable.Where(x => x.Gozlemci.UserName == request.KullaniciAdi).ToListAsync();

                            foreach (var takipci in kullaniciTakibi)
                            {
                                profil.Add(await _profilReader.ReadProfil(takipci.Hedef.UserName));
                            }
                        }
                        break;
                }

                return profil;
            }
        }
    }
}