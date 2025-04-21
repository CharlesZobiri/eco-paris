<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { ArrowLeftRight, Wind } from "lucide-vue-next";
import { arrondissements } from "@/data/arrondissements";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const firstArrondissement = ref("75101");
const secondArrondissement = ref("75115");

const router = useRouter();
function goToLanding() {
  router.push("/Home");
}
</script>

<template>
  <section
    class="flex flex-col items-center gap-12 p-12 bg-gradient-to-br from-green-50 to-green-100 min-h-screen"
  >
    <header class="flex w-full justify-between items-center mb-8">
      <h1 class="text-3xl font-bold text-green-500">
        Comparaison de la qualité de l'air
      </h1>
      <button
        @click="goToLanding"
        class="flex gap-2 justify-center text-center items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 min-w-56"
      >
        <Wind /> Accueil
      </button>
    </header>

    <div
      class="w-full max-w-4xl bg-white rounded-2xl p-8 shadow-xl border border-green-300"
    >
      <h2 class="text-3xl font-bold text-green-800 mb-8 text-center">
        Sélectionnez deux arrondissements à comparer
      </h2>

      <div class="flex flex-row items-center gap-10">
        <div class="w-2/5">
          <label
            for="first-arrondissement"
            class="block text-lg font-medium text-gray-700 mb-4"
          >
            Premier arrondissement
          </label>
          <Select v-model="firstArrondissement">
            <SelectTrigger
              class="w-full border-2 justify-center text-center items-center border-green-300 rounded-2xl p-3 text-lg focus:ring-3 focus:ring-green-300"
            >
              <SelectValue placeholder="Sélectionnez un arrondissement" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                v-for="arr in arrondissements"
                :key="arr.insee"
                :value="arr.insee"
              >
                {{ arr.name }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <button
          class="flex justify-center items-center p-6 rounded-full bg-green-100 hover:bg-green-300 text-green-700 shadow-lg"
          title="Inverser les arrondissements"
        >
          <ArrowLeftRight class="h-8 w-8" />
        </button>

        <div class="w-2/5">
          <label
            for="second-arrondissement"
            class="block text-lg font-medium text-gray-700 mb-4"
          >
            Second arrondissement
          </label>
          <Select v-model="secondArrondissement">
            <SelectTrigger
              class="w-full border-2 justify-center text-center items-center border-green-300 rounded-2xl p-3 text-lg focus:ring-3 focus:ring-green-300"
            >
              <SelectValue placeholder="Sélectionnez un arrondissement" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                v-for="arr in arrondissements"
                :key="arr.insee"
                :value="arr.insee"
              >
                {{ arr.name }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  </section>
</template>
