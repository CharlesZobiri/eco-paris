<template>
    <div class="w-full h-full relative">
      <canvas ref="canvasRef" class="w-full h-full"></canvas>
    </div>
  </template>
  
  <script lang="ts">
  import { onMounted, ref } from 'vue';
  import Chart from 'chart.js/auto';
  
  export default {
    name: "ChartLine",
    setup() {
      const canvasRef = ref<HTMLCanvasElement | null>(null);
  
      onMounted(() => {
        if (canvasRef.value) {
          new Chart(canvasRef.value, {
            type: 'line',
            data: {
              labels: ['Jan', 'Feb', 'Mar', 'Apr'],
              datasets: [{
                label: 'Indice de pollution journalier',
                data: [12, 19, 3, 5],
                borderWidth: 2,
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                fill: true
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
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
  
      return { canvasRef };
    }
  };
  </script>
  
  <style scoped>
  canvas {
    display: block;
    width: 100% !important;
    height: 100% !important;
  }
  </style>
  