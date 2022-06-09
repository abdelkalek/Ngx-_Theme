export interface Category {
  id: string,
  nom: string,
  description: string,
  subCategory: Category[]
}
