import React, { createContext, useState } from 'react';

export const ReviewsContext = createContext(null);

export function ReviewsProvider({ children }) {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <ReviewsContext.Provider value={{ selectedProduct, setSelectedProduct }}>
      {children}
    </ReviewsContext.Provider>
  );
}
