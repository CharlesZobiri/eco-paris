<template>
    <div class="w-[95%] p-4 elevation-0 rounded-0 border-none bg-gradient-to-r from-white via-white/25 to-[#1E1E1E]">
        <div class="flex flex-row justify-between mx-6">
            <div class="flex items-center justify-center">
                <h1 class="font-bold text-3xl text-black">Qualité de l'air à Paris</h1>
            </div>
            <div class="flex flex-col items-center justify-end">
<<<<<<< HEAD
                <p class="text-center text-xl">{{ currentDate }}</p>
=======
                <p class="text-center">Le vendredi 24 avril</p>
>>>>>>> 537be42 (feat: front page dashboard)
                <p class="font-bold text-2xl">3° Arrondissement</p>
            </div>
        </div>
    </div>
</template>

<<<<<<< HEAD
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
=======
<script lang="ts">
export default {
    name: "Day"
}
>>>>>>> 537be42 (feat: front page dashboard)
</script>
