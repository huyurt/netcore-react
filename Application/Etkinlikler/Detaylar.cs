using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Etkinlikler
{
    public class Detaylar
    {
        public class Query : IRequest<EtkinlikDto>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, EtkinlikDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<EtkinlikDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var etkinlik = await _context.Etkinlikler
                    .FindAsync(request.Id);

                if (etkinlik == null)
                    throw new RestException(HttpStatusCode.NotFound, new { etkinlik = "Bulunamadı" });

                var etkinlikToReturn = _mapper.Map<Etkinlik, EtkinlikDto>(etkinlik);

                return etkinlikToReturn;
            }
        }
    }
}