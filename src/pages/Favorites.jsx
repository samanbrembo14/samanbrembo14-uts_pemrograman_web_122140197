import { useProducts } from '../hooks/useProducts';
import { useProductContext } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

export default function Favorites() {
  const { data: products, loading, error } = useProducts();
  const { state } = useProductContext();

  const favoriteProducts = products.filter((item) =>
    state.likedProducts.includes(item.id)
  );

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-red-500">
        ❤️ Produk Favorit
      </h1>

      {favoriteProducts.length === 0 ? (
        <p className="text-center text-gray-500">Belum ada produk yang disukai.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {favoriteProducts.map((item) => (
            <ProductCard
              key={item.id}
              id={item.id}
              title={item.title}
              image={item.thumbnail}
              price={item.price}
            />
          ))}
        </div>
      )}
    </div>
  );
}
