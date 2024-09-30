import React from 'react';

const CartItem = ({ image, name, quantity, price, totalPrice, onRemove, onIncrease, onDecrease }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <img 
        src={image} 
        alt={name} 
        style={{ width: '100px', height: '100px', objectFit: 'cover', marginRight: '20px' }} 
      />
      <div style={{ flex: 1 }}>
        <h3>{name}</h3>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
          <button onClick={onDecrease} style={buttonStyle}>-</button>
          <span style={{ margin: '0 10px' }}>{quantity}</span>
          <button onClick={onIncrease} style={buttonStyle}>+</button>
        </div>
      </div>
      <div style={{ textAlign: 'right', marginLeft: '20px' }}>
        <p>Price: ${price.toFixed(2)}</p>
        <p><strong>Total: ${totalPrice.toFixed(2)}</strong></p>
        <button onClick={onRemove} style={{ ...buttonStyle, backgroundColor: '#e74c3c' }}>Remove</button>
      </div>
    </div>
  );
};

const buttonStyle = {
  padding: '5px 10px',
  backgroundColor: '#3498db',
  color: 'white',
  border: 'none',
  borderRadius: '3px',
  cursor: 'pointer',
  marginRight: '5px'
};

export default CartItem;