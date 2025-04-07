import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useProductContext } from '../context/ProductContext';
import { useCallback, useState } from 'react';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import CartPreviewModal from './CartPreviewModal';

export default function ProductCard({ id, title, image, price }) {
  const navigate = useNavigate();
  const { state, dispatch } = useProductContext();

  const isLiked = state.likedProducts.includes(id);

  const [showModal, setShowModal] = useState(false);
  const [qty, setQty] = useState(1);
  const [modalProduct, setModalProduct] = useState(null);

  const handleLike = useCallback(
    (e) => {
      e.stopPropagation();
      dispatch({ type: 'TOGGLE_LIKE', payload: id });
    },
    [dispatch, id]
  );

  const openCartModal = (e) => {
    e.stopPropagation();
    setModalProduct({ id, title, price, image });
    setQty(1);
    setShowModal(true);
  };

  const confirmAddToCart = () => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: { ...modalProduct, qty },
    });
    setShowModal(false);
    setQty(1);
  };

  return (
    <>
      <div
        onClick={() => navigate(`/products/${id}`)}
        className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition cursor-pointer"
      >
        <img src={image} alt={title} className="w-full h-48 object-cover rounded" />
        <h2 className="text-lg font-semibold mt-2">{title}</h2>
        <p className="text-gray-600">${price}</p>

        <div className="flex justify-end gap-2 mt-4">
          {/* ❤️ Like Button */}
          <button
            onClick={handleLike}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-transform duration-200 ${
              isLiked
                ? 'bg-red-500 text-white'
                : 'bg-gray-200 text-gray-600 hover:bg-red-500 hover:text-white'
            } hover:scale-110`}
          >
            <FaHeart />
          </button>

          {/* 🛒 Cart Button */}
          <button
            onClick={openCartModal}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-transform duration-200 bg-gray-200 text-gray-600 hover:bg-blue-500 hover:text-white hover:scale-110"
          >
            <FaShoppingCart />
          </button>
        </div>
      </div>

      {/* Modal preview keranjang */}
      {showModal && modalProduct && (
        <CartPreviewModal
          product={modalProduct}
          qty={qty}
          setQty={setQty}
          onAdd={confirmAddToCart}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}

ProductCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};
