<template>
    <div class="p-4 shadow-sm">
        <div class="flex flex-col text-start gap-2">
            <h1 class="text-2xl font-semibold text-white">Meilleur moment pour sortir</h1>
            <componentDay />
            <p class="text-sm text-white">
                Le quartier le moins pollué sera le <strong>15e</strong> (Indice de pollution : <strong>41</strong>)
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import componentDay from './componentDay.vue'
</script>