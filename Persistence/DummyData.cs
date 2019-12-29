using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class DummyData
    {
        public static async Task InsertData(DataContext context, UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        Id = "a",
                        DisplayName = "Hudayfe",
                        UserName = "hudayfe",
                        Email = "hudayfe@test.com"
                    },
                    new AppUser
                    {
                        Id = "b",
                        DisplayName = "Ahmet",
                        UserName = "ahmet",
                        Email = "ahmet@test.com"
                    },
                    new AppUser
                    {
                        Id = "c",
                        DisplayName = "Irmak",
                        UserName = "irmak",
                        Email = "irmak@test.com"
                    }
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }

            if (!context.Etkinlikler.Any())
            {
                var etkinlikler = new List<Etkinlik>
                {
                    new Etkinlik
                    {
                        Baslik = "Geçmiş Etkinlik 1",
                        Aciklama = "2 ay önceki etkinlik",
                        Kategori = "Buluşma",
                        Tarih = DateTime.Now.AddMonths(-2),
                        Sehir = "İstanbul",
                        Mekan = "Taksim",
                        KullaniciEtkinlikler = new List<KullaniciEtkinlik>
                        {
                            new KullaniciEtkinlik
                            {
                                AppKullaniciId = "a",
                                YayinlandiMi = true,
                                KatilmaTarihi = DateTime.Now.AddMonths(-2)
                            }
                        }
                    },
                    new Etkinlik
                    {
                        Baslik = "Geçmiş Etkinlik 2",
                        Aciklama = "1 ay önceki etkinlik",
                        Kategori = "Kültür",
                        Tarih = DateTime.Now.AddMonths(-1),
                        Sehir = "İzmir",
                        Mekan = "Efes Antik Kenti",
                        KullaniciEtkinlikler = new List<KullaniciEtkinlik>
                        {
                            new KullaniciEtkinlik
                            {
                                AppKullaniciId = "b",
                                YayinlandiMi = true,
                                KatilmaTarihi = DateTime.Now.AddMonths(-1)
                            },
                            new KullaniciEtkinlik
                            {
                                AppKullaniciId = "a",
                                YayinlandiMi = false,
                                KatilmaTarihi = DateTime.Now.AddMonths(-1)
                            }
                        }
                    },
                    new Etkinlik
                    {
                        Baslik = "Gelecek Etkinlik 1",
                        Aciklama = "1 ay sonraki etkinlik",
                        Kategori = "Kültür",
                        Tarih = DateTime.Now.AddMonths(1),
                        Sehir = "İstanbul",
                        Mekan = "Topkapı Sarayı",
                        KullaniciEtkinlikler = new List<KullaniciEtkinlik>
                        {
                            new KullaniciEtkinlik
                            {
                                AppKullaniciId = "b",
                                YayinlandiMi = true,
                                KatilmaTarihi = DateTime.Now.AddMonths(1)
                            },
                            new KullaniciEtkinlik
                            {
                                AppKullaniciId = "a",
                                YayinlandiMi = false,
                                KatilmaTarihi = DateTime.Now.AddMonths(1)
                            }
                        }
                    },
                    new Etkinlik
                    {
                        Baslik = "Gelecek Etkinlik 2",
                        Aciklama = "2 ay sonraki etkinlik",
                        Kategori = "Müzik",
                        Tarih = DateTime.Now.AddMonths(2),
                        Sehir = "Antalya",
                        Mekan = "Konyaaltı",
                        KullaniciEtkinlikler = new List<KullaniciEtkinlik>
                        {
                            new KullaniciEtkinlik
                            {
                                AppKullaniciId = "c",
                                YayinlandiMi = true,
                                KatilmaTarihi = DateTime.Now.AddMonths(2)
                            },
                            new KullaniciEtkinlik
                            {
                                AppKullaniciId = "a",
                                YayinlandiMi = false,
                                KatilmaTarihi = DateTime.Now.AddMonths(2)
                            }
                        }
                    },
                    new Etkinlik
                    {
                        Baslik = "Gelecek Etkinlik 3",
                        Aciklama = "3 ay sonraki etkinlik",
                        Kategori = "Buluşma",
                        Tarih = DateTime.Now.AddMonths(3),
                        Sehir = "Ankara",
                        Mekan = "Kızılay",
                        KullaniciEtkinlikler = new List<KullaniciEtkinlik>
                        {
                            new KullaniciEtkinlik
                            {
                                AppKullaniciId = "b",
                                YayinlandiMi = true,
                                KatilmaTarihi = DateTime.Now.AddMonths(3)
                            },
                            new KullaniciEtkinlik
                            {
                                AppKullaniciId = "c",
                                YayinlandiMi = false,
                                KatilmaTarihi = DateTime.Now.AddMonths(3)
                            }
                        }
                    },
                    new Etkinlik
                    {
                        Baslik = "Gelecek Etkinlik 4",
                        Aciklama = "4 ay sonraki etkinlik",
                        Kategori = "Buluşma",
                        Tarih = DateTime.Now.AddMonths(4),
                        Sehir = "İzmir",
                        Mekan = "Cumhuriyet Meydanı",
                        KullaniciEtkinlikler = new List<KullaniciEtkinlik>
                        {
                            new KullaniciEtkinlik
                            {
                                AppKullaniciId = "a",
                                YayinlandiMi = true,
                                KatilmaTarihi = DateTime.Now.AddMonths(4)
                            }
                        }
                    },
                    new Etkinlik
                    {
                        Baslik = "Gelecek Etkinlik 5",
                        Aciklama = "5 ay sonraki etkinlik",
                        Kategori = "Buluşma",
                        Tarih = DateTime.Now.AddMonths(5),
                        Sehir = "İstanbul",
                        Mekan = "Sultanahmet Meydanı",
                        KullaniciEtkinlikler = new List<KullaniciEtkinlik>
                        {
                            new KullaniciEtkinlik
                            {
                                AppKullaniciId = "c",
                                YayinlandiMi = true,
                                KatilmaTarihi = DateTime.Now.AddMonths(5)
                            },
                            new KullaniciEtkinlik
                            {
                                AppKullaniciId = "b",
                                YayinlandiMi = false,
                                KatilmaTarihi = DateTime.Now.AddMonths(5)
                            }
                        }
                    },
                    new Etkinlik
                    {
                        Baslik = "Gelecek Etkinlik 6",
                        Aciklama = "6 ay sonraki etkinlik",
                        Kategori = "Müzik",
                        Tarih = DateTime.Now.AddMonths(6),
                        Sehir = "Ankara",
                        Mekan = "Opera",
                        KullaniciEtkinlikler = new List<KullaniciEtkinlik>
                        {
                            new KullaniciEtkinlik
                            {
                                AppKullaniciId = "a",
                                YayinlandiMi = true,
                                KatilmaTarihi = DateTime.Now.AddMonths(6)
                            },
                            new KullaniciEtkinlik
                            {
                                AppKullaniciId = "b",
                                YayinlandiMi = false,
                                KatilmaTarihi = DateTime.Now.AddMonths(6)
                            }
                        }
                    },
                    new Etkinlik
                    {
                        Baslik = "Gelecek Etkinlik 7",
                        Aciklama = "7 ay sonraki etkinlik",
                        Kategori = "Gezi",
                        Tarih = DateTime.Now.AddMonths(7),
                        Sehir = "Çanakkale",
                        Mekan = "Gelibolu",
                        KullaniciEtkinlikler = new List<KullaniciEtkinlik>
                        {
                            new KullaniciEtkinlik
                            {
                                AppKullaniciId = "a",
                                YayinlandiMi = true,
                                KatilmaTarihi = DateTime.Now.AddMonths(7)
                            },
                            new KullaniciEtkinlik
                            {
                                AppKullaniciId = "c",
                                YayinlandiMi = false,
                                KatilmaTarihi = DateTime.Now.AddMonths(7)
                            }
                        }
                    },
                    new Etkinlik
                    {
                        Baslik = "Gelecek Etkinlik 8",
                        Aciklama = "8 ay sonraki etkinlik",
                        Kategori = "Film",
                        Tarih = DateTime.Now.AddMonths(8),
                        Sehir = "İstanbul",
                        Mekan = "Beyoğlu",
                        KullaniciEtkinlikler = new List<KullaniciEtkinlik>
                        {
                            new KullaniciEtkinlik
                            {
                                AppKullaniciId = "b",
                                YayinlandiMi = true,
                                KatilmaTarihi = DateTime.Now.AddMonths(8)
                            },
                            new KullaniciEtkinlik
                            {
                                AppKullaniciId = "a",
                                YayinlandiMi = false,
                                KatilmaTarihi = DateTime.Now.AddMonths(8)
                            }
                        }
                    }
                };

                await context.Etkinlikler.AddRangeAsync(etkinlikler);
                await context.SaveChangesAsync();
            }
        }
    }
}