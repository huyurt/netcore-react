using System.Linq;
using AutoMapper;
using Domain;

namespace Application.Etkinlikler
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Etkinlik, EtkinlikDto>();
            CreateMap<KullaniciEtkinlik, KatilimciDto>()
                .ForMember(d => d.UserName, o => o.MapFrom(s => s.AppKullanici.UserName))
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppKullanici.DisplayName))
                .ForMember(d => d.Image, o => o.MapFrom(s => s.AppKullanici.Resimler.FirstOrDefault(x => x.AnaResimMi).Url))
                .ForMember(d => d.TakipEdiliyor, o => o.MapFrom<TakipEdilenResolver>());
        }
    }
}