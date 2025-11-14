import { useState, useEffect } from 'react';

const useFetch = (fn, deps = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fn()
      .then(res => { if (mounted) setData(res.data || res); })
      .catch(err => { if (mounted) setError(err); })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, deps);

  return { data, loading, error };
};

export default useFetch;
