using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }
        public string Bio { get; set; }
        public virtual ICollection<KullaniciEtkinlik> KullaniciEtkinlikler { get; set; }
        public virtual ICollection<Resim> Resimler { get; set; }
        public virtual ICollection<KullaniciTakibi> TakipEdilenler { get; set; }
        public virtual ICollection<KullaniciTakibi> Takipciler { get; set; }
    }
}