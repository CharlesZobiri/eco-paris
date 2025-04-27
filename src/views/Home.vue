<template>
  <div class="bg-gradient-to-br from-green-50 to-green-200 h-full">
    <div>
      <Navbar
        logoSrc="/leaf.svg"
        title="Eco-Paris - Tableau de bord"
        :buttons="[
          {
            label: 'Accueil',
            icon: House,
            color: 'bg-green-500',
            to: '/',
          },
          {
            label: 'Comparer',
            icon: ArrowLeftRight,
            color: 'bg-green-800',
            to: '/compare',
          },
        ]"
      />
    </div>

    <div>
      <Day :selectedArrondissement="selectedArrondissement" />
    </div>

    <section class="flex py-4 px-4 gap-8">
      <div class="h-[450px] min-w-1/2">
        <MapParis
          :selectedArrondissement="selectedArrondissement"
          class="border-2 border-green-500"
        />
      </div>
      <div></div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Navbar from "../components/home/navbar.vue";
import Day from "../components/home/day.vue";
import MapParis from "../components/home/map.vue";
import BestDay from "../components/home/bestDay.vue";
import ChartLine from "../components/home/ChartLine.vue";
import ChartBar from "../components/home/ChartBar.vue";
import { ArrowLeftRight, House } from "lucide-vue-next";

const selectedArrondissement = ref("1° Arrondissement");
</script>
