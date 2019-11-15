using System;
using System.Collections.Generic;
using System.Linq;
using Domain;

namespace Persistence
{
    public class DummyData
    {
        public static void InsertData(DataContext context)
        {
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
                        Mekan = "Taksim"
                    },
                    new Etkinlik
                    {
                        Baslik = "Geçmiş Etkinlik 2",
                        Aciklama = "1 ay önceki etkinlik",
                        Kategori = "Kültür",
                        Tarih = DateTime.Now.AddMonths(-1),
                        Sehir = "İzmir",
                        Mekan = "Efes Antik Kenti"
                    },
                    new Etkinlik
                    {
                        Baslik = "Gelecek Etkinlik 1",
                        Aciklama = "1 ay sonraki etkinlik",
                        Kategori = "Kültür",
                        Tarih = DateTime.Now.AddMonths(1),
                        Sehir = "İstanbul",
                        Mekan = "Topkapı Sarayı"
                    },
                    new Etkinlik
                    {
                        Baslik = "Gelecek Etkinlik 2",
                        Aciklama = "2 ay sonraki etkinlik",
                        Kategori = "Müzik",
                        Tarih = DateTime.Now.AddMonths(2),
                        Sehir = "Antalya",
                        Mekan = "Konyaaltı"
                    },
                    new Etkinlik
                    {
                        Baslik = "Gelecek Etkinlik 3",
                        Aciklama = "3 ay sonraki etkinlik",
                        Kategori = "Buluşma",
                        Tarih = DateTime.Now.AddMonths(3),
                        Sehir = "Ankara",
                        Mekan = "Kızılay"
                    },
                    new Etkinlik
                    {
                        Baslik = "Gelecek Etkinlik 4",
                        Aciklama = "4 ay sonraki etkinlik",
                        Kategori = "Buluşma",
                        Tarih = DateTime.Now.AddMonths(4),
                        Sehir = "İzmir",
                        Mekan = "Cumhuriyet Meydanı"
                    },
                    new Etkinlik
                    {
                        Baslik = "Gelecek Etkinlik 5",
                        Aciklama = "5 ay sonraki etkinlik",
                        Kategori = "Buluşma",
                        Tarih = DateTime.Now.AddMonths(5),
                        Sehir = "İstanbul",
                        Mekan = "Sultanahmet Meydanı"
                    },
                    new Etkinlik
                    {
                        Baslik = "Gelecek Etkinlik 6",
                        Aciklama = "6 ay sonraki etkinlik",
                        Kategori = "Müzik",
                        Tarih = DateTime.Now.AddMonths(6),
                        Sehir = "Ankara",
                        Mekan = "Opera"
                    },
                    new Etkinlik
                    {
                        Baslik = "Gelecek Etkinlik 7",
                        Aciklama = "7 ay sonraki etkinlik",
                        Kategori = "Gezi",
                        Tarih = DateTime.Now.AddMonths(7),
                        Sehir = "Çanakkale",
                        Mekan = "Gelibolu"
                    },
                    new Etkinlik
                    {
                        Baslik = "Gelecek Etkinlik 8",
                        Aciklama = "8 ay sonraki etkinlik",
                        Kategori = "Film",
                        Tarih = DateTime.Now.AddMonths(8),
                        Sehir = "İstanbul",
                        Mekan = "Beyoğlu"
                    }
                };

                context.Etkinlikler.AddRange(etkinlikler);
                context.SaveChanges();
            }
        }
    }
}