using Microsoft.EntityFrameworkCore;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Value> Values { get; set; }
        public DbSet<Etkinlik> Etkinlikler { get; set; }
        public DbSet<KullaniciEtkinlik> KullaniciEtkinlikler { get; set; }
        public DbSet<Resim> Resimler { get; set; }
        public DbSet<Yorum> Yorumlar { get; set; }
        public DbSet<KullaniciTakibi> TakipEdilenler { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Value>()
                .HasData(
                    new Value { Id = 1, Name = "Ahmet" },
                    new Value { Id = 2, Name = "Ali" },
                    new Value { Id = 3, Name = "Mehmet" }
                );

            builder.Entity<KullaniciEtkinlik>(x => x.HasKey(ke =>
                new { ke.AppKullaniciId, ke.EtkinlikId }));

            builder.Entity<KullaniciEtkinlik>()
                .HasOne(k => k.AppKullanici)
                .WithMany(e => e.KullaniciEtkinlikler)
                .HasForeignKey(k => k.AppKullaniciId);

            builder.Entity<KullaniciEtkinlik>()
                .HasOne(e => e.Etkinlik)
                .WithMany(k => k.KullaniciEtkinlikler)
                .HasForeignKey(e => e.EtkinlikId);

            builder.Entity<KullaniciTakibi>(b =>
            {
                b.HasKey(k => new { k.GozlemciId, k.HedefId });

                b.HasOne(o => o.Gozlemci)
                    .WithMany(f => f.TakipEdilenler)
                    .HasForeignKey(o => o.GozlemciId)
                    .OnDelete(DeleteBehavior.Restrict);

                b.HasOne(o => o.Hedef)
                    .WithMany(f => f.Takipciler)
                    .HasForeignKey(o => o.HedefId)
                    .OnDelete(DeleteBehavior.Restrict);
            });
        }
    }
}
