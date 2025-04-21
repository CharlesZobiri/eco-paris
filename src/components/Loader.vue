<template>
  <div
    v-if="isLoading"
    class="flex flex-col items-center justify-center py-14 space-y-6"
  >
    <div
      class="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-green-500 mb-6"
    ></div>
    <p class="text-xl text-green-700 font-semibold">
      Chargement des données...
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps({
  isLoading: {
    type: Boolean,
    required: true,
  },
});
</script>
