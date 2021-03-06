using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
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
            private readonly IKullaniciErisimi _kullaniciErisimi;
            public Handler(DataContext context, IKullaniciErisimi kullaniciErisimi)
            {
                _kullaniciErisimi = kullaniciErisimi;
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

                var kullanici = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _kullaniciErisimi.GetCurrentUserName());

                var katilimci = new KullaniciEtkinlik
                {
                    AppKullanici = kullanici,
                    Etkinlik = etkinlik,
                    YayinlandiMi = true,
                    KatilmaTarihi = DateTime.Now
                };

                _context.KullaniciEtkinlikler.Add(katilimci);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Etkinlik kaydedilirken sorun oluştu.");
            }
        }
    }
}