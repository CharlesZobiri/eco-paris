<template>
  <div class="bg-gradient-to-br from-green-50 to-green-200 pb-4 h-screen">
    <div>
      <Navbar
        logoSrc="/leaf.svg"
        title="Eco-Paris - Tableau de bord"
        :buttons="[
          {
            label: 'Accueil',
            icon: House,
            color: 'bg-green-500',
            to: '/',
          },
          {
            label: 'Comparer',
            icon: ArrowLeftRight,
            color: 'bg-green-800',
            to: '/compare',
          },
        ]"
      />
    </div>

    <div>
      <Day
        :selectedArrondissement="selectedArrondissement"
        @arrondissement-selected="onArrondissementSelected"
      />
    </div>

    <section class="flex py-4 px-4 gap-8">
      <div class="h-[430px] min-w-1/2">
        <MapParis
          :selectedArrondissement="selectedArrondissement"
          class="border-2 border-green-500"
          @arrondissement-selected="onArrondissementSelected"
        />
      </div>
      <div class="w-full">
        <div
          v-if="!isLoading && isTomorrowDataMissing"
          class="bg-yellow-100 text-yellow-800 px-4 py-3 rounded-xl shadow-md text-center"
        >
          ℹ️ Les prévisions pour le <strong>lendemain</strong> ne sont pas
          encore disponibles.
        </div>

        <Loader :isLoading="isLoading" />
        <AirQualityDisplay
          class="w-full"
          v-if="airQualityIndices"
          :data="airQualityIndices"
          :show-tomorrow="false"
          :show-map="true"
          :center="getArrondissementCoordinates(selectedArrondissement)"
          :selectedArrondissement="
            getArrondissementName(selectedArrondissement)
          "
        />
        <h2 class="pt-4 text-3xl font-semibold text-green-800">
          Le Top des arrondissements indiquants<br />
          la meilleure qualité de l'air
        </h2>
      </div>
    </section>

    <section class="flex gap-10 px-4">
      <div class="w-1/2">quzdhoi</div>
      <div class="flex w-1/2 justify-center items-center text-center">
        <ChartBar
          v-if="airQualityIndices"
          :data="airQualityIndices"
          class="max-h-90"
        />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Navbar from "../components/home/navbar.vue";
import Day from "../components/home/day.vue";
import MapParis from "../components/home/map.vue";
import { ArrowLeftRight, House } from "lucide-vue-next";
import AirQualityDisplay from "@/components/AirQualityDisplay.vue";
const selectedArrondissement = ref("1° Arrondissement");
import ChartBar from "@/components/home/ChartBar.vue";
import { getAirQualityByCommune } from "@/services/airparif";
import { onMounted, computed, watch } from "vue";
import Loader from "@/components/Loader.vue";
import { arrondissements } from "@/data/arrondissements";

const isLoading = ref(false);

const airQualityData = ref<any>(null);
const activeInsee = ref("75101");

const getArrondissementCoordinates = (
  insee: string
): [number, number] | undefined => {
  const arr = arrondissements.find((a) => a.insee === insee);
  return arr ? [arr.lat, arr.lng] : undefined;
};

const airQualityIndices = computed(() => {
  if (!airQualityData.value || !airQualityData.value[activeInsee.value])
    return null;
  return airQualityData.value[activeInsee.value];
});

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);
const tomorrowKey = tomorrow.toISOString().split("T")[0]; // format "YYYY-MM-DD"

const isTomorrowDataMissing = computed(() => {
  const hasTomorrowData = (data: any[]) => {
    if (!data || !Array.isArray(data)) return false;
    return data.some((item) => item.date === tomorrowKey);
  };
  return !hasTomorrowData(airQualityIndices.value);
});

const fetchAirQualityData = async () => {
  isLoading.value = true;
  try {
    airQualityData.value = await getAirQualityByCommune(activeInsee.value);
    console.log("Données reçues:", airQualityData.value);
  } catch (error) {
    console.error("Erreur dans le composant:", error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchAirQualityData);
watch(activeInsee, fetchAirQualityData);

const onArrondissementSelected = (arrondissementName: string) => {
  selectedArrondissement.value = arrondissementName;
  const arrondissement = arrondissements.find(
    (a) => a.name === arrondissementName
  );
  if (arrondissement) {
    activeInsee.value = arrondissement.insee;
  } else {
    console.warn("Arrondissement non trouvé :", arrondissementName);
  }
};

const getArrondissementName = (insee: string): string => {
  const arr = arrondissements.find((a) => a.insee === insee);
  return arr ? arr.name : insee;
};
</script>
