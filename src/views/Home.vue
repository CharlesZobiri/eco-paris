<template>
  <main class="bg-gradient-to-br from-green-50 to-green-100">
    <section>
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
    </section>

    <section>
      <Day
        :selectedArrondissement="selectedArrondissement"
        @arrondissement-selected="onArrondissementSelected"
      />
    </section>

    <section class="grid grid-layout px-4 py-4 gap-4">
      <div class="map">
        <MapParis
          :center="
            getArrondissementCoordinates(activeInsee) || [48.8566, 2.3522]
          "
          class="border-2 border-green-500"
          @arrondissement-selected="onArrondissementSelected"
        />
      </div>
      <div class="card">
        <Loader :isLoading="isLoading" />
        <AirQualityDisplay
          class="w-full max-w-4xl ml-5"
          v-if="airQualityIndices"
          :data="airQualityIndices"
          :show-tomorrow="false"
          :show-map="true"
          :center="getArrondissementCoordinates(activeInsee)"
          :selectedArrondissement="getArrondissementName(activeInsee)"
        />
      </div>
      <div class="graph">
        <AirQualityTrends />
      </div>
      <div class="facts">
        <EcoFacts />
      </div>
    </section>
    <Footer />
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import Navbar from "../components/home/navbar.vue";
import Day from "../components/home/day.vue";
import MapParis from "../components/home/map.vue";
import { ArrowLeftRight, House } from "lucide-vue-next";
import AirQualityDisplay from "@/components/AirQualityDisplay.vue";
import AirQualityTrends from "@/components/AirQualityTrends.vue";
import { getAirQualityByCommune } from "@/services/airparif";
import Loader from "@/components/Loader.vue";
import { arrondissements } from "@/data/arrondissements";
import EcoFacts from "@/components/EcoFacts.vue";
import Footer from "@/components/home/Footer.vue";

const selectedArrondissement = ref("1er arrondissement");
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

<style scoped>
.grid-layout {
  display: grid;
  grid-template-columns: 1.5fr 0fr 1.5fr;
  grid-template-rows: 1.2fr 0.6fr 1.2fr;
  grid-template-areas:
    "map map card"
    "map map graph"
    "facts . graph";
}

.map {
  grid-area: map;
}

.card {
  grid-area: card;
  padding: 0;
}

.graph {
  grid-area: graph;
}

.facts {
  grid-area: facts;
}
</style>
