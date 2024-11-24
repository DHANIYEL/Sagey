import { URL } from "@/Common/api"
import { useNavigate } from "react-router-dom"

const ProductCard2 = ({ product }) => {
  const navigate = useNavigate()
  const originalPrice = product.offer
    ? Math.round(product.price / (1 - product.offer / 100))
    : product.price
  return (
    <div
      onClick={() => navigate(`/product/${product._id}`)}
      className="cursor-pointer space-y-3"
    >
      <div className="aspect-[3/4] w-full overflow-hidden">
        <img
          src={`${URL}/img/${product?.imageURL}`}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="space-y-2">
        <h3 className="text-sm font-medium uppercase tracking-wide">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2">
          {product.description || "Contrary To Popular Belief, Lorem Ipsum Is Not Simply Random Text."}
        </p>
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold line-through">
            ₹{originalPrice.toLocaleString()}
          </span>
          <span className="text-sm text-gray-500">From</span>
          <span className="text-lg font-semibold text-red-500">
            ₹{product.price.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  )
}

export default ProductCard2

