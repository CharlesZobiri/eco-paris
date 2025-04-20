<template>
    <div class="p-4 shadow-sm">
        <div class="flex flex-col text-start gap-2">
            <h1 class="text-2xl font-semibold text-white">Meilleur moment pour sortir</h1>
            <p class="text-lg font-medium text-white">{{ currentDate }}</p>
            <p class="text-sm text-white">
                Le quartier le moins pollué sera le <strong>15e</strong> (Indice de pollution : <strong>41</strong>)
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const currentDate = ref('')

onMounted(() => {
    const today = new Date()
    currentDate.value = today.toLocaleDateString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
})
</script>