import React from 'react';
import {useLocation} from 'react-router-dom';
import ProductDetails from '../components/ProductDetails';

function ProductDetailsContainer(props) {
  return <ProductDetails path={useLocation().pathname} />;
}

export default ProductDetailsContainer;