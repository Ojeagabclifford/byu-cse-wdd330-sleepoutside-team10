// ProductDetails.mjs

import { setLocalStorage, getLocalStorage ,discountPrice} from './utils.mjs';

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);

  if (!this.product) {
    console.error('Product not found for ID:', this.productId);
    document.querySelector('.product-detail').innerHTML =
      '<p>Product not found.</p>';
    return;
  }

  this.renderProductDetails();
    document
      .getElementById('addToCart')
      .addEventListener('click', this.addToCart.bind(this));
  }

  addToCart() {
  
    let cart = getLocalStorage('so-cart');
  
    // Ensure cart is an array
    if (!cart || !Array.isArray(cart)) {
      cart = [];
    }
// Check if item already exists in cart
  const itemInCart = cart.find(item => item.Id === this.product.Id);

  // Optional: If you want to increase quantity instead of adding again
  if (itemInCart) {
   itemInCart.quantity = (itemInCart.quantity || 1) + 1;
    console.log(5+5);
  } //
  else {
    cart.push({ ...this.product, quantity: 1 });
   //cart.push(this.product);}
   }

  // Add the product to cart
 

  // Save cart
  setLocalStorage('so-cart', cart);

    // Optional: Show confirmation
    console.log('Product added to cart!', this.product.Name);
    alert('Product added to cart!');
  }

  renderProductDetails() {
    // Get the product detail section
    const productSection = document.querySelector('.product-detail');
    const discount = discountPrice(this.product.FinalPrice,this.product.SuggestedRetailPrice);

    // Generate the HTML for product details
    productSection.innerHTML = `
      <h3>${this.product.Brand.Name}</h3>
      <h2 class="divider">${this.product.NameWithoutBrand}</h2>
      <img
        class="divider"
       src="${this.product.Image}"
        alt="${this.product.Name}"
      />
      <p class="product-card__price">$${this.product.FinalPrice} <span class="product-discount" >${discount}% OFF</span></p>

      <p class="product__color">${this.product.Colors[0].ColorName}</p>
      <p class="product__description">
        ${this.product.DescriptionHtmlSimple}
      </p>
      <div class="product-detail__add">
        <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
      </div>
    `;
  }
}
