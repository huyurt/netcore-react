using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Etkinlikler
{
    public class Listele
    {
        public class Query : IRequest<List<Etkinlik>> { }

        public class Handler : IRequestHandler<Query, List<Etkinlik>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Etkinlik>> Handle(Query request, CancellationToken cancellationToken)
            {
                var etkinlikler = await _context.Etkinlikler.ToListAsync();
                return etkinlikler;
            }
        }
    }
}