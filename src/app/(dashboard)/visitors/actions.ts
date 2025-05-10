"use server";

import { getAllUniqueCountries, getCountryMonthlyTrend, getTravelerDataForTable } from "@/dal/visitors";

export async function fetchAllUniqueCountriesAction() {
  return getAllUniqueCountries();
}

export async function fetchCountryMonthlyTrendAction(country: string) {
  if (!country) return null;
  try {
    const trendData = await getCountryMonthlyTrend(country);
    return trendData;
  } catch (error) {
    console.error(`Error fetching trend data for ${country}:`, error);
    return null; // エラー時はnullを返すか、エラー情報を返す
  }
}

export async function fetchTravelerDataForTableAction(targetCountries?: string[]) {
    return getTravelerDataForTable(targetCountries);
} 