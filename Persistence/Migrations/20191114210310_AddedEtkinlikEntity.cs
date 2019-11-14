using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class AddedEtkinlikEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Etkinlikler",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Baslik = table.Column<string>(nullable: true),
                    Aciklama = table.Column<string>(nullable: true),
                    Kategori = table.Column<string>(nullable: true),
                    Tarih = table.Column<DateTime>(nullable: false),
                    Sehir = table.Column<string>(nullable: true),
                    Mekan = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Etkinlikler", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Etkinlikler");
        }
    }
}
