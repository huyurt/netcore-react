using System;

namespace Application.Yorumlar
{
    public class YorumDto
    {
        public Guid Id { get; set; }
        public string Icerik { get; set; }
        public DateTime Tarih { get; set; }
        public string KullaniciAdi { get; set; }
        public string DisplayName { get; set; }
        public string Resim { get; set; }
    }
}