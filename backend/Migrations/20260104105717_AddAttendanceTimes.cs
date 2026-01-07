using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TrickyWeb_WebDev.Migrations
{
    /// <inheritdoc />
    public partial class AddAttendanceTimes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<TimeSpan>(
                name: "CheckIn",
                table: "OfficeAttendances",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<TimeSpan>(
                name: "CheckOut",
                table: "OfficeAttendances",
                type: "TEXT",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CheckIn",
                table: "OfficeAttendances");

            migrationBuilder.DropColumn(
                name: "CheckOut",
                table: "OfficeAttendances");
        }
    }
}
