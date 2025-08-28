export interface Pokemon {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  quantity: number;
}

export type ItemCart = Pokemon & { quantity: number };
