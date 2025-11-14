import { useEffect, useState } from 'react';
import api from '../services/api';

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    api.get('/products')
      .then(res => {
        if (!mounted) return;
        setProducts(res.data || []);
      })
      .catch(err => {
        if (!mounted) return;
        setError(err);
      })
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, []);

  const refresh = () => {
    setLoading(true);
    return api.get('/products').then(res => { setProducts(res.data || []); setLoading(false); });
  };

  return { products, loading, error, refresh };
}
