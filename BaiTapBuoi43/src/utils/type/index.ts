interface Style {
  [key: string]: string;
}

interface Column {
  value: string;
  text: string;
  style?: Style;
}

interface Row {
  [key: string]: any;
  id: number;
}

interface Category {
  id: number;
  name: string;
}

interface Product extends Row {
  id: number;
  name: string;
  sku: string;
  price: number;
  remaining: number;
  category: Category;
  imageUrl: string;
}

interface ProductReq {
  categoryId: number;
  name: string;
  sku: string;
  price: number;
  remaining: number;
}

export type { Style, Column, Row, Category, Product, ProductReq };
