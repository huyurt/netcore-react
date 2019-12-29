using Application.Resimler;
using Microsoft.AspNetCore.Http;

namespace Application.Interfaces
{
    public interface IResimErisimi
    {
         PhotoUploadResult ResimEkle(IFormFile file);
         string ResimSil(string publicId);
    }
}