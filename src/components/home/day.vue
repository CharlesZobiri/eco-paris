<script setup lang="ts">
import componentDay from "./componentDay.vue";
defineProps<{ selectedArrondissement: string }>();
</script>

<template>
  <div class="flex items-center justify-between px-6 py-4 bg-green-300">
    <h1 class="text-xl font-bold text-green-500">Qualité de l'air à Paris</h1>
    <div class="flex flex-col items-end">
      <componentDay />
      <p class="mt-2 text-lg font-semibold text-green-800">
        {{ selectedArrondissement }}
      </p>
    </div>
  </div>
</template>
