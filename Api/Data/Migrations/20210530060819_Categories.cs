using Microsoft.EntityFrameworkCore.Migrations;

namespace Api.Data.Migrations
{
    public partial class Categories : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Courses_Categories_TypeId",
                table: "Courses");

            migrationBuilder.DropIndex(
                name: "IX_Courses_TypeId",
                table: "Courses");

            migrationBuilder.DropColumn(
                name: "TypeId",
                table: "Courses");

            migrationBuilder.CreateIndex(
                name: "IX_Courses_CategoryId",
                table: "Courses",
                column: "CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Courses_Categories_CategoryId",
                table: "Courses",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "CategoryId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Courses_Categories_CategoryId",
                table: "Courses");

            migrationBuilder.DropIndex(
                name: "IX_Courses_CategoryId",
                table: "Courses");

            migrationBuilder.AddColumn<int>(
                name: "TypeId",
                table: "Courses",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Courses_TypeId",
                table: "Courses",
                column: "TypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Courses_Categories_TypeId",
                table: "Courses",
                column: "TypeId",
                principalTable: "Categories",
                principalColumn: "CategoryId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
