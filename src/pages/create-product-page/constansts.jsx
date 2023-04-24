import { v4 as uuidv4 } from "uuid";
const productCategory = ["Smartphone", "Computer", "Tablet", "Laptop"];

const productFreshness = ["Brand-new", "Second Hand", "Refurbished"];

const uniqId = uuidv4().slice(0, 4);
const initialData = [
  {
    key: uniqId,
    no: 1,
    productName: "Mac Book Pro M1",
    productCategory: "Laptop",
    productFreshness: "Brand-new",
    productPrice: "1599",
  },
];
export { productCategory, productFreshness, initialData };
