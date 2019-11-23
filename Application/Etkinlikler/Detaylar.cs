using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Etkinlikler
{
    public class Detaylar
    {
        public class Query : IRequest<Etkinlik>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Etkinlik>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Etkinlik> Handle(Query request, CancellationToken cancellationToken)
            {
                var etkinlik = await _context.Etkinlikler.FindAsync(request.Id);
                return etkinlik;
            }
        }
    }
}