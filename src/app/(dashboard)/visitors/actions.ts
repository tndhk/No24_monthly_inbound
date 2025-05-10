"use server";

import { PrismaClient } from '@/generated/prisma';
import { TravelerDataPoint, AnnualRankingDataPoint, MonthlyDataPoint, getTravelerDataForTable, getCountryMonthlyTrend, getAllUniqueCountries, getAnnualTravelerRanking, getCountryMonthlyTrendByYear } from '@/dal/visitors';

const prisma = new PrismaClient();

export async function fetchAllUniqueCountriesAction(): Promise<string[] | null> {
    try {
        return await getAllUniqueCountries();
    } catch (error) {
        console.error("Error in fetchAllUniqueCountriesAction:", error);
        return null;
    }
}

export async function fetchCountryMonthlyTrendAction(country: string): Promise<{ year: number; month: number; travelers: number }[] | null> {
    if (!country) return null;
    try {
        return await getCountryMonthlyTrend(country);
    } catch (error) {
        console.error(`Error in fetchCountryMonthlyTrendAction for ${country}:`, error);
        return null;
    }
}

export async function fetchTravelerDataForTableAction(targetCountries?: string[]): Promise<TravelerDataPoint[] | null> {
    try {
        return await getTravelerDataForTable(targetCountries);
    } catch (error) {
        console.error("Error in fetchTravelerDataForTableAction:", error);
        return null;
    }
}

export async function fetchAnnualTravelerRankingAction(
  topN?: number
): Promise<AnnualRankingDataPoint[] | null> {
  try {
    const data = await getAnnualTravelerRanking(topN);
    return data;
  } catch (error) {
    console.error("Error in fetchAnnualTravelerRankingAction:", error);
    return null;
  }
}

export async function fetchCountryMonthlyTrendByYearAction(
  country: string,
  year: number
): Promise<MonthlyDataPoint[] | null> {
  if (!country || !year) return null;
  try {
    const data = await getCountryMonthlyTrendByYear(country, year);
    return data;
  } catch (error) {
    console.error(`Error in fetchCountryMonthlyTrendByYearAction for ${country}, ${year}:`, error);
    return null;
  }
} 