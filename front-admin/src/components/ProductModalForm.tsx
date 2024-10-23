import React, { useEffect, useState } from "react";
import { Product, Description, Variant } from "../types/productTypes";
import { Category } from "../types/categoryType";
import categoryapi from "../api/categoryapi";
import subcategoryapi from "../api/subcategoryapi";
import { toast } from "react-toastify";
import productapi from "../api/productapi";

interface ModalFormProps {
  isOpen: boolean;
  onClose: () => void;
  onProductAdd: (newProduct: Product) => void;
}

const ProductModalForm: React.FC<ModalFormProps> = ({
  isOpen,
  onClose,
  onProductAdd,
}) => {
  const [name, setName] = useState("");
  const [descriptions, setDescriptions] = useState<Description[]>([
    { header: "", content: "" },
  ]);
  const [isListed, setIsListed] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [subCategories, setSubCategories] = useState<Category[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [subCategory, setSubCategory] = useState<Category | null>(null);
  const [variants, setVariants] = useState<Variant[]>([
    { weight: "", inPrice: "",outPrice:"", stockQuantity: "" },
  ]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await categoryapi.fetchAllListedCategories();
        if (response.status === 200) {
          setCategories(response.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to fetch categories");
      }
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    async function fetchSubCategories() {
      if (category?._id) {
        try {
          const response = await subcategoryapi.fetchAllListedCategories(category._id);
          if (response.status === 200) {
            setSubCategories(response.data);
            // Reset subcategory selection when main category changes
            setSubCategory(null);
          }
        } catch (error) {
          console.error("Error fetching subcategories:", error);
          toast.error("Failed to fetch subcategories");
        }
      } else {
        setSubCategories([]);
        setSubCategory(null);
      }
    }
    fetchSubCategories();
  }, [category]);

  const resetForm = () => {
    setName("");
    setDescriptions([{ header: "", content: "" }]);
    setIsListed(true);
    setCategory(null);
    setSubCategory(null);
    setVariants([{ weight: "", inPrice: "",outPrice:"", stockQuantity: ""}]);
  };

  const handleAddDescription = () => {
    setDescriptions([...descriptions, { header: "", content: "" }]);
  };

  const handleRemoveDescription = (index: number) => {
    setDescriptions(descriptions.filter((_, i) => i !== index));
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      // Convert FileList to an array of File objects
      setImages(Array.from(selectedFiles));
    }
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
    setVariants([...variants, { weight: "", inPrice: "",outPrice:"", stockQuantity: "" }]);

  const handleRemoveVariant = (index: number) =>
    setVariants(variants.filter((_, i) => i !== index));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("isListed", isListed.toString());

    if (category?._id) {
      formData.append("category", category._id);
    }

    if (subCategory?._id) {
      formData.append("subCategory", subCategory._id);
    }

    descriptions.forEach((desc, index) => {
      formData.append(`descriptions[${index}][header]`, desc.header || "");
      formData.append(`descriptions[${index}][content]`, desc.content || "");
    });

    variants.forEach((variant, index) => {
      formData.append(`variants[${index}][weight]`, variant.weight || "");
      formData.append(`variants[${index}][inPrice]`, variant.inPrice.toString());
      formData.append(`variants[${index}][outPrice]`, variant.inPrice.toString());
      formData.append(
        `variants[${index}][stockQuantity]`,
        variant.stockQuantity.toString()
      );
    });
    images.forEach((image, index) => {
      formData.append(`images`, image);
    });
  

    try {
      const addProduct = await productapi.addProduct(formData);

      if (addProduct.status === 200) {
        onProductAdd(addProduct.data.product);
        toast.success("Product added successfully");
        resetForm();
        onClose();
      }
    } catch (error) {
      toast.error("Failed to add product");
      console.error("Product save error:", error);
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategoryId = e.target.value;
    const selectedCategory = categories.find(
      (cat) => cat._id === selectedCategoryId
    );
    setCategory(selectedCategory || null);
  };

  const handleSubCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSubCategoryId = e.target.value;
    const selectedSubCategory = subCategories.find(
      (cat) => cat._id === selectedSubCategoryId
    );
    setSubCategory(selectedSubCategory || null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-50">
      <div className="relative p-4 w-full max-w-4xl max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Add Product
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
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

          <div className="p-6 space-y-6 overflow-y-auto max-h-[70vh]">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="flex flex-col">
                <label
                  htmlFor="productName"
                  className="text-sm font-medium text-gray-900 dark:text-white mb-1"
                >
                  Product Name
                </label>
                <input
                  id="productName"
                  type="text"
                  placeholder="Product Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                  Descriptions
                </label>
                {descriptions.map((desc, index) => (
                  <div
                    key={index}
                    className="mb-2 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg"
                  >
                    <input
                      type="text"
                      placeholder="Header"
                      value={desc.header}
                      onChange={(e) =>
                        handleDescriptionChange(index, "header", e.target.value)
                      }
                      className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    />
                    <textarea
                      placeholder="Content"
                      value={desc.content}
                      onChange={(e) =>
                        handleDescriptionChange(
                          index,
                          "content",
                          e.target.value
                        )
                      }
                      className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                      rows={3}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveDescription(index)}
                      className="mt-2 text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                    >
                      Remove Description
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddDescription}
                  className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  + Add Description
                </button>
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="category"
                  className="text-sm font-medium text-gray-900 dark:text-white mb-1"
                >
                  Main Category
                </label>
                <select
                  id="category"
                  value={category?._id || ""}
                  onChange={handleCategoryChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                >
                  <option value="" disabled>
                    Select a main category
                  </option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="subCategory"
                  className="text-sm font-medium text-gray-900 dark:text-white mb-1"
                >
                  Sub Category
                </label>
                <select
                  id="subCategory"
                  value={subCategory?._id || ""}
                  onChange={handleSubCategoryChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  disabled={!category}
                >
                  <option value="" disabled>
                    Select a sub category
                  </option>
                  {subCategories.map((subCat) => (
                    <option key={subCat._id} value={subCat._id}>
                      {subCat.name}
                    </option>
                  ))}
                </select>
              </div>

              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              />

<div className="flex flex-col space-y-6">
  <label className="text-sm font-medium text-gray-900 dark:text-white">
    Variants
  </label>

  {variants.map((variant, index) => (
    <div
      key={index}
      className="grid grid-cols-1 gap-y-6 md:grid-cols-3 md:gap-x-6 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md"
    >
      {/* Weight Input */}
      <div className="flex flex-col">
        <label htmlFor={`weight-${index}`} className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Weight
        </label>
        <input
          id={`weight-${index}`}
          type="number"
          placeholder="Enter weight"
          value={variant.weight}
          onChange={(e) =>
            setVariants(
              variants.map((v, i) =>
                i === index ? { ...v, weight: e.target.value } : v
              )
            )
          }
          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2 px-4 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          aria-label="Weight"
        />
      </div>

      {/* In Price Input */}
      <div className="flex flex-col">
        <label htmlFor={`in-price-${index}`} className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
          In Price
        </label>
        <input
          id={`in-price-${index}`}
          type="number"
          placeholder="Enter in price"
          value={variant.inPrice}
          onChange={(e) =>
            setVariants(
              variants.map((v, i) =>
                i === index ? { ...v, inPrice: e.target.value } : v
              )
            )
          }
          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2 px-4 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          aria-label="In Price"
        />
      </div>

      {/* Out Price Input */}
      <div className="flex flex-col">
        <label htmlFor={`out-price-${index}`} className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Out Price
        </label>
        <input
          id={`out-price-${index}`}
          type="number"
          placeholder="Enter out price"
          value={variant.outPrice}
          onChange={(e) =>
            setVariants(
              variants.map((v, i) =>
                i === index ? { ...v, outPrice: e.target.value } : v
              )
            )
          }
          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2 px-4 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          aria-label="Out Price"
        />
      </div>

      {/* Stock Quantity Input */}
      <div className="flex flex-col">
        <label htmlFor={`stock-quantity-${index}`} className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Stock Quantity
        </label>
        <input
          id={`stock-quantity-${index}`}
          type="number"
          placeholder="Enter stock quantity"
          value={variant.stockQuantity}
          onChange={(e) =>
            setVariants(
              variants.map((v, i) =>
                i === index ? { ...v, stockQuantity: e.target.value } : v
              )
            )
          }
          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2 px-4 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          aria-label="Stock Quantity"
        />
      </div>

      <button
        type="button"
        onClick={() => handleRemoveVariant(index)}
        className="col-span-1 md:col-span-3 text-sm font-medium text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 mt-2"
      >
        Remove Variant
      </button>
    </div>
  ))}

  <button
    type="button"
    onClick={handleAddVariant}
    className="text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mt-4"
  >
    + Add Variant
  </button>
</div>


              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Add Product
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModalForm;
