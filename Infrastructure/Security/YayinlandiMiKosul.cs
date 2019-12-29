using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Filters;
using Persistence;

namespace Infrastructure.Security
{
    public class YayinlandiMiKosul : IAuthorizationRequirement
    {

    }

    public class YayinlandiMiKosulHandler : AuthorizationHandler<YayinlandiMiKosul>
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly DataContext _context;
        public YayinlandiMiKosulHandler(IHttpContextAccessor httpContextAccessor, DataContext context)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, YayinlandiMiKosul requirement)
        {
            if (context.Resource is AuthorizationFilterContext authContext)
            {
                var currentUserName = _httpContextAccessor.HttpContext.User?.Claims?.SingleOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;

                var etkinlikId = Guid.Parse(authContext.RouteData.Values["id"].ToString());

                var etkinlik = _context.Etkinlikler.FindAsync(etkinlikId).Result;
              
                var host = etkinlik.KullaniciEtkinlikler.FirstOrDefault(x => x.YayinlandiMi);

                if (host?.AppKullanici?.UserName == currentUserName)
                    context.Succeed(requirement);
            }
            else
            {
                context.Fail();
            }

            return Task.CompletedTask;
        }
    }
}