<template>
  <p class="text-xl">{{ currentDate }}</p>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

const currentDate = ref("");

onMounted(() => {
  const today = new Date();
  currentDate.value = today.toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});
</script>
