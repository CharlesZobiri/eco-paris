<script setup lang="ts">
import "@/style.css";
import { House } from "lucide-vue-next";
import { useRouter } from "vue-router";
import { getAirQualityByCommune } from "@/services/airparif";
import { onMounted, ref, computed } from "vue";

const router = useRouter();
function goToLanding() {
  router.push("/");
}

const airQualityData = ref<any>(null);
const inseeCode = "75120";

const airQualityIndices = computed(() => {
  if (!airQualityData.value || !airQualityData.value[inseeCode]) return null;
  return airQualityData.value[inseeCode];
});

onMounted(async () => {
  try {
    airQualityData.value = await getAirQualityByCommune(inseeCode);
    console.log("Données reçues:", airQualityData.value);
  } catch (error) {
    console.error("Erreur dans le composant:", error);
  }
});
</script>

<template>
  <section
    class="flex flex-col items-center gap-8 p-6 bg-gradient-to-br from-green-50 to-green-100 min-h-screen"
  >
    <div class="flex w-full justify-between items-center">
      <h1 class="text-3xl font-bold text-green-700">
        Qualité de l'air de Paris {{ inseeCode }}
      </h1>
      <button
        @click="goToLanding"
        class="flex gap-2 items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
      >
        <House /> Accueil
      </button>
    </div>
    <div
      v-if="airQualityIndices"
      class="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl"
    >
      <div
        v-for="(dayData, index) in airQualityIndices"
        :key="index"
        class="bg-white rounded-xl p-4 shadow-lg border border-green-200"
      >
        <h2 class="text-xl font-semibold text-green-600">
          {{ index === 0 ? "Aujourd'hui" : "Demain" }}
        </h2>
        <p><strong>Date :</strong> {{ dayData.date }}</p>
        <div class="mt-2">
          <h3 class="font-medium text-green-600">Polluants :</h3>
          <p><strong>NO2 :</strong> {{ dayData.no2 }}</p>
          <p><strong>O3 :</strong> {{ dayData.o3 }}</p>
          <p v-if="dayData.pm10"><strong>PM10 :</strong> {{ dayData.pm10 }}</p>
          <p v-if="dayData.pm25"><strong>PM2.5 :</strong> {{ dayData.pm25 }}</p>
          <p v-if="dayData.so2"><strong>SO2 :</strong> {{ dayData.so2 }}</p>
        </div>
      </div>
    </div>
    <p v-else class="text-gray-600">Chargement des données en cours...</p>
  </section>
</template>
