<script setup lang="ts">
import "@/style.css";
import { Wind, HardDriveDownload } from "lucide-vue-next";
import { useRouter } from "vue-router";

const router = useRouter();

function goToApi() {
  router.push("/api");
}
function goToHome() {
  router.push("/home");
}
</script>

<template>
  <header>
    <div
      class="flex flex-col gap-8 text-center items-center justify-center h-screen bg-pink-200"
    >
      <h1 class="text-3xl font-bold text-green-500">
        Eco-Paris - L'incateur écologique <br />de vos arrondissements
      </h1>
      <h2 class="text-2xl text-green-500">
        Analyse de l'impact écologique de votre arrondissement
      </h2>
      <div class="flex text-xl text-center gap-4 text-white">
        <button
          @click="goToHome"
          class="flex gap-2 justify-center items-center text-center bg-green-500 rounded-lg w-56"
        >
          <Wind />Page Accueil
        </button>
        <button
          @click="goToApi"
          class="flex gap-2 justify-center items-center text-center bg-green-800 rounded-lg w-56"
        >
          <HardDriveDownload />Page Api
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped></style>
