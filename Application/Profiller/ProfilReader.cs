using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiller
{
    public class ProfilReader : IProfilReader
    {
        private readonly DataContext _context;
        private readonly IKullaniciErisimi _kullaniciErisimi;
        public ProfilReader(DataContext context, IKullaniciErisimi kullaniciErisimi)
        {
            _kullaniciErisimi = kullaniciErisimi;
            _context = context;
        }

        public async Task<Profil> ReadProfil(string kullaniciAdi)
        {
            var kullanici = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _kullaniciErisimi.GetCurrentUserName());

            if (kullanici == null)
                throw new RestException(HttpStatusCode.NotFound, new { Kullanici = "Bulunamadı" });

            var etkinKullanici = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _kullaniciErisimi.GetCurrentUserName());

            var profil = new Profil
            {
                DisplayName = kullanici.DisplayName,
                UserName = kullanici.UserName,
                Image = kullanici.Resimler.FirstOrDefault(x => x.AnaResimMi)?.Url,
                Resimler = kullanici.Resimler,
                Bio = kullanici.Bio,
                TakipciSayisi = kullanici.Takipciler.Count(),
                TakipEdilenSayisi = kullanici.TakipEdilenler.Count()
            };

            if (etkinKullanici.TakipEdilenler.Any(x => x.HedefId == kullanici.Id))
                profil.TakipEdildiMi = true;

            return profil;
        }
    }
}