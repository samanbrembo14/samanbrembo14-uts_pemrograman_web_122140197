import { useEffect, useState } from 'react';

export function useProducts(id = null) {
  const [data, setData] = useState(id ? null : []); // jika id, maka data awal null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = id
      ? `https://dummyjson.com/products/${id}`
      : 'https://dummyjson.com/products';

    const fetchData = async () => {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error('Gagal fetch produk');
        const json = await res.json();
        setData(id ? json : json.products);
      } catch (err) {
        setError(err.message || 'Terjadi kesalahan');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { data, loading, error };
}
