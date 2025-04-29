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
  type ChartOptions,
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
        font: {
          size: 14,
          weight: "bold",
        },
        color: "#34D399",
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
} as ChartOptions<"bar">;
</script>

<template>
  <div
    class="air-quality-trends max-w-3xl mx-auto flex flex-col items-center justify-center"
  >
    <h2 class="text-3xl max-w-2xl font-bold mb-8 text-center text-green-700">
      Résumé annuel des indices par jour de la qualité de l'air à Paris
    </h2>

    <table
      class="table-auto border-collapse border border-green-500 w-full text-center bg-white shadow-sm rounded-lg"
    >
      <thead>
        <tr class="bg-green-100 text-green-800">
          <th class="border border-green-500 px-4 py-2 text-sm font-semibold">
            Année
          </th>
          <th class="border border-green-500 px-4 py-2 text-sm font-semibold">
            Bonne
          </th>
          <th class="border border-green-500 px-4 py-2 text-sm font-semibold">
            Moyenne
          </th>
          <th class="border border-green-500 px-4 py-2 text-sm font-semibold">
            Dégradée
          </th>
          <th class="border border-green-500 px-4 py-2 text-sm font-semibold">
            Mauvaise
          </th>
          <th class="border border-green-500 px-4 py-2 text-sm font-semibold">
            Très mauvaise
          </th>
          <th class="border border-green-500 px-4 py-2 text-sm font-semibold">
            Extrêmement mauvaise
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(data, index) in airQualityData"
          :key="index"
          class="hover:bg-green-50 transition duration-200 ease-in-out"
        >
          <td class="border border-green-500 px-4 py-2">{{ data.year }}</td>
          <td class="border border-green-500 px-4 py-2 bg-green-100">
            {{ data.goodDays }}
          </td>
          <td class="border border-green-500 px-4 py-2 bg-yellow-100">
            {{ data.averageDays }}
          </td>
          <td class="border border-green-500 px-4 py-2 bg-yellow-200">
            {{ data.degradedDays }}
          </td>
          <td class="border border-green-500 px-4 py-2 bg-orange-200">
            {{ data.badDays }}
          </td>
          <td class="border border-green-500 px-4 py-2 bg-red-200">
            {{ data.veryBadDays }}
          </td>
          <td class="border border-green-500 px-4 py-2 bg-purple-200">
            {{ data.extremelyBadDays }}
          </td>
        </tr>
      </tbody>
    </table>

    <div class="mt-6 w-full">
      <Bar
        :data="chartData"
        :options="chartOptions"
        class="h-[300px] rounded-xl"
      />
    </div>
  </div>
</template>

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

th {
  font-weight: bold;
  background-color: #f3f4f6; /* Light grey for headers */
}

td {
  font-size: 14px;
}

.hover\:bg-green-50:hover {
  background-color: #f0fdf4; /* Light green */
}

.bg-green-100 {
  background-color: #d1fae5; /* Light green background for "good" days */
}

.bg-yellow-100 {
  background-color: #fef08a; /* Light yellow for "average" days */
}

.bg-yellow-200 {
  background-color: #fde68a; /* Darker yellow for "degraded" days */
}

.bg-orange-200 {
  background-color: #fcd34d; /* Light orange for "bad" days */
}

.bg-red-200 {
  background-color: #fca5a5; /* Light red for "very bad" days */
}

.bg-purple-200 {
  background-color: #c4b5fd; /* Light purple for "extremely bad" days */
}
</style>
