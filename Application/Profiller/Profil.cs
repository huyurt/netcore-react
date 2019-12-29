using System.Collections.Generic;
using Domain;

namespace Application.Profiller
{
    public class Profil
    {
        public string DisplayName { get; set; }
        public string UserName { get; set; }
        public string Image { get; set; }
        public string Bio { get; set; }
        public ICollection<Resim> Resimler { get; set; }
    }
}