using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiller
{
    public class Detaylar
    {
        public class Query : IRequest<Profil>
        {
            public string UserName { get; set; }
        }

        public class Handler : IRequestHandler<Query, Profil>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Profil> Handle(Query request, CancellationToken cancellationToken)
            {
                var kullanici = await _context.Users.SingleOrDefaultAsync(x => x.UserName == request.UserName);

                return new Profil
                {
                    DisplayName = kullanici.DisplayName,
                    UserName = kullanici.UserName,
                    Image = kullanici.Resimler.FirstOrDefault(x => x.AnaResimMi)?.Url,
                    Resimler = kullanici.Resimler,
                    Bio = kullanici.Bio
                };
            }
        }
    }
}