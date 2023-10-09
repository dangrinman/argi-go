using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ArgiGo.Migrations
{
    /// <inheritdoc />
    public partial class secondMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Chapter_Book_Id",
                table: "Chapter");

            migrationBuilder.AddColumn<string>(
                name: "BookId",
                table: "Chapter",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Chapter_BookId",
                table: "Chapter",
                column: "BookId");

            migrationBuilder.AddForeignKey(
                name: "FK_Chapter_Book_BookId",
                table: "Chapter",
                column: "BookId",
                principalTable: "Book",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Chapter_Book_BookId",
                table: "Chapter");

            migrationBuilder.DropIndex(
                name: "IX_Chapter_BookId",
                table: "Chapter");

            migrationBuilder.DropColumn(
                name: "BookId",
                table: "Chapter");

            migrationBuilder.AddForeignKey(
                name: "FK_Chapter_Book_Id",
                table: "Chapter",
                column: "Id",
                principalTable: "Book",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
