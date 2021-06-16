using Microsoft.EntityFrameworkCore.Migrations;

namespace Api.Data.Migrations
{
    public partial class StudentsCourses : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Courses_CourseTypes_TypeId",
                table: "Courses");

            migrationBuilder.DropTable(
                name: "CourseStudents");

            migrationBuilder.DropTable(
                name: "CourseTypes");

            migrationBuilder.AlterColumn<int>(
                name: "TypeId",
                table: "Courses",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AddColumn<int>(
                name: "CategoryId",
                table: "Courses",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    CategoryId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    CategoryName = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.CategoryId);
                });

            migrationBuilder.CreateTable(
                name: "StudentsCourses",
                columns: table => new
                {
                    CourseId = table.Column<int>(type: "INTEGER", nullable: false),
                    StudentId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StudentsCourses", x => new { x.CourseId, x.StudentId });
                    table.ForeignKey(
                        name: "FK_StudentsCourses_Courses_CourseId",
                        column: x => x.CourseId,
                        principalTable: "Courses",
                        principalColumn: "CourseId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_StudentsCourses_Students_StudentId",
                        column: x => x.StudentId,
                        principalTable: "Students",
                        principalColumn: "StudentId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_StudentsCourses_StudentId",
                table: "StudentsCourses",
                column: "StudentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Courses_Categories_TypeId",
                table: "Courses",
                column: "TypeId",
                principalTable: "Categories",
                principalColumn: "CategoryId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Courses_Categories_TypeId",
                table: "Courses");

            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.DropTable(
                name: "StudentsCourses");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "Courses");

            migrationBuilder.AlterColumn<int>(
                name: "TypeId",
                table: "Courses",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "CourseStudents",
                columns: table => new
                {
                    CourseId = table.Column<int>(type: "INTEGER", nullable: false),
                    StudentId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CourseStudents", x => new { x.CourseId, x.StudentId });
                    table.ForeignKey(
                        name: "FK_CourseStudents_Courses_CourseId",
                        column: x => x.CourseId,
                        principalTable: "Courses",
                        principalColumn: "CourseId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CourseStudents_Students_StudentId",
                        column: x => x.StudentId,
                        principalTable: "Students",
                        principalColumn: "StudentId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CourseTypes",
                columns: table => new
                {
                    TypeId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    TypeName = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CourseTypes", x => x.TypeId);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CourseStudents_StudentId",
                table: "CourseStudents",
                column: "StudentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Courses_CourseTypes_TypeId",
                table: "Courses",
                column: "TypeId",
                principalTable: "CourseTypes",
                principalColumn: "TypeId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
