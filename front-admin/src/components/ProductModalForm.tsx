import React, { useState } from 'react';
interface ModalFormProps {
    isOpen: boolean;
    onClose: () => void;
  }

  const ModalForm: React.FC<ModalFormProps> = ({ isOpen, onClose }) => {
  // States to manage form data
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [originalPrice, setOriginalPrice] = useState<number | ''>('');
  const [isListed, setIsListed] = useState(true);
  const [categories, setCategories] = useState<string>('');
  const [images, setImages] = useState<string[]>(['']);
  const [variants, setVariants] = useState([
    { size: '', price: '', stockQuantity: '' },
  ]);


 
  
  const handleAddImage = () => setImages([...images, '']);
  const handleRemoveImage = (index: number) =>
    setImages(images.filter((_, i) => i !== index));

  const handleAddVariant = () =>
    setVariants([...variants, { size: '', price: '', stockQuantity: '' }]);
  const handleRemoveVariant = (index: number) =>
    setVariants(variants.filter((_, i) => i !== index));

  // Submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productData = {
      name,
      description,
      price,
      originalPrice,
      isListed,
      categories,
      images,
      variants,
    };
    console.log('Product Data:', productData);
    // Handle API call to add product
  };

  return (
    <div  className={`${
        isOpen ? 'fixed' : 'hidden'
      } overflow-y-auto overflow-x-hidden inset-0 z-50 justify-center items-center w-full h-full bg-black bg-opacity-50`}>
    <div
      id="add-product-modal"
      aria-hidden="true"
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden h-full"
    >
      <div className="relative p-4 w-full max-w-4xl max-h-full">
        {/* Modal content */}
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          {/* Modal header */}
          <div className="flex items-center justify-between p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Add Product
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="add-product-modal"
            >
              <svg
              onClick={onClose}
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Modal body */}
          <div className="p-6 space-y-6">
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Name */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Product Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-gray-50 border text-gray-900 rounded-lg w-full p-2.5 dark:bg-gray-600 dark:border-gray-500"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bg-gray-50 border text-gray-900 rounded-lg w-full p-2.5 dark:bg-gray-600 dark:border-gray-500"
                  required
                />
              </div>

              {/* Price and Original Price */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Price
                  </label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.valueAsNumber)}
                    className="bg-gray-50 border text-gray-900 rounded-lg w-full p-2.5 dark:bg-gray-600 dark:border-gray-500"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Original Price
                  </label>
                  <input
                    type="number"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(e.target.valueAsNumber)}
                    className="bg-gray-50 border text-gray-900 rounded-lg w-full p-2.5 dark:bg-gray-600 dark:border-gray-500"
                  />
                </div>
              </div>

            

            

              {/* Categories */}
              <div>
                
               
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  category
                </label>
                <input
                  type="text"
                  value={categories}
                  onChange={(e) => setCategories(e.target.value)}
                  className="bg-gray-50 border text-gray-900 rounded-lg w-full p-2.5 dark:bg-gray-600 dark:border-gray-500"
                  required
                />
             
                
                
              </div>

              {/* Images */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Images
                </label>
                {images.map((image, index) => (
                  <div key={index} className="flex mb-2">
                    <input
                      type="file"
                      value={image}
                      onChange={(e) =>
                        setImages(
                          images.map((img, i) => (i === index ? e.target.value : img))
                        )
                      }
                      className="bg-gray-50 border text-gray-900 rounded-lg p-2.5 flex-1 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="text-red-600 ml-2"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddImage}
                  className="text-blue-600"
                >
                  + Add Image
                </button>
              </div>

              {/* Variants */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Variants
                </label>
                {variants.map((variant, index) => (
                  <div key={index} className="grid grid-cols-3 gap-4 mb-2">
                    <input
                      type="text"
                      placeholder="Size"
                      value={variant.size}
                      onChange={(e) =>
                        setVariants(
                          variants.map((v, i) =>
                            i === index ? { ...v, size: e.target.value } : v
                          )
                        )
                      }
                      className="bg-gray-50 border text-gray-900 rounded-lg p-2.5 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <input
  type="number"
  placeholder="Price"
  value={variant.price}
  onChange={(e) =>
    setVariants(
      variants.map((v, i) =>
        i === index ? { ...v, price: e.target.valueAsNumber.toString() } : v
      )
    )
  }
  className="bg-gray-50 border text-gray-900 rounded-lg p-2.5 dark:bg-gray-600 dark:border-gray-500"
/>
<input
  type="number"
  placeholder="Stock"
  value={variant.stockQuantity}
  onChange={(e) =>
    setVariants(
      variants.map((v, i) =>
        i === index ? { ...v, stockQuantity: e.target.valueAsNumber.toString() } : v
      )
    )
  }
  className="bg-gray-50 border text-gray-900 rounded-lg p-2.5 dark:bg-gray-600 dark:border-gray-500"
/>

                    <button
                      type="button"
                      onClick={() => handleRemoveVariant(index)}
                      className="text-red-600 ml-2"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddVariant}
                  className="text-blue-600"
                >
                  + Add Variant
                </button>
              </div>

              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                Add Product
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ModalForm;
