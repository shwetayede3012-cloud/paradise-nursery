import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

const plantsArray = [
  {
    category: 'Air Purifying Plants',
    plants: [
      { name: 'Snake Plant', image: 'https://images.unsplash.com/photo-1593482892290-f54927ae1bb6?w=300', cost: '$15' },
      { name: 'Spider Plant', image: 'https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=300', cost: '$12' },
      { name: 'Peace Lily', image: 'https://images.unsplash.com/photo-1616500163246-742aa64d2ea7?w=300', cost: '$18' },
      { name: 'Boston Fern', image: 'https://images.unsplash.com/photo-1598880940371-836fb54767ca?w=300', cost: '$14' },
      { name: 'Rubber Plant', image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=300', cost: '$20' },
      { name: 'Aloe Vera', image: 'https://images.unsplash.com/photo-1509587584298-0f3b3a3a1797?w=300', cost: '$10' },
    ],
  },
  {
    category: 'Low Maintenance Plants',
    plants: [
      { name: 'ZZ Plant', image: 'https://images.unsplash.com/photo-1632321926872-4bc6c1cf2c14?w=300', cost: '$17' },
      { name: 'Pothos', image: 'https://images.unsplash.com/photo-1622557850710-56cd6ac2b1c1?w=300', cost: '$11' },
      { name: 'Succulent Mix', image: 'https://images.unsplash.com/photo-1459156212016-c812468e2115?w=300', cost: '$9' },
      { name: 'Cactus', image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=300', cost: '$8' },
      { name: 'Jade Plant', image: 'https://images.unsplash.com/photo-1509937528035-ad76254b0356?w=300', cost: '$13' },
      { name: 'Cast Iron Plant', image: 'https://images.unsplash.com/photo-1463554050456-f2ed7d3fec09?w=300', cost: '$16' },
    ],
  },
  {
    category: 'Flowering Plants',
    plants: [
      { name: 'Orchid', image: 'https://images.unsplash.com/photo-1524598171353-e6e46bea0c78?w=300', cost: '$25' },
      { name: 'African Violet', image: 'https://images.unsplash.com/photo-1521394170751-3b6f6aef9df1?w=300', cost: '$14' },
      { name: 'Begonia', image: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?w=300', cost: '$12' },
      { name: 'Hibiscus', image: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=300', cost: '$19' },
      { name: 'Anthurium', image: 'https://images.unsplash.com/photo-1614594895304-fe7116d40ec8?w=300', cost: '$22' },
      { name: 'Geranium', image: 'https://images.unsplash.com/photo-1595351298020-038700609878?w=300', cost: '$11' },
    ],
  },
];

function ProductList() {
  const [showCart, setShowCart] = useState(false);
  const [addedItems, setAddedItems] = useState({});
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedItems(prev => ({ ...prev, [plant.name]: true }));
  };

  const handleCartClick = () => setShowCart(true);
  const handleContinueShopping = () => setShowCart(false);

  return (
    <div className="product-list-page">
      <nav className="navbar">
        <div className="nav-logo">🌿 Paradise Nursery</div>
        <div className="nav-links">
          <a href="/" className="nav-link">Home</a>
          <a href="#" className="nav-link" onClick={handleContinueShopping}>Plants</a>
          <div className="cart-icon-wrapper" onClick={handleCartClick}>
            🛒 Cart
            <span className="cart-count">{totalCartItems}</span>
          </div>
        </div>
      </nav>

      {!showCart ? (
        <div className="product-grid-container">
          {plantsArray.map((categoryData, index) => (
            <div className="category-section" key={index}>
              <h2 className="category-title">{categoryData.category}</h2>
              <div className="plant-grid">
                {categoryData.plants.map((plant, i) => (
                  <div className="plant-card" key={i}>
                    <img src={plant.image} alt={plant.name} className="plant-image" />
                    <h3 className="plant-name">{plant.name}</h3>
                    <p className="plant-price">{plant.cost}</p>
                    <button
                      className="add-to-cart-button"
                      onClick={() => handleAddToCart(plant)}
                      disabled={addedItems[plant.name]}
                    >
                      {addedItems[plant.name] ? 'Added' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={handleContinueShopping} />
      )}
    </div>
  );
}

export default ProductList;
