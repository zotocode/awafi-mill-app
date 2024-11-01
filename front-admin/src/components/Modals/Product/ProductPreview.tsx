import React, { useState } from "react";
import { Product } from "../../../types/productTypes";
import { X, ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";

interface ImagePreviewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ImagePreviewModal: React.FC<ImagePreviewModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  if (!isOpen || !product) return null;

  const images = product.images?.slice(0, 5) || [];
  const hasImages = images.length > 0;

  const handlePrevious = () => {
    setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = () => {
    setSelectedImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-200 bg-gray-50/50">
          <h2 className="text-2xl font-bold text-gray-900 truncate">{product.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-all duration-200 hover:scale-105"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <div className="p-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Image Section */}
            <div className="space-y-6">
              <div className="relative">
                {/* Main Image or Placeholder */}
                <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 overflow-hidden">
                  {hasImages ? (
                    <div className="aspect-square p-4">
                      <img
                        src={images[selectedImageIndex]?.toString()}
                        alt={`${product.name} - Image ${selectedImageIndex + 1}`}
                        className="w-full h-full object-contain rounded-lg transition-opacity duration-300"
                      />
                    </div>
                  ) : (
                    <div className="aspect-square flex flex-col items-center justify-center p-4 text-gray-400">
                      <ImageIcon className="w-20 h-20 mb-4" />
                      <p className="text-lg font-medium">No Image Available</p>
                      <p className="text-sm text-gray-500">Product images will appear here</p>
                    </div>
                  )}
                </div>

                {/* Navigation Arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevious}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                    >
                      <ChevronLeft className="w-6 h-6 text-gray-700" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                    >
                      <ChevronRight className="w-6 h-6 text-gray-700" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail Strip */}
              {images.length > 1 && (
                <div className="flex gap-3 justify-center">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`relative w-20 h-20 rounded-lg overflow-hidden transition-all duration-200 
                        ${selectedImageIndex === index
                          ? "ring-2 ring-offset-2 ring-blue-600 scale-105"
                          : "hover:opacity-75 hover:scale-105"
                        }`}
                    >
                      <img
                        src={image.toString()}
                        alt={`${product.name} thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              <div className="flex justify-center">
                <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200
                  ${product.isListed 
                    ? "bg-green-100 text-green-800 hover:bg-green-200" 
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}>
                  {product.isListed ? "Listed" : "Not Listed"}
                </span>
              </div>
            </div>

            {/* Details Section */}
            <div className="space-y-8">
              {/* Basic Details */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                  Product Details
                  <div className="h-px bg-gray-200 flex-grow ml-4" />
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-xl hover:shadow-md transition-all duration-200">
                    <p className="text-sm font-medium text-gray-500 mb-1">SKU</p>
                    <p className="font-semibold text-gray-900">{product.sku}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl hover:shadow-md transition-all duration-200">
                    <p className="text-sm font-medium text-gray-500 mb-1">EAN</p>
                    <p className="font-semibold text-gray-900">{product.ean}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl hover:shadow-md transition-all duration-200">
                    <p className="text-sm font-medium text-gray-500 mb-1">Category</p>
                    <p className="font-semibold text-gray-900">{product.category?.name}</p>
                  </div>
                </div>
              </div>

              {/* Variants Section */}
              {product.variants && product.variants.length > 0 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                    Variants
                    <div className="h-px bg-gray-200 flex-grow ml-4" />
                  </h3>
                  <div className="space-y-4">
                    {product.variants.map((variant, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02]"
                      >
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium text-gray-500 mb-1">Weight</p>
                            <p className="font-semibold text-gray-900">{variant.weight}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500 mb-1">Price</p>
                            <p className="font-semibold text-gray-900">${variant.outPrice}</p>
                          </div>
                          <div className="col-span-2">
                            <p className="text-sm font-medium text-gray-500 mb-1">Stock</p>
                            <p className="font-semibold text-gray-900">{variant.stockQuantity} units</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagePreviewModal;