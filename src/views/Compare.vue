<script setup lang="ts">
import "@/style.css";
import { useRouter } from "vue-router";
import { House } from "lucide-vue-next";

const router = useRouter();

function goToHome() {
  router.push("/Home");
}
</script>

<template>
  <section
    class="flex flex-col gap-8 text-center items-center justify-center h-screen bg-pink-200"
  >
    <h1 class="text-3xl font-bold text-green-500">
      Page de comparaison des arrondissements <br />de l'application Eco-Paris
    </h1>
    <div class="flex text-xl text-center gap-4 text-white">
      <button
        @click="goToHome"
        class="flex gap-2 justify-center items-center text-center bg-green-700 rounded-lg min-w-56"
      >
        <House class="" />Page d'accueil
      </button>
    </div>
  </section>
</template>

<style></style>
