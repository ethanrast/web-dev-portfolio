using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TrickyWeb_WebDev.Migrations
{
    /// <inheritdoc />
    public partial class UpdateRoomBookingModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BookingDate",
                table: "RoomBookings");

            migrationBuilder.RenameColumn(
                name: "StartTime",
                table: "RoomBookings",
                newName: "StartDateTime");

            migrationBuilder.RenameColumn(
                name: "EndTime",
                table: "RoomBookings",
                newName: "EndDateTime");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "RoomBookings",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Id",
                table: "RoomBookings");

            migrationBuilder.RenameColumn(
                name: "StartDateTime",
                table: "RoomBookings",
                newName: "StartTime");

            migrationBuilder.RenameColumn(
                name: "EndDateTime",
                table: "RoomBookings",
                newName: "EndTime");

            migrationBuilder.AddColumn<DateTime>(
                name: "BookingDate",
                table: "RoomBookings",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
