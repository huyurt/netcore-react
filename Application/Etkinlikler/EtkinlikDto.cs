using System;
using System.Collections.Generic;
using Application.Yorumlar;
using Newtonsoft.Json;

namespace Application.Etkinlikler
{
    public class EtkinlikDto
    {
        public Guid Id { get; set; }
        public string Baslik { get; set; }
        public string Aciklama { get; set; }
        public string Kategori { get; set; }
        public DateTime Tarih { get; set; }
        public string Sehir { get; set; }
        public string Mekan { get; set; }

        [JsonProperty("Katilimcilar")]
        public ICollection<KatilimciDto> KullaniciEtkinlikler { get; set; }
        public ICollection<YorumDto> Yorumlar { get; set; }
    }
}