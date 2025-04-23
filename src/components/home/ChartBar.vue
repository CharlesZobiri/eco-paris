<template>
    <div class="w-full h-full relative" >
        <canvas id="chartbar" class="w-full h-full"></canvas>
    </div>
</template>

<script lang="ts">
import { onMounted } from 'vue';
import Chart from 'chart.js/auto';

export default {
    name: "ChartBar",
    setup() {
        onMounted(() => {
            const ctx = document.getElementById('chartbar') as HTMLCanvasElement;

            if (ctx) {
                new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                        datasets: [{
                            label: '# of Votes',
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
    }
};
</script>