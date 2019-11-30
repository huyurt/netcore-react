using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Etkinlikler
{
    public class Duzenle
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Baslik { get; set; }
            public string Aciklama { get; set; }
            public string Kategori { get; set; }
            public DateTime? Tarih { get; set; }
            public string Sehir { get; set; }
            public string Mekan { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Baslik).NotEmpty();
                RuleFor(x => x.Aciklama).NotEmpty();
                RuleFor(x => x.Kategori).NotEmpty();
                RuleFor(x => x.Tarih).NotEmpty();
                RuleFor(x => x.Sehir).NotEmpty();
                RuleFor(x => x.Mekan).NotEmpty();
            }
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
                var etkinlik = await _context.Etkinlikler.FindAsync(request.Id);

                if (etkinlik == null)
                    throw new RestException(HttpStatusCode.NotFound, new { etkinlik = "Bulunamadı" });

                etkinlik.Baslik = request.Baslik ?? etkinlik.Baslik;
                etkinlik.Aciklama = request.Aciklama ?? etkinlik.Aciklama;
                etkinlik.Kategori = request.Kategori ?? etkinlik.Kategori;
                etkinlik.Tarih = request.Tarih ?? etkinlik.Tarih;
                etkinlik.Sehir = request.Sehir ?? etkinlik.Sehir;
                etkinlik.Mekan = request.Mekan ?? etkinlik.Mekan;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Etkinlik kaydedilirken sorun oluştu.");
            }
        }
    }
}