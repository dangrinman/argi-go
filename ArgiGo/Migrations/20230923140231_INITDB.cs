﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ArgiGo.Migrations
{
    /// <inheritdoc />
    public partial class INITDB : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Books",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Author = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Edition = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Books", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Doushi",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Translation = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Group = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TeKei = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TaKei = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    JishoKei = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NaiKei = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    KanoKei = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Kanji = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Present = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Past = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Negative = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NegativePast = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Doushi", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Exams",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Level = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Exams", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Fukushi",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Translation = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Kanji = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Fukushi", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Keiyoushi",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Translation = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    KeiyoushiType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Present = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Past = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Negative = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NegativePast = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Kanji = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Keiyoushi", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Meishi",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Translation = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Kanji = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Meishi", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Chapters",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Tema = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Number = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BookId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Chapters", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Chapters_Books_BookId",
                        column: x => x.BookId,
                        principalTable: "Books",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DoushiExam",
                columns: table => new
                {
                    DoushiId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ExamsId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DoushiExam", x => new { x.DoushiId, x.ExamsId });
                    table.ForeignKey(
                        name: "FK_DoushiExam_Doushi_DoushiId",
                        column: x => x.DoushiId,
                        principalTable: "Doushi",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DoushiExam_Exams_ExamsId",
                        column: x => x.ExamsId,
                        principalTable: "Exams",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ExamFukushi",
                columns: table => new
                {
                    ExamsId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    FukushiId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExamFukushi", x => new { x.ExamsId, x.FukushiId });
                    table.ForeignKey(
                        name: "FK_ExamFukushi_Exams_ExamsId",
                        column: x => x.ExamsId,
                        principalTable: "Exams",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ExamFukushi_Fukushi_FukushiId",
                        column: x => x.FukushiId,
                        principalTable: "Fukushi",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ExamKeiyoushi",
                columns: table => new
                {
                    ExamsId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    KeiyoushiId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExamKeiyoushi", x => new { x.ExamsId, x.KeiyoushiId });
                    table.ForeignKey(
                        name: "FK_ExamKeiyoushi_Exams_ExamsId",
                        column: x => x.ExamsId,
                        principalTable: "Exams",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ExamKeiyoushi_Keiyoushi_KeiyoushiId",
                        column: x => x.KeiyoushiId,
                        principalTable: "Keiyoushi",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ExamMeishi",
                columns: table => new
                {
                    ExamsId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    MeishiId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExamMeishi", x => new { x.ExamsId, x.MeishiId });
                    table.ForeignKey(
                        name: "FK_ExamMeishi_Exams_ExamsId",
                        column: x => x.ExamsId,
                        principalTable: "Exams",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ExamMeishi_Meishi_MeishiId",
                        column: x => x.MeishiId,
                        principalTable: "Meishi",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Examples",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    value = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DoushiId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    FukushiId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    KeiyoushiId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    MeishiId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Examples", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Examples_Doushi_DoushiId",
                        column: x => x.DoushiId,
                        principalTable: "Doushi",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Examples_Fukushi_FukushiId",
                        column: x => x.FukushiId,
                        principalTable: "Fukushi",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Examples_Keiyoushi_KeiyoushiId",
                        column: x => x.KeiyoushiId,
                        principalTable: "Keiyoushi",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Examples_Meishi_MeishiId",
                        column: x => x.MeishiId,
                        principalTable: "Meishi",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "ChapterDoushi",
                columns: table => new
                {
                    ChaptersId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    DoushiId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChapterDoushi", x => new { x.ChaptersId, x.DoushiId });
                    table.ForeignKey(
                        name: "FK_ChapterDoushi_Chapters_ChaptersId",
                        column: x => x.ChaptersId,
                        principalTable: "Chapters",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ChapterDoushi_Doushi_DoushiId",
                        column: x => x.DoushiId,
                        principalTable: "Doushi",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ChapterFukushi",
                columns: table => new
                {
                    ChaptersId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    FukushiId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChapterFukushi", x => new { x.ChaptersId, x.FukushiId });
                    table.ForeignKey(
                        name: "FK_ChapterFukushi_Chapters_ChaptersId",
                        column: x => x.ChaptersId,
                        principalTable: "Chapters",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ChapterFukushi_Fukushi_FukushiId",
                        column: x => x.FukushiId,
                        principalTable: "Fukushi",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ChapterKeiyoushi",
                columns: table => new
                {
                    ChaptersId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    KeiyoushiId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChapterKeiyoushi", x => new { x.ChaptersId, x.KeiyoushiId });
                    table.ForeignKey(
                        name: "FK_ChapterKeiyoushi_Chapters_ChaptersId",
                        column: x => x.ChaptersId,
                        principalTable: "Chapters",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ChapterKeiyoushi_Keiyoushi_KeiyoushiId",
                        column: x => x.KeiyoushiId,
                        principalTable: "Keiyoushi",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ChapterMeishi",
                columns: table => new
                {
                    ChaptersId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    MeishiId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChapterMeishi", x => new { x.ChaptersId, x.MeishiId });
                    table.ForeignKey(
                        name: "FK_ChapterMeishi_Chapters_ChaptersId",
                        column: x => x.ChaptersId,
                        principalTable: "Chapters",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ChapterMeishi_Meishi_MeishiId",
                        column: x => x.MeishiId,
                        principalTable: "Meishi",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ChapterDoushi_DoushiId",
                table: "ChapterDoushi",
                column: "DoushiId");

            migrationBuilder.CreateIndex(
                name: "IX_ChapterFukushi_FukushiId",
                table: "ChapterFukushi",
                column: "FukushiId");

            migrationBuilder.CreateIndex(
                name: "IX_ChapterKeiyoushi_KeiyoushiId",
                table: "ChapterKeiyoushi",
                column: "KeiyoushiId");

            migrationBuilder.CreateIndex(
                name: "IX_ChapterMeishi_MeishiId",
                table: "ChapterMeishi",
                column: "MeishiId");

            migrationBuilder.CreateIndex(
                name: "IX_Chapters_BookId",
                table: "Chapters",
                column: "BookId");

            migrationBuilder.CreateIndex(
                name: "IX_DoushiExam_ExamsId",
                table: "DoushiExam",
                column: "ExamsId");

            migrationBuilder.CreateIndex(
                name: "IX_ExamFukushi_FukushiId",
                table: "ExamFukushi",
                column: "FukushiId");

            migrationBuilder.CreateIndex(
                name: "IX_ExamKeiyoushi_KeiyoushiId",
                table: "ExamKeiyoushi",
                column: "KeiyoushiId");

            migrationBuilder.CreateIndex(
                name: "IX_ExamMeishi_MeishiId",
                table: "ExamMeishi",
                column: "MeishiId");

            migrationBuilder.CreateIndex(
                name: "IX_Examples_DoushiId",
                table: "Examples",
                column: "DoushiId");

            migrationBuilder.CreateIndex(
                name: "IX_Examples_FukushiId",
                table: "Examples",
                column: "FukushiId");

            migrationBuilder.CreateIndex(
                name: "IX_Examples_KeiyoushiId",
                table: "Examples",
                column: "KeiyoushiId");

            migrationBuilder.CreateIndex(
                name: "IX_Examples_MeishiId",
                table: "Examples",
                column: "MeishiId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ChapterDoushi");

            migrationBuilder.DropTable(
                name: "ChapterFukushi");

            migrationBuilder.DropTable(
                name: "ChapterKeiyoushi");

            migrationBuilder.DropTable(
                name: "ChapterMeishi");

            migrationBuilder.DropTable(
                name: "DoushiExam");

            migrationBuilder.DropTable(
                name: "ExamFukushi");

            migrationBuilder.DropTable(
                name: "ExamKeiyoushi");

            migrationBuilder.DropTable(
                name: "ExamMeishi");

            migrationBuilder.DropTable(
                name: "Examples");

            migrationBuilder.DropTable(
                name: "Chapters");

            migrationBuilder.DropTable(
                name: "Exams");

            migrationBuilder.DropTable(
                name: "Doushi");

            migrationBuilder.DropTable(
                name: "Fukushi");

            migrationBuilder.DropTable(
                name: "Keiyoushi");

            migrationBuilder.DropTable(
                name: "Meishi");

            migrationBuilder.DropTable(
                name: "Books");
        }
    }
}
