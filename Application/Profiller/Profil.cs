using System.Collections.Generic;
using Domain;
using Newtonsoft.Json;

namespace Application.Profiller
{
    public class Profil
    {
        public string DisplayName { get; set; }
        public string UserName { get; set; }
        public string Image { get; set; }
        public string Bio { get; set; }

        [JsonProperty("takipediliyor")]
        public bool TakipEdildiMi { get; set; }
        public int TakipciSayisi { get; set; }
        public int TakipEdilenSayisi { get; set; }
        public ICollection<Resim> Resimler { get; set; }
    }
}