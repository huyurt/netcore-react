using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Etkinlikler
{
    public class Listele
    {
        public class EtkinlikEnvelope
        {
            public List<EtkinlikDto> Etkinlikler { get; set; }
            public int EtkinlikSayisi { get; set; }
        }

        public class Query : IRequest<EtkinlikEnvelope>
        {
            public Query(int? limit, int? offset, bool isGoing, bool isHost, DateTime? startDate)
            {
                Limit = limit;
                Offset = offset;
                IsGoing = isGoing;
                IsHost = isHost;
                StartDate = startDate ?? DateTime.Now;
            }
            public int? Limit { get; set; }
            public int? Offset { get; set; }
            public bool IsGoing { get; set; }
            public bool IsHost { get; set; }
            public DateTime? StartDate { get; set; }
        }

        public class Handler : IRequestHandler<Query, EtkinlikEnvelope>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IKullaniciErisimi _kullaniciErisimi;
            public Handler(DataContext context, IMapper mapper, IKullaniciErisimi kullaniciErisimi)
            {
                _kullaniciErisimi = kullaniciErisimi;
                _mapper = mapper;
                _context = context;
            }

            public async Task<EtkinlikEnvelope> Handle(Query request, CancellationToken cancellationToken)
            {
                var queryable = _context.Etkinlikler
                    .Where(x => x.Tarih >= request.StartDate)
                    .OrderBy(x => x.Tarih)
                    .AsQueryable();

                if (request.IsGoing && !request.IsHost)
                {
                    queryable = queryable.Where(x => x.KullaniciEtkinlikler.Any(a => a.AppKullanici.UserName == _kullaniciErisimi.GetCurrentUserName()));
                }

                if (request.IsHost && !request.IsGoing)
                {
                    queryable = queryable.Where(x => x.KullaniciEtkinlikler.Any(a => a.AppKullanici.UserName == _kullaniciErisimi.GetCurrentUserName() && a.YayinlandiMi));
                }

                var etkinlikler = await queryable
                    .Skip(request.Offset ?? 0)
                    .Take(request.Limit ?? 3).ToListAsync();

                return new EtkinlikEnvelope
                {
                    Etkinlikler = _mapper.Map<List<Etkinlik>, List<EtkinlikDto>>(etkinlikler),
                    EtkinlikSayisi = queryable.Count()
                };
            }
        }
    }
}