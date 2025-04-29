export interface YearlyAirQualityData {
  year: string;
  goodDays: number;
  averageDays: number;
  degradedDays: number;
  badDays: number;
  veryBadDays: number;
  extremelyBadDays: number;
}

export const useAirQualityTrends = async (): Promise<
  YearlyAirQualityData[]
> => {
  return new Promise((resolve, reject) => {
    try {
      const apiUrl =
        "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/qualite-de-l-air-indice-atmo/exports/json";

      fetch(apiUrl)
        .then((response) => response.json())
        .then((data: any[]) => {
          // Transformer les données JSON en objets YearlyAirQualityData
          const parsedData: YearlyAirQualityData[] = data.map((row) => ({
            year: row.annee,
            goodDays: parseInt(row.ind_jour_qa_bonne || "0"),
            averageDays: parseInt(row.ind_jour_qa_moyenne || "0"),
            degradedDays: parseInt(row.ind_jour_qa_degradee || "0"),
            badDays: parseInt(row.ind_jour_qa_mauvaise || "0"),
            veryBadDays: parseInt(row.ind_jour_qa_tres_mauvaise || "0"),
            extremelyBadDays: parseInt(
              row.ind_jour_qa_extremement_mauvaise || "0"
            ),
          }));

          parsedData.sort((a, b) => parseInt(a.year) - parseInt(b.year));
          console.log("Données air quality du composable:", parsedData);
          resolve(parsedData);
        })
        .catch((error) => {
          console.error("Erreur lors du fetch des données JSON:", error);
          reject(error);
        });
    } catch (error) {
      console.error("Erreur dans useAirQualityTrends:", error);
      reject(error);
    }
  });
};
