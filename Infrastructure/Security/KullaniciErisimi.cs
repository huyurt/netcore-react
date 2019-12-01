using System.Linq;
using System.Security.Claims;
using Application.Interfaces;
using Microsoft.AspNetCore.Http;

namespace Infrastructure.Security
{
    public class KullaniciErisimi : IKullaniciErisimi
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public KullaniciErisimi(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public string GetCurrentUserName()
        {
            var username = _httpContextAccessor.HttpContext.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;
            return username;
        }
    }
}