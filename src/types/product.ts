
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  category: string;
  brand: string;
  inStock: boolean;
  quantity: number;
  rating: number;
  numReviews: number;
  features?: string[];
  specifications?: {
    [key: string]: string;
  };
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}
