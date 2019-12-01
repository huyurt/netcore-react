using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Persistence;

namespace Application.Kullanici
{
    public class CurrentUser
    {
        public class Query : IRequest<Kullanici> { }

        public class Handler : IRequestHandler<Query, Kullanici>
        {
            private readonly UserManager<AppUser> _userManager;
            private readonly IJwtGenerator _jwtGenerator;
            private readonly IKullaniciErisimi _kullaniciErisimi;
            public Handler(UserManager<AppUser> userManager, IJwtGenerator jwtGenerator, IKullaniciErisimi kullaniciErisimi)
            {
                _kullaniciErisimi = kullaniciErisimi;
                _jwtGenerator = jwtGenerator;
                _userManager = userManager;
            }

            public async Task<Kullanici> Handle(Query request, CancellationToken cancellationToken)
            {
                var kullanici = await _userManager.FindByNameAsync(_kullaniciErisimi.GetCurrentUserName());
                return new Kullanici
                {
                    DisplayName = kullanici.DisplayName,
                    Token = _jwtGenerator.CreateToken(kullanici),
                    UserName = kullanici.UserName,
                    Image = null
                };
            }
        }
    }
}