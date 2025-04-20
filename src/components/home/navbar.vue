<template>
    <div class="flex flex-row justify-between card-container w-[95%] rounded-t-xl shadow-sm">
        <div class="flex flex-row ml-7">
            <img src="../../../public/leaf.svg" alt="Logo" class="w-8" />

        </div>
        <div class="flex flex-row gap-7 items-center justify-between">
            <button class="text-md text-white" @click="goToHome">Dashboard</button>
            <button class="text-md text-white" @click="goToCompare">Comparaison</button>
        </div>
    </div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router';

export default {
    name: "Navbar",
    setup() {
        const router = useRouter();

        const goToCompare = () => {
            router.push("/compare");
        };

        const goToHome = () => {
            router.push("/home");
        };

        return {
            goToCompare,
            goToHome
        };
    }
}
</script>

<style scoped>
.card-container {
    background-color: #1E1E1E;
    padding: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}


</style>
