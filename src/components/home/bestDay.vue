<template>
  <div class="p-4 shadow-sm text-black w-full">
    <div class="flex flex-col gap-2 text-start">
      <h1 class="text-sm">
        Les prévisons de l'incide de pollution de l'air pour aujourd'hui
      </h1>
      <componentDay />
    </div>
  </div>
</template>

<script setup lang="ts">
import componentDay from "./componentDay.vue";
</script>
