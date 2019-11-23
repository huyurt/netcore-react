using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Etkinlikler
{
    public class Olustur
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Baslik { get; set; }
            public string Aciklama { get; set; }
            public string Kategori { get; set; }
            public DateTime Tarih { get; set; }
            public string Sehir { get; set; }
            public string Mekan { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var etkinlik = new Etkinlik
                {
                    Id = request.Id,
                    Baslik = request.Baslik,
                    Aciklama = request.Aciklama,
                    Kategori = request.Kategori,
                    Tarih = request.Tarih,
                    Sehir = request.Sehir,
                    Mekan = request.Mekan
                };

                _context.Etkinlikler.Add(etkinlik);
                
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Etkinlik kaydedilirken sorun oluştu.");
            }
        }
    }
}