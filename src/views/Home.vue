<template>
  <div class="flex flex-col items-center justify-start h-screen mx-2 bg-black rounded-xl overflow-hidden">
    <Navbar />
    <Day :selectedArrondissement="selectedArrondissement" />

    <div class="flex flex-row w-[95%] h-[60%] backgroundColorPage space-x-2">
      <div class="w-[60%] h-full flex justify-center items-center">
        <div class="w-[95%] h-[95%] elevation-0 rounded-0 border-none">
          <MapParis @arrondissement-selected="selectedArrondissement = $event" />
        </div>
      </div>
      <div class="w-[40%] h-full">
        <BestDay />
      </div>
    </div>

    <div class="flex flex-row w-[95%] h-[30%] backgroundColorPage space-x-2 rounded-b-xl">
      <div class="w-[60%] h-full">
        <ChartLine />
      </div>
      <div class="w-[40%] h-full">
        <ChartBar />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Navbar from "../components/home/navbar.vue";
import Day from "../components/home/day.vue";
import MapParis from "../components/home/map.vue";
import BestDay from "../components/home/bestDay.vue";
import ChartLine from "../components/home/ChartLine.vue";
import ChartBar from "../components/home/ChartBar.vue";

const selectedArrondissement = ref('1° Arrondissement');
</script>

<style scoped>
.background {
  background-color: #1e1e1e;
}

.backgroundColorPage {
  background-color: #2a2a2a;
}
</style>
