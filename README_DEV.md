# Eco-Paris

## 1. Technos et dépendances du projet :

- Vue.js : 3.5.13
- Vite : 6.3.1
- TailwindCSS avec Vite : 4.1.4
- Lucide-Vue-Next : 0.488.0
- TypeScript : 5.7.2
- ShadCn/Vue

## 2. Penses à faire `npm install` pour installer les dépendances du projet.

## 3. Pour lancer le projet en mode développement, utilise la commande `npm run dev`.

## 4. Utiliser les dépendances :

- Les composnats et autres :

  Par exemple pour utiliser un composant Button de ShadCn/Vue :
  https://www.shadcn-vue.com/docs/components/button

  Les étapes :

  - Installer la dépendance : `npx shadcn-vue@latest add nom_du_composant` (ici `button`)

  - Tu l'importes dans la balise script :

    ```vue
    <script setup lang="ts">
    import { Button } from "@/components/ui/button";
    </script>
    ```

  - Et après tu l'appelles dans la balise template :
    ```vue
    <template>
      <Button>Button</Button>
    </template>
    ```

- Pour les icones :
  https://lucide.dev/icons/

  Les étapes :

  - Tu importes dans la balise script :

  ```vue
  <script setup>
  import { nom_du_composant } from "lucide-vue-next"; // ici Camera
  </script>
  ```

  - Et après tu l'appelles dans la balise template :

  ```vue
  <template>
    <Camera />
  </template>
  ```

  - Après tu peux la personnaliser :

  ```vue
  <template>
    <Camera color="red" :size="32" />
  </template>
  ```
