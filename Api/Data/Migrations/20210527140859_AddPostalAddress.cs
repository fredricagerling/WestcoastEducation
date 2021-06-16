using Microsoft.EntityFrameworkCore.Migrations;

namespace Api.Data.Migrations
{
    public partial class AddPostalAddress : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Adress",
                table: "Students",
                newName: "PostalAddress");

            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "Students",
                type: "TEXT",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Address",
                table: "Students");

            migrationBuilder.RenameColumn(
                name: "PostalAddress",
                table: "Students",
                newName: "Adress");
        }
    }
}
