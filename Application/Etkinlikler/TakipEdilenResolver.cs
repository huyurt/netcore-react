using System.Linq;
using Application.Interfaces;
using AutoMapper;
using Domain;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Etkinlikler
{
    public class TakipEdilenResolver : IValueResolver<KullaniciEtkinlik, KatilimciDto, bool>
    {
        private readonly DataContext _context;
        private readonly IKullaniciErisimi _kullaniciErisimi;
        public TakipEdilenResolver(DataContext context, IKullaniciErisimi kullaniciErisimi)
        {
            _kullaniciErisimi = kullaniciErisimi;
            _context = context;
        }

        public bool Resolve(KullaniciEtkinlik source, KatilimciDto destination, bool destMember, ResolutionContext context)
        {
            var etkinKullanici = _context.Users.SingleOrDefaultAsync(x => x.UserName == _kullaniciErisimi.GetCurrentUserName()).Result;

            if (etkinKullanici.TakipEdilenler.Any(x => x.HedefId == source.AppKullaniciId))
                return true;

            return false;
        }
    }
}