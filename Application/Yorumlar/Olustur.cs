using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Yorumlar
{
    public class Olustur
    {
        public class Command : IRequest<YorumDto>
        {
            public string Icerik { get; set; }
            public Guid EtkinlikId { get; set; }
            public string KullaniciAdi { get; set; }
        }

        public class Handler : IRequestHandler<Command, YorumDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<YorumDto> Handle(Command request, CancellationToken cancellationToken)
            {
                var etkinlik = await _context.Etkinlikler.FindAsync(request.EtkinlikId);

                if (etkinlik == null)
                    throw new RestException(HttpStatusCode.NotFound, new { Etkinlik = "Bulunamadı" });

                var kullanici = await _context.Users.SingleOrDefaultAsync(x => x.UserName == request.KullaniciAdi);

                var yorum = new Yorum
                {
                    Yazan = kullanici,
                    Etkinlik = etkinlik,
                    Icerik = request.Icerik,
                    YorumTarihi = DateTime.Now
                };

                etkinlik.Yorumlar.Add(yorum);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return _mapper.Map<YorumDto>(yorum);

                throw new Exception("Etkinlik kaydedilirken sorun oluştu.");
            }
        }
    }
}