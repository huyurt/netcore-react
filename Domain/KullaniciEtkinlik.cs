using System;

namespace Domain
{
    public class KullaniciEtkinlik
    {
        public string AppKullaniciId { get; set; }
        public virtual AppUser AppKullanici { get; set; }
        public Guid EtkinlikId { get; set; }
        public virtual Etkinlik Etkinlik { get; set; }
        public DateTime KatilmaTarihi { get; set; }
        public bool YayinlandiMi { get; set; }
    }
}