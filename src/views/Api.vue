<script setup lang="ts">
import "@/style.css";
import { House } from "lucide-vue-next";
import { useRouter } from "vue-router";
import { getAirQualityByCommune } from "@/services/airparif";
import { onMounted, ref, computed, watch } from "vue";
import AirQualityDisplay from "@/components/AirQualityDisplay.vue";
import Loader from "@/components/Loader.vue"; // Importer le composant Loader
import { arrondissements } from "@/data/arrondissements";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const isLoading = ref(false);

const router = useRouter();
function goToLanding() {
  router.push("/");
}

const airQualityData = ref<any>(null);
const searchQuery = ref<string>("");
const fallbackInsee = "75115";

const activeInsee = computed(() =>
  searchQuery.value && /^\d{5}$/.test(searchQuery.value)
    ? searchQuery.value
    : fallbackInsee
);

const airQualityIndices = computed(() => {
  if (!airQualityData.value || !airQualityData.value[activeInsee.value])
    return null;
  return airQualityData.value[activeInsee.value];
});

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);
const tomorrowKey = tomorrow.toISOString().split("T")[0]; // format "YYYY-MM-DD"

const isTomorrowDataMissing = computed(() => {
  const hasTomorrowData = (data: any[]) => {
    if (!data || !Array.isArray(data)) return false;
    return data.some((item) => item.date === tomorrowKey);
  };
  return !hasTomorrowData(airQualityIndices.value);
});

const fetchAirQualityData = async () => {
  isLoading.value = true;
  try {
    airQualityData.value = await getAirQualityByCommune(activeInsee.value);
    console.log("Données reçues:", airQualityData.value);
  } catch (error) {
    console.error("Erreur dans le composant:", error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchAirQualityData);
watch(searchQuery, fetchAirQualityData);
</script>

<template>
  <section
    class="flex flex-col items-center gap-8 p-6 bg-gradient-to-br from-green-50 to-green-100 min-h-screen"
  >
    <div class="flex w-full justify-between items-center">
      <h1 class="text-3xl font-bold text-green-700">
        Qualité de l'air de Paris {{ activeInsee }}
      </h1>
      <button
        @click="goToLanding"
        class="flex gap-2 justify-center text-center items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition min-w-56"
      >
        <House /> Accueil
      </button>
    </div>

    <div
      v-if="isTomorrowDataMissing && !isLoading"
      class="bg-yellow-100 text-yellow-800 px-4 py-3 rounded-xl shadow-md text-center"
    >
      ℹ️ Les prévisions pour le <strong>lendemain</strong> ne sont pas encore
      disponibles.
    </div>

    <div class="relative w-full max-w-sm items-center">
      <Select v-model="searchQuery">
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

    <Loader :isLoading="isLoading" />
    <AirQualityDisplay
      v-if="airQualityIndices"
      :data="airQualityIndices"
      class="max-w-1/2"
    />
  </section>
</template>
