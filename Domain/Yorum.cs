using System;

namespace Domain
{
    public class Yorum
    {
        public Guid Id { get; set; }
        public string Icerik { get; set; }
        public virtual AppUser Yazan { get; set; }
        public virtual Etkinlik Etkinlik { get; set; }
        public DateTime YorumTarihi { get; set; }
    }
}