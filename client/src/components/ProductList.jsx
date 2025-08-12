import ProductItem from "./ProductItem";

export default function ProductList({ products, onUpdate, onDelete }) {
  if (products.length === 0)
    return <p className="text-gray-400 text-sm">No products found !</p>;

  return (
    <div className="space-y-2">
      {Array.isArray(products) && products.map((p) => (
        <ProductItem
          key={p.id}
          product={p}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
