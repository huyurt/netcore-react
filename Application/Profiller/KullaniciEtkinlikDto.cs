using System;

namespace Application.Profiller
{
    public class KullaniciEtkinlikDto
    {
        public Guid Id { get; set; }
        public string Baslik { get; set; }
        public string Kategori { get; set; }
        public DateTime Tarih { get; set; }
    }
}