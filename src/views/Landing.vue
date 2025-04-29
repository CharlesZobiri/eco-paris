<script setup lang="ts">
import "@/style.css";
import { LayoutDashboard, ArrowLeftRight } from "lucide-vue-next";
import LandingCard from "@/components/LandingCard.vue";
import { useRouter } from "vue-router";

const router = useRouter();

function goToCompare() {
  router.push("/compare");
}
function goToHome() {
  router.push("/home");
}
</script>

<template>
  <header>
    <div
      class="flex flex-col gap-8 text-center items-center justify-center h-screen bg-gradient-to-br from-green-50 to-green-200 p-12"
    >
      <h1 class="text-3xl font-bold text-green-500 pt-30">
        Eco-Paris - L'incateur écologique <br />de vos arrondissements
      </h1>
      <h2 class="text-2xl text-green-800">
        Analyse de la qualité de l'air de votre arrondissement
      </h2>
      <div class="flex text-xl text-center gap-4 text-white mt-2">
        <button
          @click="goToHome"
          class="flex gap-2 justify-center items-center text-center bg-green-500 min-w-56"
        >
          <LayoutDashboard />Tableau de bord
        </button>
        <button
          @click="goToCompare"
          class="flex gap-2 justify-center items-center text-center bg-green-800 min-w-56"
        >
          <ArrowLeftRight />Comparer
        </button>
      </div>

      <div class="flex gap-8 text-center items-center justify-center mt-16">
        <LandingCard
          class="w-1/3"
          name="Qualité de l'air"
          description="Consulter les prévisions de qualité de l'air pour chaque arrondissement de Paris."
          icon="Wind"
        />

        <LandingCard
          class="w-1/3"
          name="Carte interactive"
          description="Explorer l'incide de pollution de l'air de chaque arrondissement de Paris."
          icon="Map"
        />

        <LandingCard
          class="w-1/3"
          name="Statistiques"
          description="Suivez l'évolution des indicateurs écologiques au fil du temps."
          icon="ChartSpline"
        />
      </div>
    </div>
  </header>
</template>
