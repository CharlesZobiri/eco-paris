<script setup lang="ts">
import { Calendar, Wind, Droplet, CloudFog, Leaf } from "lucide-vue-next";
import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";

defineProps<{ data: any }>();

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
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
    <div
      v-for="(dayData, index) in data"
      :key="index"
      class="bg-white rounded-2xl p-6 shadow-xl border-2 border-green-200 transition hover:scale-[1.02] hover:shadow-2xl"
    >
      <h2 class="text-2xl font-bold text-green-700 flex items-center mb-2">
        <Calendar class="mr-3 h-7 w-7 text-green-600" />
        {{ index === 0 ? "Aujourd'hui" : "Demain" }}
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
          <strong class="text-gray-700">Qualité de l’air : </strong>
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
          <strong>PM2.5 :</strong> <span class="ml-2">{{ dayData.pm25 }}</span>
        </p>
        <p v-if="dayData.so2" class="flex items-center text-gray-700">
          <Leaf class="mr-2 h-5 w-5 text-gray-500" />
          <strong>SO2 :</strong> <span class="ml-2">{{ dayData.so2 }}</span>
        </p>
      </div>

      <!-- Carte Leaflet pour chaque jour avec style amélioré -->
      <div class="mt-6 rounded-xl overflow-hidden shadow-lg border border-gray-200" style="height: 250px;">
        <LMap :center="[dayData.lat || 48.8566, dayData.lng || 2.3522]" :zoom="13" style="height: 100%;">
          <LTileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LMarker :lat-lng="[dayData.lat || 48.8566, dayData.lng || 2.3522]">
            <LPopup>
              <span>{{ dayData.location || "Localisation non définie" }}</span>
            </LPopup>
          </LMarker>
        </LMap>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* Styles généraux pour la carte */
.leaflet-container {
  border-radius: 16px; /* Bords arrondis pour la carte */
}

.leaflet-tile {
  border-radius: 16px !important; /* Assurer que les tuiles ont des bords arrondis */
}

</style>
