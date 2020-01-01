using System;
using System.Collections.Generic;

namespace Domain
{
    public class Etkinlik
    {
        public Guid Id { get; set; }
        public string Baslik { get; set; }
        public string Aciklama { get; set; }
        public string Kategori { get; set; }
        public DateTime Tarih { get; set; }
        public string Sehir { get; set; }
        public string Mekan { get; set; }
        public virtual ICollection<KullaniciEtkinlik> KullaniciEtkinlikler { get; set; }
        public virtual ICollection<Yorum> Yorumlar { get; set; }
    }
}