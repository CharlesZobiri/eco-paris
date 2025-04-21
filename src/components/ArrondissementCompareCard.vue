<script setup lang="ts">
import AirQualityDisplay from "@/components/AirQualityDisplay.vue";
defineProps<{
  name: string;
  data: any;
}>();
</script>

<template>
  <div class="space-y-8">
    <h2
      class="text-3xl font-bold text-green-700 bg-green-100 p-6 rounded-xl text-center shadow-xl"
    >
      {{ name }}
    </h2>
    <AirQualityDisplay v-if="data" :data="data" />
    <p v-else class="text-gray-600 text-center">Aucune donnée disponible</p>
  </div>
</template>
