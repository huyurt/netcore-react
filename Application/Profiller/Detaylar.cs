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
            private readonly IProfilReader _profilReader;
            public Handler(IProfilReader profilReader)
            {
                _profilReader = profilReader;
            }

            public async Task<Profil> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _profilReader.ReadProfil(request.UserName);
            }
        }
    }
}