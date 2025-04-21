<template>
    <div class="size-full rounded-lg overflow-hidden">
      <l-map :use-global-leaflet="false" ref="map" :zoom="zoom" :center="center">
        <l-tile-layer :url="url" />
        <l-geo-json :geojson="geojson" :options="options" />
      </l-map>
    </div>
  </template>
  
  <script lang="ts">
  import { LGeoJson, LMap, LTileLayer } from '@vue-leaflet/vue-leaflet';
  import 'leaflet/dist/leaflet.css';
  import { defineComponent, onMounted, ref } from 'vue';
  import type { FeatureCollection, Feature } from 'geojson';
  
  export default defineComponent({
    name: 'MapParis',
    components: {
      LMap,
      LTileLayer,
      LGeoJson,
    },
    setup() {
      const geojson = ref<FeatureCollection | null>(null);
      const zoom = ref<number>(12);
      const center = ref<[number, number]>([48.8566, 2.3522]);
      const url = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
  
      const options = {
        style: function (feature: any) {
          return {
            fillColor: feature.properties?.color || '#3388ff',
            weight: 2,
            opacity: 1,
            color: 'white',
            fillOpacity: 0.7,
          };
        },
        onEachFeature: function (feature: Feature, layer: any) {
          const arrondissement = feature.properties?.name || "N/A";
          layer.bindTooltip(arrondissement, {
            permanent: true,
            direction: 'center',
            className: 'arrondissement-label'
          });
        }
      };
  
      onMounted(() => {
        fetch('/arrondissements.geojson')
          .then(response => response.json())
          .then(data => {
            geojson.value = data;
          })
          .catch(error => {
            console.error('Erreur lors de la récupération du GeoJSON:', error);
          });
      });
  
      return { geojson, zoom, center, url, options };
    },
  });
  </script>
  
  <style scoped>
  @import 'leaflet/dist/leaflet.css';
  
  .arrondissement-label {
    background: transparent;
    border: none;
    color: white;
    font-weight: bold;
    text-shadow: 1px 1px 2px black;
    font-size: 14px;
  }
  </style>
