<script setup lang="ts">
import { ArrowLeftRight } from "lucide-vue-next";
import ArrondissementSelect from "@/components/ArrondissementSelect.vue";

defineProps<{
  first: string;
  second: string;
}>();

defineEmits(["update:first", "update:second", "swap"]);
</script>

<template>
  <div
    class="w-full max-w-4xl bg-white rounded-2xl p-8 shadow-xl border border-green-300"
  >
    <h2 class="text-3xl font-bold text-green-800 mb-8 text-center">
      Sélectionnez deux arrondissements à comparer
    </h2>
    <div class="flex flex-row items-center gap-10">
      <div class="w-2/5">
        <ArrondissementSelect
          :model-value="first"
          label="Premier arrondissement"
          @update:modelValue="$emit('update:first', $event)"
        />
      </div>
      <button
        @click="$emit('swap')"
        class="flex justify-center items-center p-6 rounded-full bg-green-100 hover:bg-green-300 text-green-700 shadow-lg"
        title="Inverser les arrondissements"
      >
        <ArrowLeftRight class="h-8 w-8" />
      </button>
      <div class="w-2/5">
        <ArrondissementSelect
          :model-value="second"
          label="Second arrondissement"
          @update:modelValue="$emit('update:second', $event)"
        />
      </div>
    </div>
  </div>
</template>
