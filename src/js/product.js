import { getParam } from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductDetails from './ProductDetails.mjs';
const category = getParam('category'); 
const dataSource = new ProductData(category);
const productID = getParam('products');

const product = new ProductDetails(productID, dataSource);
product.init();
