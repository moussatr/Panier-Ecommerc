
import React, { useState } from 'react';
import produitService from '../services/produit';
import creerProduit from '../css/creerProduit.css'

const CreateProductPage = () => {
  const [productData, setProductData] = useState({
    name: '',
    price: 0,
    stock: 0,
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Data before submission:', productData);

    try {
      // Appeler le service pour créer un produit
      const tt = await produitService.createProduit(productData);
      setSuccessMessage('Produit créé avec succès');
      setTimeout(() => {
        setSuccessMessage('');
      }, 1000);
      setErrorMessage('');
    } catch (error) {
      console.error('Erreur lors de la création du produit :', error);
      setErrorMessage('Erreur lors de la création du produit. Veuillez réessayer.');
      setTimeout(() => {
        setErrorMessage('');
      }, 1000);
      setSuccessMessage('');
    }
  };

  return (
    <div className='contenair'>
      <h1 className='h1'>Créer un Produit</h1>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form className='form' onSubmit={handleSubmit}>
        <label className='label'>Nom du Produit:</label>
        <input
          className='input'
          type="text"
          name="name"
          value={productData.name}
          onChange={handleInputChange}
        />

        <label className='label'>Prix:</label>
        <input
          className='input'
          type="float"
          name="price"
          value={productData.price}
          onChange={handleInputChange}
        />

        <label className='label'>Stock:</label>
        <input
          className='input'
          type="number"
          name="stock"
          value={productData.stock}
          onChange={handleInputChange}
        />

        <button className='button' type="submit">Créer le Produit</button>
      </form>
    </div>
  );
};

export default CreateProductPage;
