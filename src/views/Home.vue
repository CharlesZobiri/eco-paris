<script setup lang="ts">
import "@/style.css";
import { House, ArrowLeftRight } from "lucide-vue-next";
import { useRouter } from "vue-router";

const router = useRouter();

function goToLanding() {
  router.push("/");
}
function goToCompare() {
  router.push("/compare");
}
</script>

<template>
  <section
    class="flex flex-col gap-8 text-center items-center justify-center h-screen bg-pink-200"
  >
    <h1 class="text-3xl font-bold text-green-500">
      Page D'accueil <br />de l'application Eco-Paris
    </h1>
    <div class="flex text-xl text-center gap-4 text-white">
      <button
        @click="goToLanding"
        class="flex gap-2 justify-center items-center text-center bg-green-500 rounded-lg min-w-56"
      >
        <House class="" />Page de lancement
      </button>

      <button
        @click="goToCompare"
        class="flex gap-2 justify-center items-center text-center bg-green-800 rounded-lg min-w-56"
      >
        <ArrowLeftRight class="" />Page de comparaison
      </button>
    </div>
  </section>
</template>

<style></style>
