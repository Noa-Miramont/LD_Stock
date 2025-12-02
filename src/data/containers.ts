import { Container } from '../types/container';

export const containers: Container[] = [
  // Conteneur 6 pieds - Occasion
  {
    id: 'cont-6p-occasion',
    type: 'conteneur',
    size: '6 pieds',
    state: 'occasion',
    description: "Conteneur maritime 6 pieds d'occasion, idéal pour le stockage compact et sécurisé. Robuste et pratique, il convient parfaitement pour entreposer du matériel, des outils ou des archives dans les petits espaces.",
    littleDescription: 'Petit conteneur 6 pieds robuste idéal pour du stockage sécurisé.',
    image: '/img/Container_mockup.png',
    dimensions: {
      length: 1.8,
      width: 1.75,
      height: 1.9,
      storageCapacity: 3
    },
    purchasePrice: 1250,
    rentalPrice: null,
    characteristic: {
      first: "Étanche au intempérie",
      second: "Structure robuste en acier",
      third: "Sol en bois contreplaqué",
      fourth: "Sécurisé avec fermeture renforcée",
      fifth: "Certfifié pour usage maritime",
      sixth: "Porte double battante",
    },
    deliveryOptions: {
      purchaseHomeDelivery: true,
      rentalHomeDelivery: true,
      rentalOnSite: false,
    },
  },

  // Conteneur 6 pieds - Neuf
  {
    id: 'cont-6p-neuf',
    type: 'conteneur',
    size: '6 pieds',
    state: 'neuf',
    description: 'Conteneur maritime 6 pieds neuf offrant une solution de stockage compacte et durable. Construit en acier corten de haute qualité, il garantit une protection optimale du matériel.',
    littleDescription: 'Conteneur 6 pieds neuf, parfait pour sécuriser du matériel.',
    image: '/img/Container_mockup.png',
    dimensions: {
      length: 1.8,
      width: 1.75,
      height: 1.9,
      storageCapacity: 3
    },
    purchasePrice: 1950,
    rentalPrice: null,
    characteristic: {
      first: "Étanche au intempérie",
      second: "Structure robuste en acier",
      third: "Sol en bois contreplaqué",
      fourth: "Sécurisé avec fermeture renforcée",
      fifth: "Certfifié pour usage maritime",
      sixth: "Porte double battante",
    },
    deliveryOptions: {
      purchaseHomeDelivery: true,
      rentalHomeDelivery: true,
      rentalOnSite: false,
    },
  },

  // Conteneur 8 pieds - Occasion
  {
    id: 'cont-8p-occasion',
    type: 'conteneur',
    size: '8 pieds',
    state: 'occasion',
    description: "Conteneur maritime 8 pieds d'occasion offrant une capacité de stockage supérieure tout en restant facile à installer dans les espaces restreints. Parfait pour sécuriser outils, marchandises ou équipements.",
    littleDescription: "Conteneur 8 pieds d'occasion, pratique pour un stockage supplémentaire.",
    image: '/img/Container_mockup.png',
    dimensions: {
      length: 2.43,
      width: 2.2,
      height: 2.26,
      storageCapacity: 5.3
    },
    purchasePrice: 1500,
    rentalPrice: null,
    characteristic: {
      first: "Étanche au intempérie",
      second: "Structure robuste en acier",
      third: "Sol en bois contreplaqué",
      fourth: "Sécurisé avec fermeture renforcée",
      fifth: "Certfifié pour usage maritime",
      sixth: "Porte double battante",
    },
    deliveryOptions: {
      purchaseHomeDelivery: true,
      rentalHomeDelivery: true,
      rentalOnSite: false,
    },
  },

  // Conteneur 8 pieds - Neuf
  {
    id: 'cont-8p-neuf',
    type: 'conteneur',
    size: '8 pieds',
    state: 'neuf',
    description: 'Conteneur maritime 8 pieds neuf, conçu pour offrir un espace de stockage sécurisé et durable. Sa structure en acier corten assure une excellente résistance au temps et aux manipulations.',
    littleDescription: 'Conteneur 8 pieds neuf, solution idéale pour protéger vos biens.',
    image: '/img/Container_mockup.png',
    dimensions: {
      length: 2.43,
      width: 2.2,
      height: 2.26,
      storageCapacity: 5.3
    },
    purchasePrice: 2450,
    rentalPrice: null,
    characteristic: {
      first: "Étanche au intempérie",
      second: "Structure robuste en acier",
      third: "Sol en bois contreplaqué",
      fourth: "Sécurisé avec fermeture renforcée",
      fifth: "Certfifié pour usage maritime",
      sixth: "Porte double battante",
    },
    deliveryOptions: {
      purchaseHomeDelivery: true,
      rentalHomeDelivery: true,
      rentalOnSite: false,
    },
  },

  // Conteneur 10 pieds - Occasion
  {
    id: 'cont-10p-occasion',
    type: 'conteneur',
    size: '10 pieds',
    state: 'occasion',
    description: "Conteneur maritime 10 pieds d'occasion offrant un espace de stockage polyvalent et sécurisé. Sa taille intermédiaire en fait un excellent choix pour les chantiers et zones industrielles.",
    littleDescription: "Conteneur 10 pieds d'occasion, bonne capacité et prix attractif.",
    image: '/img/Container_mockup.png',
    dimensions: {
      length: 2.99,
      width: 2.43,
      height: 2.59,
      storageCapacity: 7.26
    },
    purchasePrice: 1750,
    rentalPrice: 80,
    characteristic: {
      first: "Étanche au intempérie",
      second: "Structure robuste en acier",
      third: "Sol en bois contreplaqué",
      fourth: "Sécurisé avec fermeture renforcée",
      fifth: "Certfifié pour usage maritime",
      sixth: "Porte double battante",
    },
    deliveryOptions: {
      purchaseHomeDelivery: true,
      rentalHomeDelivery: true,
      rentalOnSite: true,
    },
  },

  // Conteneur 10 pieds - Neuf
  {
    id: 'cont-10p-neuf',
    type: 'conteneur',
    size: '10 pieds',
    state: 'neuf',
    description: 'Conteneur maritime 10 pieds neuf combinant compacité et grande résistance. Parfait pour le stockage professionnel et les installations modulaires de haute qualité.',
    littleDescription: 'Conteneur 10 pieds neuf, robuste et adapté au stockage pro.',
    image: '/img/Container_mockup.png',
    dimensions: {
      length: 2.99,
      width: 2.43,
      height: 2.59,
      storageCapacity: 7.26
    },
    purchasePrice: 2690,
    rentalPrice: 80,
    characteristic: {
      first: "Étanche au intempérie",
      second: "Structure robuste en acier",
      third: "Sol en bois contreplaqué",
      fourth: "Sécurisé avec fermeture renforcée",
      fifth: "Certfifié pour usage maritime",
      sixth: "Porte double battante",
    },
    deliveryOptions: {
      purchaseHomeDelivery: true,
      rentalHomeDelivery: true,
      rentalOnSite: true,
    },
  },

  // Conteneur 15 pieds - Occasion
  {
    id: 'cont-15p-occasion',
    type: 'conteneur',
    size: '15 pieds',
    state: 'occasion',
    description: "Conteneur maritime 15 pieds d'occasion offrant un volume supplémentaire pour le stockage intermédiaire. Une solution fiable pour entreposer du matériel sur le long terme.",
    littleDescription: "Conteneur 15 pieds d'occasion, parfait pour stocker plus facilement.",
    image: '/img/Container_mockup.png',
    dimensions: {
      length: 4.5,
      width: 2.43,
      height: 2.59,
      storageCapacity: 10.93
    },
    purchasePrice: 1800,
    rentalPrice: null,
    characteristic: {
      first: "Étanche au intempérie",
      second: "Structure robuste en acier",
      third: "Sol en bois contreplaqué",
      fourth: "Sécurisé avec fermeture renforcée",
      fifth: "Certfifié pour usage maritime",
      sixth: "Porte double battante",
    },
    deliveryOptions: {
      purchaseHomeDelivery: true,
      rentalHomeDelivery: true,
      rentalOnSite: false,
    },
  },

  // Conteneur 20 pieds - Occasion
  {
    id: 'cont-20p-occasion',
    type: 'conteneur',
    size: '20 pieds',
    state: 'occasion',
    description: "Conteneur maritime 20 pieds d'occasion, format standard le plus utilisé dans le transport et le stockage. Spacieux, robuste et polyvalent, il s'adapte à toutes les utilisations.",
    littleDescription: 'Conteneur 20 pieds occasion, grand volume à prix réduit.',
    image: '/img/Container_mockup.png',
    dimensions: {
      length: 6.05,
      width: 2.43,
      height: 2.59,
      storageCapacity: 14.7
    },
    purchasePrice: 1850,
    rentalPrice: 120,
    characteristic: {
      first: "Étanche au intempérie",
      second: "Structure robuste en acier",
      third: "Sol en bois contreplaqué",
      fourth: "Sécurisé avec fermeture renforcée",
      fifth: "Certfifié pour usage maritime",
      sixth: "Porte double battante",
    },
    deliveryOptions: {
      purchaseHomeDelivery: true,
      rentalHomeDelivery: true,
      rentalOnSite: true,
    },
  },

  // Conteneur 20 pieds - Premier voyage
  {
    id: 'cont-20p-premier-voyage',
    type: 'conteneur',
    size: '20 pieds',
    state: 'premier-voyage',
    description: 'Conteneur maritime 20 pieds premier voyage offrant une qualité proche du neuf. Fiable et étanche, il constitue une solution idéale pour le stockage longue durée ou la transformation.',
    littleDescription: 'Conteneur 20 pieds premier voyage, état quasi neuf.',
    image: '/img/Container_mockup.png',
    dimensions: {
      length: 6.05,
      width: 2.43,
      height: 2.59,
      storageCapacity: 14.7
    },
    purchasePrice: 2600,
    rentalPrice: 120,
    characteristic: {
      first: "Étanche au intempérie",
      second: "Structure robuste en acier",
      third: "Sol en bois contreplaqué",
      fourth: "Sécurisé avec fermeture renforcée",
      fifth: "Certfifié pour usage maritime",
      sixth: "Porte double battante",
    },
    deliveryOptions: {
      purchaseHomeDelivery: true,
      rentalHomeDelivery: true,
      rentalOnSite: true,
    },
  },

  // Conteneur 40 pieds - Occasion
  {
    id: 'cont-40p-occasion',
    type: 'conteneur',
    size: '40 pieds',
    state: 'occasion',
    description: "Conteneur maritime 40 pieds d'occasion offrant un immense volume de stockage. Idéal pour entreposer du matériel encombrant ou créer des structures modulaires à grand format.",
    littleDescription: "Grand conteneur 40 pieds d'occasion, capacité maximale.",
    image: '/img/Container_mockup.png',
    dimensions: {
      length: 12.19,
      width: 2.43,
      height: 2.59,
      storageCapacity: 29.6
    },
    purchasePrice: 2150,
    rentalPrice: null,
    characteristic: {
      first: "Étanche au intempérie",
      second: "Structure robuste en acier",
      third: "Sol en bois contreplaqué",
      fourth: "Sécurisé avec fermeture renforcée",
      fifth: "Certfifié pour usage maritime",
      sixth: "Porte double battante",
    },
    deliveryOptions: {
      purchaseHomeDelivery: false,
      rentalHomeDelivery: false,
      rentalOnSite: false,
    },
  },

  // Conteneur 40 pieds - Premier voyage
  {
    id: 'cont-40p-premier-voyage',
    type: 'conteneur',
    size: '40 pieds',
    state: 'premier-voyage',
    description: 'Conteneur maritime 40 pieds premier voyage, offrant un état impeccable et une grande durabilité. Parfait pour les projets nécessitant un grand volume ou une transformation en module.',
    littleDescription: 'Conteneur 40 pieds premier voyage, état premium.',
    image: '/img/Container_mockup.png',
    dimensions: {
      length: 12.19,
      width: 2.43,
      height: 2.59,
      storageCapacity: 29.6
    },
    purchasePrice: 4600,
    rentalPrice: null,
    characteristic: {
      first: "Étanche au intempérie",
      second: "Structure robuste en acier",
      third: "Sol en bois contreplaqué",
      fourth: "Sécurisé avec fermeture renforcée",
      fifth: "Certfifié pour usage maritime",
      sixth: "Porte double battante",
    },
    deliveryOptions: {
      purchaseHomeDelivery: false,
      rentalHomeDelivery: false,
      rentalOnSite: false,
    },
  },

  // Bungalow - Occasion
  {
    id: 'bungalow-occasion',
    type: 'bungalow',
    size: 'standard',
    state: 'occasion',
    description: "Bungalow modulaire d'occasion, idéal pour aménager rapidement un espace de bureau, de réunion ou de vie sur site. Fonctionnel et polyvalent, il s'adapte à tous les besoins professionnels.",
    littleDescription: "Bungalow d'occasion pratique pour créer un espace de travail.",
    image: '/img/Bungalow_mockup.png',
    dimensions: {
      length: 6.0,
      width: 3.0,
      height: 2.5,
      storageCapacity: 18
    },
    purchasePrice: 3000,
    rentalPrice: null,
    characteristic: {
      first: "Étanche au intempérie",
      second: "Structure robuste en acier",
      third: "Sol en bois contreplaqué",
      fourth: "Sécurisé avec fermeture renforcée",
      fifth: "Certfifié pour usage maritime",
      sixth: "Porte double battante",
    },
    deliveryOptions: {
      purchaseHomeDelivery: true,
      rentalHomeDelivery: true,
      rentalOnSite: false,
    },
  },

  // Bungalow - Neuf
  {
    id: 'bungalow-neuf',
    type: 'bungalow',
    size: 'standard',
    state: 'neuf',
    description: 'Bungalow modulaire neuf offrant une solution moderne et confortable pour créer des bureaux, vestiaires ou espaces techniques. Parfait pour les chantiers et installations professionnelles.',
    littleDescription: 'Bungalow neuf moderne et entièrement aménageable.',
    image: '/img/Bungalow_mockup.png',
    dimensions: {
      length: 6.0,
      width: 3.0,
      height: 2.5,
      storageCapacity: 18
    },
    purchasePrice: 5990,
    rentalPrice: null,
    characteristic: {
      first: "Étanche au intempérie",
      second: "Structure robuste en acier",
      third: "Sol en bois contreplaqué",
      fourth: "Sécurisé avec fermeture renforcée",
      fifth: "Certfifié pour usage maritime",
      sixth: "Porte double battante",
    },
    deliveryOptions: {
      purchaseHomeDelivery: true,
      rentalHomeDelivery: true,
      rentalOnSite: false,
    },
  }
];

// Fonctions utilitaires pour accéder aux données
export const getContainerById = (id: string): Container | undefined => {
  return containers.find(container => container.id === id);
};

export const getContainersByType = (type: 'conteneur' | 'bungalow'): Container[] => {
  return containers.filter(container => container.type === type);
};

export const getContainersByState = (state: 'neuf' | 'occasion' | 'premier-voyage'): Container[] => {
  return containers.filter(container => container.state === state);
};

export const getContainersBySize = (size: string): Container[] => {
  return containers.filter(container => container.size === size);
};

export const getContainersWithRental = (): Container[] => {
  return containers.filter(container => container.rentalPrice !== null);
};