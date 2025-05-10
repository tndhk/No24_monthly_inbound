-- CreateTable
CREATE TABLE "MonthlyTravelerStats" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "country" TEXT NOT NULL,
    "travelers" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "MonthlyTravelerStats_year_month_country_key" ON "MonthlyTravelerStats"("year", "month", "country");
