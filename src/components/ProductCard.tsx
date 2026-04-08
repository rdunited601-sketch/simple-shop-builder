interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image?: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  return (
    <div className="group border border-border rounded-xl bg-card text-card-foreground flex flex-col overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      {/* Product Image */}
      <div className="h-48 bg-muted overflow-hidden">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl text-muted-foreground">📦</div>
        )}
      </div>

      <div className="p-5 flex flex-col gap-2 flex-1">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary/70 bg-primary/10 self-start px-2 py-0.5 rounded-full">
          {product.category}
        </span>
        <h3 className="text-lg font-bold leading-tight">{product.name}</h3>
        <p className="text-sm text-muted-foreground flex-1 leading-relaxed">{product.description}</p>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
          <span className="text-xl font-extrabold">${product.price.toFixed(2)}</span>
          <button
            onClick={() => onAddToCart(product)}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity active:scale-95"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
