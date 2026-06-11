using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace _3PPASSWORD.BACKEND.Migrations
{
    /// <inheritdoc />
    public partial class AddCredentialDetails : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Notes",
                table: "Credentials",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Url",
                table: "Credentials",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Username",
                table: "Credentials",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Notes",
                table: "Credentials");

            migrationBuilder.DropColumn(
                name: "Url",
                table: "Credentials");

            migrationBuilder.DropColumn(
                name: "Username",
                table: "Credentials");
        }
    }
}
