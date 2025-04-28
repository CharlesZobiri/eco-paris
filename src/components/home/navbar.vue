<script setup lang="ts">
import { useRouter } from "vue-router";
import type { FunctionalComponent } from "vue";

defineProps<{
  title: string;
  titleColor?: string;
  logoSrc: string;
  buttons: {
    label: string;
    icon: FunctionalComponent;
    color: string;
    to: string;
  }[];
}>();

const router = useRouter();
const navigate = (path: string) => {
  router.push(path);
};
</script>

<template>
  <nav
    class="flex justify-between w-full px-6 py-4 border-b-2"
    :class="titleColor ?? 'bg-green-100'"
  >
    <header
      class="flex items-center gap-2 font-bold text-2xl"
      :class="titleColor ? '' : 'text-green-800'"
    >
      <img :src="logoSrc" alt="Logo" class="w-12" />
      {{ title }}
    </header>

    <div class="flex gap-7 items-center justify-between text-white">
      <button
        v-for="(button, index) in buttons"
        :key="index"
        @click="navigate(button.to)"
        class="flex gap-2 justify-center items-center text-center min-w-56 py-2 rounded-md"
        :class="button.color"
      >
        <component :is="button.icon" />{{ button.label }}
      </button>
    </div>
  </nav>
</template>
