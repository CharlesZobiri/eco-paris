<script setup lang="ts">
import "@/style.css";
import { House, Search } from "lucide-vue-next";
import { useRouter } from "vue-router";
import { getAirQualityByCommune } from "@/services/airparif";
import { onMounted, ref, computed, watch } from "vue";
import { Input } from "@/components/ui/input";
import AirQualityDisplay from "@/components/AirQualityDisplay.vue";

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

const fetchAirQualityData = async () => {
  try {
    airQualityData.value = await getAirQualityByCommune(activeInsee.value);
    console.log("Données reçues:", airQualityData.value);
  } catch (error) {
    console.error("Erreur dans le composant:", error);
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
    <div class="relative w-full max-w-sm items-center">
      <Input
        id="search"
        type="text"
        v-model="searchQuery"
        placeholder="Code INSEE (ex: 75115)"
        class="pl-10 pr-4 py-2 bg-white border-2 border-green-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-green-700 transition"
        maxlength="5"
        pattern="\d{5}"
      />
      <span
        class="absolute left-2 inset-y-0 flex items-center justify-center text-green-500"
      >
        <Search class="size-6" />
      </span>
    </div>
    <AirQualityDisplay v-if="airQualityIndices" :data="airQualityIndices" />
    <p v-else class="text-gray-600">En attente des données...</p>
  </section>
</template>
