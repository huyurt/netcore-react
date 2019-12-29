using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Etkinlikler
{
    public class Listele
    {
        public class Query : IRequest<List<EtkinlikDto>> { }

        public class Handler : IRequestHandler<Query, List<EtkinlikDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<List<EtkinlikDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var etkinlikler = await _context.Etkinlikler
                    .ToListAsync();

                return _mapper.Map<List<Etkinlik>, List<EtkinlikDto>>(etkinlikler);
            }
        }
    }
}