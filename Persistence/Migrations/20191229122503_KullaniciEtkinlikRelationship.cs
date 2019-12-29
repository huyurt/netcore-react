using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class KullaniciEtkinlikRelationship : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "KullaniciEtkinlikler",
                columns: table => new
                {
                    AppKullaniciId = table.Column<string>(nullable: false),
                    EtkinlikId = table.Column<Guid>(nullable: false),
                    KatilmaTarihi = table.Column<DateTime>(nullable: false),
                    YayinlandiMi = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KullaniciEtkinlikler", x => new { x.AppKullaniciId, x.EtkinlikId });
                    table.ForeignKey(
                        name: "FK_KullaniciEtkinlikler_AspNetUsers_AppKullaniciId",
                        column: x => x.AppKullaniciId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_KullaniciEtkinlikler_Etkinlikler_EtkinlikId",
                        column: x => x.EtkinlikId,
                        principalTable: "Etkinlikler",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_KullaniciEtkinlikler_EtkinlikId",
                table: "KullaniciEtkinlikler",
                column: "EtkinlikId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "KullaniciEtkinlikler");
        }
    }
}
