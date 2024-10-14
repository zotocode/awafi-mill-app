import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Product, Description, Variant } from "../types/";
import { Category } from "../types/categoryType";
import categoryapi from "../api/categoryapi";
import productapi from "../api/productapi";
import { toast } from "react-toastify";



const MAX_IMAGES = 5;
const UpdateProductPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
  
    const [name, setName] = useState("");
    const [descriptions, setDescriptions] = useState<Description[]>([
      { header: "", content: "" },
    ]);
    const [isListed, setIsListed] = useState(true);
    const [categories, setCategories] = useState<Category[]>([]);
    const [category, setCategory] = useState<Category | null>(null);
    const [images, setImages] = useState<(string | File |null)[]>(Array(MAX_IMAGES).fill(null));
    const [variants, setVariants] = useState<Variant[]>([
      { weight: "", price: 0, stockQuantity: 0 },
    ]);
    const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoryResponse, productResponse] = await Promise.all([
          categoryapi.fetchAllListedCategories(),
          productapi.fetchProductById(id!),
        ]);

       

        if (categoryResponse.status === 200) {
          setCategories(categoryResponse.data);
        }

        if (productResponse.status === 200) {
          const product = productResponse.data;
          setName(product.name);
          setDescriptions(product.descriptions || [{ header: "", content: "" }]);
          setIsListed(product.isListed);
          setCategory(product.category || null);
          setVariants(product.variants || [{ weight: "", price: 0, stockQuantity: 0 }]);
          
          // Initialize images array with existing images and null placeholders
          const existingImages = product.images || [];
          setImages([
            ...existingImages,
            ...Array(MAX_IMAGES - existingImages.length).fill(null)
          ]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load product data");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const handleImageChange = (index: number, file: File | null) => {
    const newImages = [...images];
    newImages[index] = file || null;
    setImages(newImages);
  };

  const handleImageUpload = async (index: number) => {
    const image = images[index];
    if (image instanceof File) {
      const formData = new FormData();
      formData.append('image', image);
      try {
        // const response = await productapi.updateProductImage(id!, formData, index);
        // if (response.status === 200) {
        //   const newImages = [...images];
        //   newImages[index] = response.data.imageUrl;
        //   setImages(newImages);
        //   toast.success("Image updated successfully");
        // }
      } catch (error) {
        console.error("Error updating image:", error);
        toast.error("Failed to update image");
      }
    }
  };

  const handleAddDescription = () => {
    setDescriptions([...descriptions, { header: "", content: "" }]);
  };

  const handleRemoveDescription = (index: number) => {
    setDescriptions(descriptions.filter((_, i) => i !== index));
  };

  const handleDescriptionChange = (
    index: number,
    field: "header" | "content",
    value: string
  ) => {
    const newDescriptions = [...descriptions];
    newDescriptions[index][field] = value;
    setDescriptions(newDescriptions);
  };

  const handleAddVariant = () =>
    setVariants([...variants, { weight: "", price: 0, stockQuantity: 0 }]);

  const handleRemoveVariant = (index: number) =>
    setVariants(variants.filter((_, i) => i !== index));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const productData = {
      name,
      isListed,
      category: category?._id,
      descriptions,
      variants
    };

    try {
      const response = await productapi.updateProduct(productData, id!);
      if (response.status === 200) {
        toast.success("Product updated successfully");
        navigate("/products");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product");
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <>
    
      <div className="p-4 sm:ml-64 mt-16">
        <h1 className="text-2xl font-bold mb-4">Update Product</h1>
        <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Images</h2>
            <div className="grid grid-cols-5 gap-4">
              {images.map((image, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
                    {image ? (
                      <img
                        src={image instanceof File ? URL.createObjectURL(image) : `../../../../Backend/${image}`}
                        alt={`Product ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-400">No image</span>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(index, e.target.files?.[0] || null)}
                    className="hidden"
                    id={`image-input-${index}`}
                  />
                  <label
                    htmlFor={`image-input-${index}`}
                    className="mt-2 cursor-pointer text-sm text-indigo-600 hover:text-indigo-800"
                  >
                    {image ? 'Change' : 'Add Image'}
                  </label>
                  {image instanceof File && (
                    <button
                      type="button"
                      onClick={() => handleImageUpload(index)}
                      className="mt-1 text-xs text-green-600 hover:text-green-800"
                    >
                      Upload
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name
                </label>
                <input
                  id="productName"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
  id="category"
  value={category?._id || ""}
  onChange={(e) => {
    const selectedCategory = categories.find(
      (cat) => cat.id === e.target.value
    );
    setCategory(selectedCategory || null);  // Update selected category
  }}
  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
  required
>
  <option value={category?._id}>{category?.name || "Select a category"}</option> {/* Default option */}
  {categories.map((cat) => 
    cat.id !== category?._id && (
      <option key={cat.id} value={cat.id}>
        {cat.name} {/* Display the category name */}
      </option>
    )
  )}
</select>


              </div>
            </div>
            <div className="mt-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={isListed}
                  onChange={(e) => setIsListed(e.target.checked)}
                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                <span className="ml-2 text-sm text-gray-600">Listed</span>
              </label>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Descriptions</h2>
            {descriptions.map((desc, index) => (
              <div key={index} className="mb-4 p-4 bg-gray-50 rounded-lg">
                <input
                  type="text"
                  placeholder="Header"
                  value={desc.header}
                  onChange={(e) => handleDescriptionChange(index, "header", e.target.value)}
                  className="mb-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <textarea
                  placeholder="Content"
                  value={desc.content}
                  onChange={(e) => handleDescriptionChange(index, "content", e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  rows={3}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveDescription(index)}
                  className="mt-2 text-sm text-red-600 hover:text-red-800"
                >
                  Remove Description
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddDescription}
              className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Description
            </button>
          </div>


          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Variants</h2>
            {variants.map((variant, index) => (
              <div key={index} className="mb-4 p-4 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder="Weight"
                    value={variant.weight}
                    onChange={(e) =>
                      setVariants(variants.map((v, i) =>
                        i === index ? { ...v, weight: e.target.value } : v
                      ))
                    }
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                  <input
                    type="number"
                    placeholder="Price"
                    value={variant.price}
                    onChange={(e) =>
                      setVariants(variants.map((v, i) =>
                        i === index ? { ...v, price: Number(e.target.value) } : v
                      ))
                    }
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                  <input
                    type="number"
                    placeholder="Stock"
                    value={variant.stockQuantity}
                    onChange={(e) =>
                      setVariants(variants.map((v, i) =>
                        i === index ? { ...v, stockQuantity: Number(e.target.value) } : v
                      ))
                    }
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveVariant(index)}
                  className="mt-2 text-sm text-red-600 hover:text-red-800"
                >
                  Remove Variant
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddVariant}
              className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Variant
            </button>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Update Product
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateProductPage;