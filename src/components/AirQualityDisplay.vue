<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { Calendar, Wind, Droplet, CloudFog, Leaf } from "lucide-vue-next";
import { LMap, LTileLayer, LGeoJson } from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";
import { arrondissements } from "@/data/arrondissements";
import type { Feature, FeatureCollection } from "geojson";

const props = defineProps<{
  data: any;
  center?: [number, number];
  selectedArrondissement?: string;
  showMap?: boolean;
  showTomorrow?: boolean;
}>();

const originalGeojson = ref<FeatureCollection | undefined>(undefined);
const filteredGeojson = ref<FeatureCollection | undefined>(undefined);
const zoom = ref<number>(13);
const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

const getEmojiForIndice = (indice: string): string => {
  switch (indice) {
    case "Très bon":
    case "Bon":
      return "😊";
    case "Moyen":
      return "😐";
    case "Dégradé":
      return "😷";
    case "Mauvais":
    case "Très mauvais":
      return "🤢";
    default:
      return "❓";
  }
};

const options = {
  style: function (feature: Feature) {
    return {
      fillColor: feature.properties?.color || "blue",
      weight: 2,
      opacity: 1,
      color: "white",
      fillOpacity: 0.7,
    };
  },
};

const fetchGeoJson = async () => {
  try {
    const response = await fetch("/arrondissements.geojson");
    const data = await response.json();
    originalGeojson.value = data;
    filterGeoJsonForSelectedArrondissement();
  } catch (error) {
    console.error("Erreur lors de la récupération du GeoJSON:", error);
  }
};

const filterGeoJsonForSelectedArrondissement = () => {
  if (!originalGeojson.value || !props.selectedArrondissement) {
    filteredGeojson.value = undefined;
    return;
  }

  const selectedFeature = originalGeojson.value.features.find((feature) => {
    const c_ar = feature.properties?.c_ar;
    const match = arrondissements.find(
      (a) => a.c_ar === c_ar && a.name === props.selectedArrondissement
    );
    return match !== undefined;
  });

  if (selectedFeature) {
    filteredGeojson.value = {
      type: "FeatureCollection",
      features: [selectedFeature],
    };
  } else {
    filteredGeojson.value = undefined;
  }
};

onMounted(fetchGeoJson);
watch(
  () => props.selectedArrondissement,
  filterGeoJsonForSelectedArrondissement
);
</script>

<template>
  <div class="grid grid-cols-1 gap-6 w-full">
    <div
      v-for="(dayData, index) in data.filter(
        (_: any, i: number) => i === 0 || (props.showTomorrow && i === 1)
      )"
      :key="index"
      class="flex bg-white rounded-2xl p-4 shadow-xl border-2 border-green-200 transition hover:scale-[1.02] hover:shadow-2xl gap-6 px-6"
    >
      <section class="flex flex-col min-w-1/3">
        <h2 class="text-2xl font-bold text-green-700 flex items-center mb-2">
          <Calendar class="mr-3 h-7 w-7 text-green-600" />
          {{ index === 0 ? "Aujourd'hui" : props.showTomorrow ? "Demain" : "" }}
        </h2>

        <p class="flex items-center text-gray-700 mb-1 text-lg">
          <strong>Date :</strong>
          <span class="ml-2">{{ dayData.date }}</span>
        </p>

        <p
          v-if="dayData.indice"
          class="flex items-center text-lg font-medium mb-2"
        >
          <span
            :class="{
              'text-green-600': ['Très bon', 'Bon'].includes(dayData.indice),
              'text-yellow-600': dayData.indice === 'Moyen',
              'text-orange-600': dayData.indice === 'Dégradé',
              'text-red-600': ['Mauvais', 'Très mauvais'].includes(
                dayData.indice
              ),
            }"
          >
            <strong class="text-gray-700">Qualité de l’air :</strong>
            <strong class="ml-2">{{ dayData.indice }}</strong>
          </span>
          <span class="text-2xl ml-2" aria-hidden="true">
            {{ getEmojiForIndice(dayData.indice) }}
          </span>
        </p>

        <div class="mt-2 space-y-2">
          <h3 class="font-semibold text-green-600 flex items-center mb-1">
            <Leaf class="mr-2 h-5 w-5 text-green-600" /> Polluants :
          </h3>
          <p class="flex items-center text-gray-700">
            <Wind class="mr-2 h-5 w-5 text-gray-500" />
            <strong>NO2 :</strong> <span class="ml-2">{{ dayData.no2 }}</span>
          </p>
          <p class="flex items-center text-gray-700">
            <Droplet class="mr-2 h-5 w-5 text-gray-500" />
            <strong>O3 :</strong> <span class="ml-2">{{ dayData.o3 }}</span>
          </p>
          <p v-if="dayData.pm10" class="flex items-center text-gray-700">
            <CloudFog class="mr-2 h-5 w-5 text-gray-500" />
            <strong>PM10 :</strong> <span class="ml-2">{{ dayData.pm10 }}</span>
          </p>
          <p v-if="dayData.pm25" class="flex items-center text-gray-700">
            <CloudFog class="mr-2 h-5 w-5 text-gray-500" />
            <strong>PM2.5 :</strong>
            <span class="ml-2">{{ dayData.pm25 }}</span>
          </p>
          <p v-if="dayData.so2" class="flex items-center text-gray-700">
            <Leaf class="mr-2 h-5 w-5 text-gray-500" />
            <strong>SO2 :</strong> <span class="ml-2">{{ dayData.so2 }}</span>
          </p>
        </div>
      </section>

      <section v-if="showMap" class="w-full">
        <div
          class="mt-6 rounded-xl overflow-hidden border border-green-500"
          style="height: 250px"
        >
          <LMap
            :center="center || [dayData.lat || 48.8566, dayData.lng || 2.3522]"
            :zoom="zoom"
            style="height: 100%"
          >
            <LTileLayer :url="url" />
            <LGeoJson
              v-if="filteredGeojson"
              :geojson="filteredGeojson"
              :options="options"
            />
          </LMap>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.leaflet-container {
  border-radius: 16px;
}

.leaflet-tile {
  border-radius: 16px !important;
}
</style>
