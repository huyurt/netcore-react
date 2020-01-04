
using System.Threading.Tasks;

namespace Application.Profiller
{
    public interface IProfilReader
    {
        Task<Profil> ReadProfil(string kullaniciAdi);
    }
}