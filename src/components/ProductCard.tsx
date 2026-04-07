interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  return (
    <div className="border border-border rounded-lg p-4 bg-card text-card-foreground flex flex-col gap-2 shadow-sm hover:shadow-md transition-shadow">
      <div className="text-xs text-muted-foreground uppercase tracking-wide">{product.category}</div>
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-sm text-muted-foreground flex-1">{product.description}</p>
      <div className="flex items-center justify-between mt-2">
        <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
        <button
          onClick={() => onAddToCart(product)}
          className="bg-primary text-primary-foreground px-3 py-1.5 rounded text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
