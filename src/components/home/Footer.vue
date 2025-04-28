<template>
  <footer
    class="w-full bg-green-100 py-4 px-4 text-center text-sm text-gray-700 border-t-2"
  >
    <p class="max-w-2xl mx-auto">
      Les données affichées sur cette application sont des
      <strong>prévisions de qualité de l'air</strong> fournies par
      <strong>
        <a
          href="https://www.airparif.asso.fr/"
          target="_blank"
          rel="noopener noreferrer"
          class="text-green-700 underline hover:text-green-900"
        >
          Airparif
        </a> </strong
      >. Elles sont publiées à titre informatif et peuvent être sujettes à des
      variations.
    </p>
    <p class="mt-4">© {{ new Date().getFullYear() }} Eco-Paris</p>
  </footer>
</template>
