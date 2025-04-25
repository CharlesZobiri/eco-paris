<script setup lang="ts">
import * as icons from "lucide-vue-next";
import { computed, defineProps } from "vue";

const props = defineProps<{
  name: string;
  description: string;
  icon: string;
}>();

const IconComponent = computed(() => {
  return (icons[props.icon as keyof typeof icons] ?? icons.HelpCircle) as any;
});
</script>

<template>
  <div
    class="bg-white rounded-2xl p-6 shadow-sm border-2 max-w-84 border-green-200 transition hover:scale-[1.02] hover:shadow-2xl h-72"
  >
    <div class="flex flex-col items-center justify-center mb-4 gap-10">
      <component
        :is="IconComponent"
        class="w-18 h-18 text-green-600 bg-green-100 rounded-full p-4"
      />
      <h2 class="text-2xl font-bold text-green-700">{{ name }}</h2>
    </div>
    <p class="text-gray-700 text-center mb-4">{{ description }}</p>
  </div>
</template>
