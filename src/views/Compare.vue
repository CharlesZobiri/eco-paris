<script setup lang="ts">
import { onMounted, ref, watch, computed } from "vue";
import { useRouter } from "vue-router";
import { ArrowLeftRight, Wind } from "lucide-vue-next";
import { arrondissements } from "@/data/arrondissements";
import { getAirQualityByCommune } from "@/services/airparif";
import AirQualityDisplay from "@/components/AirQualityDisplay.vue";
import Loader from "@/components/Loader.vue";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const firstArrondissement = ref("75101");
const secondArrondissement = ref("75115");
const firstArrondissementData = ref<any[]>([]);
const secondArrondissementData = ref<any[]>([]);
const isLoading = ref(false);

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);
const tomorrowKey = tomorrow.toISOString().split("T")[0];

const getArrondissementName = (insee: string): string => {
  const arr = arrondissements.find((a) => a.insee === insee);
  return arr ? arr.name : insee;
};

const getArrondissementCoordinates = (insee: string): [number, number] | null => {
  const arr = arrondissements.find((a) => a.insee === insee);
  return arr ? [arr.lat, arr.lng] : null;
};
const swapArrondissements = () => {
  const temp = firstArrondissement.value;
  firstArrondissement.value = secondArrondissement.value;
  secondArrondissement.value = temp;
};

const fetchAirQualityData = async () => {
  isLoading.value = true;
  try {
    const [first, second] = await Promise.all([
      getAirQualityByCommune(firstArrondissement.value),
      getAirQualityByCommune(secondArrondissement.value),
    ]);
    firstArrondissementData.value = first[firstArrondissement.value];
    secondArrondissementData.value = second[secondArrondissement.value];
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
  } finally {
    isLoading.value = false;
  }
};

const isTomorrowDataMissing = computed(() => {
  const hasTomorrowData = (data: any[]) => {
    if (!data || !Array.isArray(data)) return false;
    const found = data.some((item) => item.date === tomorrowKey);
    return found;
  };

  const result =
    !hasTomorrowData(firstArrondissementData.value) ||
    !hasTomorrowData(secondArrondissementData.value);
  return result;
});

watch([firstArrondissement, secondArrondissement], fetchAirQualityData);
onMounted(fetchAirQualityData);

const router = useRouter();
function goToLanding() {
  router.push("/Home");
}
</script>

<template>
  <section
    class="flex flex-col items-center gap-8 p-12 bg-gradient-to-br from-green-50 to-green-100 min-h-screen"
  >
    <header class="flex w-full justify-between items-center">
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

    <Loader :isLoading="isLoading" />

    <div
      v-if="!isLoading"
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
              class="w-full border-2 justify-center text-center items-center border-green-300 rounded-2xl p-3 text-lg ring-2 ring-green-300"
            >
              <SelectValue placeholder="Sélectionnez un arrondissement" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                v-for="arrondissement in arrondissements"
                :key="arrondissement.insee"
                :value="arrondissement.insee"
              >
                {{ arrondissement.name }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <button
          @click="swapArrondissements"
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
              class="w-full border-2 justify-center text-center items-center border-green-300 rounded-2xl p-3 text-lg ring-2 ring-green-300"
            >
              <SelectValue placeholder="Sélectionnez un arrondissement" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                v-for="arrondissement in arrondissements"
                :key="arrondissement.insee"
                :value="arrondissement.insee"
              >
                {{ arrondissement.name }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>

    <div
      v-if="!isLoading && isTomorrowDataMissing"
      class="bg-yellow-100 text-yellow-800 px-4 py-3 rounded-xl shadow-md text-center"
    >
      ℹ️ Les prévisions pour le <strong>lendemain</strong> ne sont pas encore
      disponibles.
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 w-full">
      <div class="space-y-8">
        <h2
          class="text-3xl font-bold text-green-700 bg-green-100 p-6 rounded-xl text-center shadow-xl mb-2"
        >
          {{ getArrondissementName(firstArrondissement) }}
        </h2>
        <AirQualityDisplay
          v-if="firstArrondissementData"
          :data="firstArrondissementData"
          :center="getArrondissementCoordinates(firstArrondissement)"
          :selectedArrondissement="getArrondissementName(firstArrondissement)"
        />
        <p v-else class="text-gray-600 text-center">Aucune donnée disponible</p>
      </div>

      <div class="space-y-8">
        <h2
          class="text-3xl font-bold text-green-700 bg-green-100 p-6 rounded-xl text-center shadow-xl mb-2"
        >
          {{ getArrondissementName(secondArrondissement) }}
        </h2>
        <AirQualityDisplay
          v-if="secondArrondissementData"
          :data="secondArrondissementData"
          :center="getArrondissementCoordinates(secondArrondissement)"
          :selectedArrondissement="getArrondissementName(secondArrondissement)"
        />
        <p v-else class="text-gray-600 text-center">Aucune donnée disponible</p>
      </div>
    </div>
  </section>
</template>
