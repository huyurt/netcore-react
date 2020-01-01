using System.Linq;
using AutoMapper;
using Domain;

namespace Application.Yorumlar
{
    public class MappingProfil : Profile
    {
        public MappingProfil()
        {
            CreateMap<Yorum, YorumDto>()
                .ForMember(d => d.KullaniciAdi, o => o.MapFrom(s => s.Yazan.UserName))
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.Yazan.DisplayName))
                .ForMember(d => d.Resim, o => o.MapFrom(s => s.Yazan.Resimler.FirstOrDefault(x => x.AnaResimMi).Url));
        }
    }
}