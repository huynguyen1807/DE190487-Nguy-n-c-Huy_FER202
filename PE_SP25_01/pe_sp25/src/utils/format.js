export const truncate = (text, n=100) => (text && text.length > n) ? text.slice(0,n) + '...' : text;
