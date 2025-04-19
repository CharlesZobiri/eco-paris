<script setup lang="ts">
import "@/style.css";
import { House } from "lucide-vue-next";
import { useRouter } from "vue-router";

const router = useRouter();

function goToLanding() {
  router.push("/");
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
        class="flex gap-2 justify-center items-center text-center bg-green-700 rounded-lg"
      >
        <House class="" />Page de lancement
      </button>
    </div>
  </section>
</template>

<style></style>
