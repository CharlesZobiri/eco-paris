<template>
    <div class="w-full h-full relative">
        <canvas id="chartbar" class="w-full h-full"></canvas>
    </div>
</template>

<script setup lang="ts">
import Chart from 'chart.js/auto';
import { onMounted } from 'vue';

onMounted(() => {
    const ctx = document.getElementById('chartbar') as HTMLCanvasElement;

    if (ctx) {
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: 'Comparaison par arrondissement',
                    data: [12, 19, 3, 5, 2, 3],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    } else {
        console.error('Canvas element not found');
    }
});
</script>
