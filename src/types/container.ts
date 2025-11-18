export type ContainerState = 'neuf' | 'occasion' | 'premier-voyage';

export type ProductType = 'conteneur' | 'bungalow';

export interface Dimensions {
  length: number; // en mètres
  width: number; // en mètres
  height: number; // en mètres
  storageCapacity: number; // en m²
}

export interface characteristic {
  first: string,
  second: string,
  third: string,
  fourth: string,
  fifth: string,
  sixth: string,
}

export interface Container {
  id: string;
  type: ProductType;
  size: string; // ex: "6 pieds", "20 pieds", "20 pieds high cube"
  state: ContainerState;
  description: string;
  littleDescription: string,
  image: string; // chemin vers l'image du produit
  dimensions: Dimensions;
  purchasePrice: number; // prix à l'achat en € HT
  rentalPrice: number | null; // prix à la location en € HT/mois, null si non disponible
  characteristic: characteristic;
}

