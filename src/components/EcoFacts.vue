<template>
  <div
    class="w-full h-full flex flex-col justify-between p-8 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl space-y-4 animate-fade-in"
  >
    <div>
      <h2
        class="text-4xl font-bold text-green-800 mb-6 flex items-center gap-2"
      >
        🌍 Le saviez-vous ?
      </h2>
      <h3
        class="text-2xl font-semibold text-green-700 mb-4 text-center mx-auto max-w-2xl"
      >
        {{ currentFact.fact }}
      </h3>

      <p class="max-w-[90%] text-green-600 text-base leading-relaxed">
        {{ currentFact.detail }}
      </p>
    </div>
    <div class="flex justify-center mt-8">
      <button
        @click="getRandomFact"
        class="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full shadow-md hover:scale-105 active:scale-95 transition transform duration-300"
      >
        🔄 Nouveau fait
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface EcoFact {
  fact: string;
  detail: string;
}

const ecoFacts: EcoFact[] = [
  {
    fact: "Un arbre adulte peut absorber jusqu'à 20 kg de CO₂ par an.",
    detail:
      "Les arbres jouent un rôle fondamental dans la lutte contre le réchauffement climatique. En absorbant le dioxyde de carbone présent dans l'atmosphère, ils agissent comme des puits de carbone naturels. Planter et protéger les arbres est donc une action concrète pour réduire notre empreinte carbone au quotidien.",
  },
  {
    fact: "Recycler une tonne de papier permet d’économiser 17 arbres.",
    detail:
      "Chaque feuille recyclée contribue à préserver nos forêts, véritables poumons verts de la planète. En plus de sauver des arbres, le recyclage du papier réduit aussi la consommation d'eau, d'énergie et les émissions de gaz à effet de serre nécessaires à la production de papier neuf.",
  },
  {
    fact: "L'énergie solaire d'une heure pourrait alimenter la Terre pendant un an.",
    detail:
      "Chaque jour, la Terre reçoit une quantité incroyable d'énergie solaire gratuite. Pourtant, une infime partie seulement est captée pour produire de l'électricité. Investir dans les énergies renouvelables comme le solaire est crucial pour construire un futur énergétique propre et durable.",
  },
  {
    fact: "La production d'un jean nécessite environ 7 000 litres d'eau.",
    detail:
      "Entre la culture du coton, la teinture et le traitement du tissu, fabriquer un simple jean consomme une quantité d'eau hallucinante. Cela souligne l'importance de choisir des vêtements plus responsables, de recycler nos habits ou de privilégier la seconde main pour réduire cet énorme gaspillage.",
  },
  {
    fact: "Le plastique met entre 100 et 1 000 ans à se décomposer.",
    detail:
      "Les déchets plastiques polluent durablement les sols, les rivières et les océans. Même invisibles à l'œil nu une fois fragmentés, ils continuent de nuire à la biodiversité. Réduire notre utilisation de plastique à usage unique est un geste clé pour préserver notre environnement.",
  },
  {
    fact: "Les océans absorbent environ 25% du CO₂ émis chaque année par l’homme.",
    detail:
      "En captant une partie de nos émissions de carbone, les océans freinent le réchauffement climatique. Cependant, cette absorption entraîne leur acidification, perturbant gravement les écosystèmes marins. Protéger les océans revient à protéger l'équilibre climatique de la planète entière.",
  },
  {
    fact: "Une voiture électrique produit en moyenne 3 fois moins de CO₂ qu'une voiture thermique.",
    detail:
      "Même en prenant en compte la fabrication des batteries, les véhicules électriques ont un impact environnemental bien moindre sur toute leur durée de vie. Le passage à l'électrique, combiné à des sources d'énergie renouvelable, est essentiel pour décarboner nos modes de transport.",
  },
  {
    fact: "La Terre a perdu 68% de ses populations d’animaux sauvages en moins de 50 ans.",
    detail:
      "Cette chute vertigineuse est principalement due à la destruction des habitats, la pollution, le braconnage et le changement climatique. Préserver la biodiversité n'est pas seulement vital pour les animaux : c'est aussi essentiel pour l'équilibre des écosystèmes dont dépend l'humanité.",
  },
  {
    fact: "Planter un arbre peut produire suffisamment d'oxygène pour 2 personnes par an.",
    detail:
      "Au-delà de leur rôle esthétique ou symbolique, les arbres sont de véritables producteurs d'oxygène. Chaque plantation compte, et multiplier les projets de reforestation est une stratégie efficace pour améliorer la qualité de l'air et lutter contre les effets du réchauffement climatique.",
  },
  {
    fact: "Les transports sont responsables de 30% des émissions de CO₂ en Europe.",
    detail:
      "Les transports représentent une part importante des gaz à effet de serre émis par l'homme. Réduire notre dépendance aux véhicules individuels et favoriser les transports en commun, le vélo ou la marche peut significativement réduire notre empreinte carbone.",
  },

  {
    fact: "La pollution de l'air tue environ 7 millions de personnes par an dans le monde.",
    detail:
      "Invisible mais omniprésente, la pollution atmosphérique est responsable de maladies respiratoires, cardiovasculaires et même de cancers. Améliorer la qualité de l'air est donc un enjeu majeur de santé publique, au même titre que l'accès à l'eau potable ou à une alimentation saine.",
  },
  {
    fact: "Les niveaux élevés de pollution de l'air peuvent réduire l'espérance de vie de plusieurs années.",
    detail:
      "La pollution de l'air ne se limite pas seulement à nuire à notre santé immédiate. Elle a également un impact à long terme, en réduisant l'espérance de vie moyenne dans les zones les plus touchées. Réduire la pollution de l'air pourrait augmenter la qualité de vie de millions de personnes dans le monde.",
  },
  {
    fact: "Les arbres améliorent la qualité de l'air en filtrant les polluants.",
    detail:
      "Les arbres agissent comme des filtres naturels en captant les particules fines et autres polluants présents dans l'air. En plus de leur rôle de stockage du carbone, leur présence dans les villes permet de réduire la concentration de polluants et d'améliorer la santé publique.",
  },
  {
    fact: "La pollution de l'air peut provoquer des problèmes de développement chez les enfants.",
    detail:
      "Les enfants qui grandissent dans des environnements à forte pollution de l'air peuvent développer des problèmes respiratoires et d'autres troubles de la santé. L'exposition à ces polluants peut affecter leur développement pulmonaire et augmenter les risques de maladies chroniques à long terme.",
  },
  {
    fact: "Les véhicules à moteur sont l'une des principales sources de pollution de l'air en milieu urbain.",
    detail:
      "Les gaz d'échappement des véhicules à essence ou diesel libèrent des substances polluantes telles que le dioxyde d'azote (NO₂) et les particules fines, qui sont responsables de la détérioration de la qualité de l'air dans les grandes villes. Passer à des véhicules électriques et encourager les transports publics pourrait grandement améliorer la situation.",
  },
  {
    fact: "Les incendies de forêt augmentent la pollution de l'air.",
    detail:
      "Les incendies de forêt sont une source majeure de pollution de l'air, libérant d'énormes quantités de particules fines et d'autres polluants dans l'atmosphère. Ces événements, souvent exacerbés par le changement climatique, affectent la qualité de l'air sur de vastes territoires.",
  },
  {
    fact: "Les filtres à air dans les maisons peuvent améliorer la qualité de l'air intérieur.",
    detail:
      "Utiliser des filtres à air dans les maisons et bureaux peut aider à réduire les niveaux de pollution de l'air intérieur, qui peuvent être jusqu'à 5 fois plus élevés que l'air extérieur. Ces filtres captent les particules fines, le pollen et d'autres polluants pour créer un environnement plus sain.",
  },
  {
    fact: "La pollution de l'air est liée à des maladies chroniques telles que l'asthme et les maladies cardiaques.",
    detail:
      "L'exposition à long terme à des niveaux élevés de pollution de l'air peut entraîner des maladies respiratoires chroniques, des problèmes cardiaques et même des cancers. Il est essentiel de prendre des mesures pour limiter cette pollution et protéger la santé publique.",
  },
  {
    fact: "Les niveaux de pollution de l'air sont souvent plus élevés à proximité des routes principales.",
    detail:
      "Les zones proches des grandes routes et autoroutes sont particulièrement exposées à la pollution de l'air due au trafic intense. Installer des barrières anti-pollution, planter des arbres et favoriser la circulation des transports publics peut aider à réduire cette pollution localisée.",
  },
  {
    fact: "Les bâtiments verts avec des plantes intérieures peuvent améliorer la qualité de l'air.",
    detail:
      "Intégrer des plantes à l'intérieur des bâtiments, en particulier dans les espaces urbains, peut réduire les niveaux de dioxyde de carbone et d'autres polluants, tout en augmentant le bien-être des occupants. Les jardins intérieurs et les murs végétaux contribuent également à créer des espaces plus agréables et sains.",
  },
  {
    fact: "Les masques peuvent protéger contre les particules fines dans l'air.",
    detail:
      "Dans les zones où la pollution de l'air est élevée, les masques peuvent aider à réduire l'exposition aux particules fines, particulièrement dangereuses pour la santé respiratoire. Cependant, les solutions à long terme nécessitent des efforts pour réduire la pollution à la source.",
  },
  {
    fact: "Les niveaux de pollution de l'air sont plus élevés pendant les mois d'hiver.",
    detail:
      "Durant l'hiver, la pollution de l'air peut atteindre des niveaux plus élevés en raison de l'usage accru de chauffages et de l'augmentation du trafic. Cela entraîne une concentration plus importante de polluants dans les zones urbaines, ce qui affecte la qualité de l'air et la santé des populations.",
  },
  {
    fact: "Les allergies saisonnières peuvent être aggravées par la pollution de l'air.",
    detail:
      "La pollution de l'air, combinée aux allergènes comme le pollen, peut exacerber les symptômes des allergies saisonnières. Les personnes sensibles aux pollens peuvent souffrir davantage en présence de niveaux élevés de pollution.",
  },
];

const currentFact = ref(getRandomFactValue());

function getRandomFactValue() {
  const randomIndex = Math.floor(Math.random() * ecoFacts.length);
  return ecoFacts[randomIndex];
}

function getRandomFact() {
  currentFact.value = getRandomFactValue();
}
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out;
}
</style>
