<template>
  <div class="size-full rounded-lg overflow-hidden">
    <l-map :use-global-leaflet="false" ref="map" :zoom="zoom" :center="center">
      <l-tile-layer :url="url" />

      <l-geo-json v-if="geojson" :geojson="geojson" :options="options" />

      <l-marker
        v-for="(marker, index) in arrondissementMarkers"
        :key="index"
        :lat-lng="marker.latlng"
        :icon="createIcon(marker.name)"
        @click="emit('arrondissement-selected', marker.name)"
      />
    </l-map>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { LMap, LTileLayer, LGeoJson, LMarker } from "@vue-leaflet/vue-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { arrondissements } from "@/data/arrondissements";
import type { Feature, FeatureCollection } from "geojson";

const emit = defineEmits(["arrondissement-selected"]);

const geojson = ref<FeatureCollection | undefined>(undefined);
const zoom = ref<number>(12);
const center = ref<[number, number]>([48.8566, 2.3522]);
const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

const arrondissementMarkers = ref<{ latlng: [number, number]; name: string }[]>(
  []
);

const createIcon = (name: string) => {
  return L.divIcon({
    className: "arr-marker",
    html: `<div>${name.split(" ")[0]}</div>`,
  }) as L.Icon<L.IconOptions>;
};

const options = {
  style: function (feature: Feature) {
    return {
      fillColor: feature.properties?.color,
      weight: 2,
      opacity: 1,
      color: "white",
      fillOpacity: 0.7,
    };
  },
  onEachFeature: (feature: Feature, layer: any) => {
    layer.on({
      click: () => {
        const c_ar = feature.properties?.c_ar;
        const match = arrondissements.find((a) => a.c_ar === c_ar);
        if (match) {
          emit("arrondissement-selected", match.name);
        } else {
          console.warn("Arrondissement non trouvé pour c_ar:", c_ar);
        }
      },
    });
  },
};

onMounted(() => {
  fetch("/arrondissements.geojson")
    .then((response) => response.json())
    .then((data) => {
      geojson.value = data;

      arrondissementMarkers.value = data.features
        .map((feature: Feature) => {
          const c_ar = feature.properties?.c_ar;
          const match = arrondissements.find((a) => a.c_ar === c_ar);
          if (!match) return null;

          let coords: number[][] = [];
          if (feature.geometry.type === "Polygon") {
            coords = feature.geometry.coordinates[0];
          } else if (feature.geometry.type === "MultiPolygon") {
            coords = feature.geometry.coordinates[0][0];
          }

          const lats = coords.map((c) => c[1]);
          const lngs = coords.map((c) => c[0]);
          const centerLat = lats.reduce((a, b) => a + b, 0) / lats.length;
          const centerLng = lngs.reduce((a, b) => a + b, 0) / lngs.length;

          return {
            latlng: [centerLat, centerLng] as [number, number],
            name: match.name,
          };
        })
        .filter(Boolean) as { latlng: [number, number]; name: string }[];
    })
    .catch((error) =>
      console.error("Erreur lors de la récupération du GeoJSON:", error)
    );
});
</script>

<style>
.arr-marker {
  color: black;
  font-weight: normal;
  font-size: 18px;
  text-shadow: 1px 1px 2px black;
  padding: 5px;
}
</style>
