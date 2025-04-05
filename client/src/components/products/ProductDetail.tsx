import React, { useState } from 'react';
import { Star, Heart, Share2, Minus, Plus, Truck, Shield, RefreshCw } from 'lucide-react';

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const product = {
    name: "Handcrafted Ceramic Vase",
    artisan: "Maria Rodriguez",
    price: 129.99,
    rating: 4.8,
    reviews: 124,
    description: "This beautiful handcrafted ceramic vase is made using traditional techniques passed down through generations. Each piece is unique and features intricate hand-painted details.",
    images: [
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    ],
    details: [
      "Height: 12 inches",
      "Width: 8 inches",
      "Material: Ceramic",
      "Handmade in Mexico",
      "Food-safe glazing",
    ],
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-w-1 aspect-h-1">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative rounded-lg overflow-hidden ${
                  selectedImage === index ? 'ring-2 ring-indigo-500' : ''
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-24 object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-gray-600 mt-2">by {product.artisan}</p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-gray-600">{product.rating} ({product.reviews} reviews)</span>
          </div>

          <p className="text-3xl font-bold text-indigo-600">${product.price}</p>

          <p className="text-gray-600">{product.description}</p>

          <div className="space-y-4">
            <h3 className="font-semibold">Product Details:</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              {product.details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center border rounded-md">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 hover:bg-gray-100"
              >
                <Minus className="h-5 w-5" />
              </button>
              <span className="px-4 py-2 border-x">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 hover:bg-gray-100"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
            <button className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700">
              Add to Cart
            </button>
            <button className="p-3 border rounded-md hover:bg-gray-50">
              <Heart className="h-6 w-6" />
            </button>
            <button className="p-3 border rounded-md hover:bg-gray-50">
              <Share2 className="h-6 w-6" />
            </button>
          </div>

          {/* Shipping & Returns */}
          <div className="border-t pt-6 space-y-4">
            <div className="flex items-center space-x-3">
              <Truck className="h-5 w-5 text-gray-400" />
              <span>Free shipping on orders over $100</span>
            </div>
            <div className="flex items-center space-x-3">
              <Shield className="h-5 w-5 text-gray-400" />
              <span>Secure payment</span>
            </div>
            <div className="flex items-center space-x-3">
              <RefreshCw className="h-5 w-5 text-gray-400" />
              <span>30-day return policy</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;