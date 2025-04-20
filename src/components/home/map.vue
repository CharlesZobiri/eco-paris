<template>
    <div class="size-full rounded-lg overflow-hidden">
        <l-map :use-global-leaflet="false" ref="map" :zoom="zoom" :center="center">
            <l-tile-layer :url="url"></l-tile-layer>
            <l-geo-json :geojson="geojson" :options="options"></l-geo-json>
        </l-map>
    </div>
</template>

<script lang="ts">
import { LGeoJson, LMap, LTileLayer } from '@vue-leaflet/vue-leaflet';
import 'leaflet/dist/leaflet.css';
import { defineComponent, onMounted, ref } from 'vue';

import type { Feature, FeatureCollection } from 'geojson';

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
            style: function (feature: Feature) {
                return {
                    fillColor: feature.properties?.color,
                    weight: 2,
                    opacity: 1,
                    color: 'white',
                    fillOpacity: 0.7,
                };
            },
            onEachFeature: function (feature: Feature, layer: any) {
                layer.bindPopup(feature.properties?.name);
            },
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

<style>
@import 'leaflet/dist/leaflet.css';
</style>