<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useAirQualityTrends } from "@/composables/useAirQualityTrends";
import type { YearlyAirQualityData } from "@/composables/useAirQualityTrends";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(Title, Tooltip, BarElement, CategoryScale, LinearScale);

const airQualityData = ref<YearlyAirQualityData[]>([]);

onMounted(async () => {
  try {
    airQualityData.value = await useAirQualityTrends();
  } catch (error) {
    console.error(
      "Erreur lors du chargement des données de qualité de l'air :",
      error
    );
  }
});

const chartData = computed(() => {
  return {
    labels: airQualityData.value.map((data) => data.year),
    datasets: [
      {
        label: "Bonne",
        backgroundColor: "#A7F3D0",
        borderColor: "#34D399",
        data: airQualityData.value.map((data) => data.goodDays),
        stack: "Stack 0",
      },
      {
        label: "Moyenne",
        backgroundColor: "#FEF08A",
        borderColor: "#FACC15",
        data: airQualityData.value.map((data) => data.averageDays),
        stack: "Stack 0",
      },
      {
        label: "Dégradée",
        backgroundColor: "#FCD34D",
        borderColor: "#F59E0B",
        data: airQualityData.value.map((data) => data.degradedDays),
        stack: "Stack 0",
      },
      {
        label: "Mauvaise",
        backgroundColor: "#FCA5A5",
        borderColor: "#EF4444",
        data: airQualityData.value.map((data) => data.badDays),
        stack: "Stack 0",
      },
      {
        label: "Très mauvaise",
        backgroundColor: "#C4B5FD",
        borderColor: "#8B5CF6",
        data: airQualityData.value.map((data) => data.veryBadDays),
        stack: "Stack 0",
      },
      {
        label: "Extrêmement mauvaise",
        backgroundColor: "#F9A8D4",
        borderColor: "#EC4899",
        data: airQualityData.value.map((data) => data.extremelyBadDays),
        stack: "Stack 0",
      },
    ],
  };
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: "index" as const,
    intersect: false,
  },
  plugins: {
    legend: {
      display: true,
      position: "top" as const,
      labels: {
        boxWidth: 14,
        boxHeight: 14,
        padding: 15,
        usePointStyle: true,
      },
    },
    tooltip: {
      enabled: true,
      backgroundColor: "#fff",
      titleColor: "#000",
      bodyColor: "#333",
      borderColor: "#ccc",
      borderWidth: 1,
      padding: 10,
      callbacks: {
        label: function (context: any) {
          return ` ${context.dataset.label}: ${context.formattedValue} `;
        },
      },
    },
  },
  scales: {
    x: {
      stacked: true,
      ticks: {
        color: "#333",
        font: {
          size: 12,
        },
      },
      grid: {
        display: false,
      },
    },
    y: {
      display: false,
    },
  },
  elements: {
    bar: {
      borderRadius: 6,
      barThickness: 20,
    },
  },
};
</script>

<style scoped>
.table-auto {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  padding: 0.5rem;
  text-align: center;
}
</style>

<template>
  <div
    class="air-quality-trends max-w-3xl mx-auto flex flex-col items-center justify-center"
  >
    <h2 class="text-2xl font-bold mb-4 text-center">
      Résumé annuel des indices par jour de la qualité de l'air à Paris
    </h2>

    <table
      class="table-auto border-collapse border border-green-500 w-full text-center"
    >
      <thead>
        <tr class="bg-green-100">
          <th class="border border-green-500 px-4 py-2">Année</th>
          <th class="border border-green-500 px-4 py-2">Bonne</th>
          <th class="border border-green-500 px-4 py-2">Moyenne</th>
          <th class="border border-green-500 px-4 py-2">Dégradée</th>
          <th class="border border-green-500 px-4 py-2">Mauvaise</th>
          <th class="border border-green-500 px-4 py-2">Très mauvaise</th>
          <th class="border border-green-500 px-4 py-2">
            Extrêmement mauvaise
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(data, index) in airQualityData"
          :key="index"
          class="hover:bg-green-50"
        >
          <td class="border border-green-500 px-4 py-2">{{ data.year }}</td>
          <td class="border border-green-500 px-4 py-2 bg-green-100">
            {{ data.goodDays }}
          </td>
          <td class="border border-green-500 px-4 py-2 bg-yellow-50">
            {{ data.averageDays }}
          </td>
          <td class="border border-green-500 px-4 py-2 bg-yellow-100">
            {{ data.degradedDays }}
          </td>
          <td class="border border-green-500 px-4 py-2 bg-orange-100">
            {{ data.badDays }}
          </td>
          <td class="border border-green-500 px-4 py-2 bg-red-100">
            {{ data.veryBadDays }}
          </td>
          <td class="border border-green-500 px-4 py-2 bg-purple-100">
            {{ data.extremelyBadDays }}
          </td>
        </tr>
      </tbody>
    </table>

    <div class="mt-4 w-full">
      <Bar :data="chartData" :options="chartOptions" class="h-[300px]" />
    </div>
  </div>
</template>
