// fichier qui sert à définir les types de fichiers que TypeScript ne connait pas
// et de lui dire que les imports de fichiers .vue sont des composants
// obligé sinon ça cause des problemes de compilation
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
