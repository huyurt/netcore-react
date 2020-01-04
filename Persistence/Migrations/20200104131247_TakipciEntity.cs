using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class TakipciEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Tarih",
                table: "Yorumlar");

            migrationBuilder.AddColumn<DateTime>(
                name: "YorumTarihi",
                table: "Yorumlar",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateTable(
                name: "TakipEdilenler",
                columns: table => new
                {
                    GozlemciId = table.Column<string>(nullable: false),
                    HedefId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TakipEdilenler", x => new { x.GozlemciId, x.HedefId });
                    table.ForeignKey(
                        name: "FK_TakipEdilenler_AspNetUsers_GozlemciId",
                        column: x => x.GozlemciId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_TakipEdilenler_AspNetUsers_HedefId",
                        column: x => x.HedefId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TakipEdilenler_HedefId",
                table: "TakipEdilenler",
                column: "HedefId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TakipEdilenler");

            migrationBuilder.DropColumn(
                name: "YorumTarihi",
                table: "Yorumlar");

            migrationBuilder.AddColumn<DateTime>(
                name: "Tarih",
                table: "Yorumlar",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
