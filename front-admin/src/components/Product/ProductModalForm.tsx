import React, { useEffect, useState } from "react";
import { Product, Description, Variant } from "../../types/productTypes";
import { Category } from "../../types/categoryType";
import categoryapi from "../../api/categoryapi";
import subcategoryapi from "../../api/subcategoryapi";
import { toast } from "react-toastify";
import productapi from "../../api/productapi";
import { z } from "zod";

interface ModalFormProps {
  isOpen: boolean;
  onClose: () => void;
  onProductAdd: (newProduct: Product) => void;
}

const AddProductModal: React.FC<ModalFormProps> = ({
  isOpen,
  onClose,
  onProductAdd,
}) => {
  const [name, setName] = useState("");
  const [sku, setSku] = useState(""); // New state for SKU
  const [ean, setEan] = useState(""); // New state for EAN
  const [descriptions, setDescriptions] = useState<Description[]>([
    { header: "", content: "" },
  ]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [subCategories, setSubCategories] = useState<Category[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [subCategory, setSubCategory] = useState<Category | null>(null);
  const [variants, setVariants] = useState<Variant[]>([
    { weight: "", inPrice: "", outPrice: "", stockQuantity: "" },
  ]);
  const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await categoryapi.fetchAllListedCategories();
        if (response.status === 200) {
          setCategories(response.data.data);
        }
      } catch (error) {

        toast.error("Failed to fetch categories");
      }
    }
    fetchCategories();
  }, []);
  useEffect(() => {
    async function fetchSubCategories() {
      if (category?._id) {
        try {
          const response = await subcategoryapi.fetchAllListedCategories(
            category._id
          );

          if (response.status === 200) {
            // Check if the response.data is an array
            if (Array.isArray(response.data.data)) {
              setSubCategories(response.data.data);
            } else {
              setSubCategories([]); // Set to empty array if not an array
            }
            setSubCategory(null);
          }
        } catch (error) {
          toast.error("Failed to fetch subcategories");
          setSubCategories([]); // Ensure to reset if there's an error
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
    setCategory(null);
    setSubCategory(null);
    setVariants([{ weight: "", inPrice: "", outPrice: "", stockQuantity: "" }]);
    setImages([]);
    setErrors({});
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
      const validImages = Array.from(selectedFiles).filter(
        (file) => file.type.startsWith("image/") && file.size <= 5 * 1024 * 1024
      );

      if (validImages.length !== selectedFiles.length) {
        toast.error("Invalid file(s): Only images under 2MB are allowed.");
      }

      setImages(validImages);
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
    setVariants([
      ...variants,
      { weight: "", inPrice: "", outPrice: "", stockQuantity: "" },
    ]);

  const handleRemoveVariant = (index: number) =>
    setVariants(variants.filter((_, i) => i !== index));

  const validateWeight = (value: string) => {
    const weightRegex = /^(\d+(\.\d+)?)\s*(gram|piece|mg|stick|g|kg|ml|l)s?$/i;
    return weightRegex.test(value);
  };

  const validateForm = () => {
    const errors: any = {};

    // Validate product name
    if (!name.trim()) {
      errors.name = "Product name is required.";
    }

    // Validate SKU
    if (!sku.trim()) {
      errors.sku = "SKU is required.";
    }

    // Validate EAN
    if (!ean.trim()) {
      errors.ean = "EAN is required.";
    }

    // Validate category selection
    if (!category) {
      errors.category = "Category is required.";
    }

    // Validate descriptions
    if (descriptions.some((desc) => !desc.header || !desc.content)) {
      errors.descriptions = "Each description must have a header and content.";
    }

    // Validate variants
    const variantErrors = variants.map((variant, index) => {
      const variantError: any = {};

      // Check weight
      if (!variant.weight) {
        variantError.weight = "Weight is required.";
      } else if (!validateWeight(variant.weight)) {
        variantError.weight = 'Invalid weight format. Please use a number followed by a unit (e.g., 100 grams, 5 pieces, 500 mg, 2 sticks)';
      }

      // Check inPrice
      if (
        !variant.inPrice ||
        isNaN(Number(variant.inPrice)) ||
        Number(variant.inPrice) <= 0
      ) {
        variantError.inPrice = "In Price must be a positive number.";
      }

      // Check outPrice
      if (
        !variant.outPrice ||
        isNaN(Number(variant.outPrice)) ||
        Number(variant.outPrice) <= 0
      ) {
        variantError.outPrice = "Out Price must be a positive number.";
      }

      // Check stock quantity
      if (
        !variant.stockQuantity ||
        isNaN(Number(variant.stockQuantity)) ||
        Number(variant.stockQuantity) < 0
      ) {
        variantError.stockQuantity =
          "Stock Quantity must be 0 or a positive number.";
      }

      return Object.keys(variantError).length ? variantError : null;
    });

    // Check for any variant errors
    if (variantErrors.some((error) => error !== null)) {
      errors.variants = variantErrors;
    }

    setErrors(errors);
    return Object.keys(errors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!validateForm()) {
      toast.error("Please correct the errors before submitting.");
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("sku", sku);
    formData.append("ean", ean);

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
      formData.append(`variants[${index}][outPrice]`, variant.outPrice.toString());
      formData.append(`variants[${index}][stockQuantity]`, variant.stockQuantity.toString());
    });

    images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      const addProduct = await productapi.addProduct(formData);

      if (addProduct.status == 200) {
        onProductAdd(addProduct.data.product);
        toast.success("Product added successfully");
        resetForm();
        onClose();
      }
    } catch (error) {
      toast.error("Failed to add product");
    } finally {
      setIsSubmitting(false);
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
    <div className="fixed inset-0 z-9999 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-50">
      <div className="relative p-4 w-full max-w-6xl max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Add New Product
            </h3>
            <button
              type="button"
              className="text-gray-400 hover:bg-gray-200 rounded-lg p-1.5 ml-auto inline-flex items-center justify-center"
              onClick={onClose}
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M1.5 1.5a.5.5 0 0 1 .707 0L8 7.293l5.793-5.793a.5.5 0 0 1 .707.707L8.707 8l5.793 5.793a.5.5 0 0 1-.707.707L8 8.707l-5.793 5.793a.5.5 0 0 1-.707-.707L7.293 8 1.5 2.207a.5.5 0 0 1 0-.707z"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-6 space-y-6">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex flex-row space-x-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Product Name
                    </label>
                    <input
                      type="text"
                      className={`mt-1 block w-full border ${
                        errors.name ? "border-red-500" : "border-gray-300"
                      } rounded-md shadow-sm p-2`}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                    )}
                  </div>

                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Images (Max 2MB)
                    </label>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                  </div>
                </div>

                <div className="flex flex-row space-x-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700">
                      SKU
                    </label>
                    <input
                      type="text"
                      className={`mt-1 block w-full border ${
                        errors.sku ? "border-red-500" : "border-gray-300"
                      } rounded-md shadow-sm p-2`}
                      value={sku}
                      onChange={(e) => setSku(e.target.value)}
                    />
                    {errors.sku && (
                      <p className="mt-1 text-sm text-red-600">{errors.sku}</p>
                    )}
                  </div>

                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700">
                      EAN
                    </label>
                    <input
                      type="text"
                      className={`mt-1 block w-full border ${
                        errors.ean ? "border-red-500" : "border-gray-300"
                      } rounded-md shadow-sm p-2`}
                      value={ean}
                      onChange={(e) => setEan(e.target.value)}
                    />
                    {errors.ean && (
                      <p className="mt-1 text-sm text-red-600">{errors.ean}</p>
                    )}
                  </div>
                </div>

                <div className="flex flex-row space-x-4">
                  <div className="md:flex-1 flex-none">
                    <label className="block text-sm font-medium text-gray-700">
                      Category
                    </label>
                    <select
                      className={`mt-1 block w-full border ${
                        errors.category ? "border-red-500" : "border-gray-300"
                      } rounded-md shadow-sm p-2`}
                      value={category?._id || ""}
                      onChange={handleCategoryChange}
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                    {errors.category && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.category}
                      </p>
                    )}
                  </div>

                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Sub-Category
                    </label>
                    <select
                      className={`mt-1 block w-full border ${
                        errors.subCategory
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-md shadow-sm p-2`}
                      value={subCategory?._id || ""}
                      onChange={handleSubCategoryChange}
                    >
                      <option value="">Select Sub-Category</option>
                      {subCategories.map((sub) => (
                        <option key={sub._id} value={sub._id}>
                          {sub.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Descriptions
                  </label>
                  {descriptions.map((desc, index) => (
                    <div key={index} className="flex space-x-2">
                      <input
                        type="text"
                        placeholder="Header"
                        className={`mt-1 block w-1/2 border ${
                          errors.descriptions
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded-md shadow-sm p-2`}
                        value={desc.header}
                        onChange={(e) =>
                          handleDescriptionChange(
                            index,
                            "header",
                            e.target.value
                          )
                        }
                      />

                      <input
                        type="text"
                        placeholder="Content"
                        className={`mt-1 block w-1/2 border ${
                          errors.descriptions
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded-md shadow-sm p-2`}
                        value={desc.content}
                        onChange={(e) =>
                          handleDescriptionChange(
                            index,
                            "content",
                            e.target.value
                          )
                        }
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveDescription(index)}
                        className="mt-1 text-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={handleAddDescription}
                    className="mt-2 bg-black text-white rounded-md p-2"
                  >
                    Add Description
                  </button>
                  {errors.descriptions && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.descriptions}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Variants
                  </label>
                  {variants.map((variant, index) => (
                    <div key={index} className="mb-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col">
                          <input
                            type="text"
                            placeholder="Weight (e.g., 100 grams, 5 pieces)"
                            className={`mt-1 block border ${
                              errors.variants && errors.variants[index]?.weight
                                ? "border-red-500"
                                : "border-gray-300"
                            } rounded-md shadow-sm p-2`}
                            value={variant.weight}
                            onChange={(e) =>
                              setVariants((prev) =>
                                prev.map((v, i) =>
                                  i === index
                                    ? { ...v, weight: e.target.value }
                                    : v
                                )
                              )
                            }
                          />
                          {errors.variants &&
                            errors.variants[index]?.weight && (
                              <p className="mt-1 text-sm text-red-600">
                                {errors.variants[index].weight}
                              </p>
                            )}
                        </div>

                        <div className="flex flex-col">
                          <input
                            type="text"
                            placeholder="In Price"
                            className={`mt-1 block border ${
                              errors.variants && errors.variants[index]?.inPrice
                                ? "border-red-500"
                                : "border-gray-300"
                            } rounded-md shadow-sm p-2`}
                            value={variant.inPrice.toString()}
                            onChange={(e) =>
                              setVariants((prev) =>
                                prev.map((v, i) =>
                                  i === index
                                    ? { ...v, inPrice: e.target.value }
                                    : v
                                )
                              )
                            }
                          />
                          {errors.variants &&
                            errors.variants[index]?.inPrice && (
                              <p className="mt-1 text-sm text-red-600">
                                {errors.variants[index].inPrice}
                              </p>
                            )}
                        </div>

                        <div className="flex flex-col">
                          <input
                            type="text"
                            placeholder="Out Price"
                            className={`mt-1 block border ${
                              errors.variants &&
                              errors.variants[index]?.outPrice
                                ? "border-red-500"
                                : "border-gray-300"
                            } rounded-md shadow-sm p-2`}
                            value={variant.outPrice.toString()}
                            onChange={(e) =>
                              setVariants((prev) =>
                                prev.map((v, i) =>
                                  i === index
                                    ? { ...v, outPrice: e.target.value }
                                    : v
                                )
                              )
                            }
                          />
                          {errors.variants &&
                            errors.variants[index]?.outPrice && (
                              <p className="mt-1 text-sm text-red-600">
                                {errors.variants[index].outPrice}
                              </p>
                            )}
                        </div>

                        <div className="flex flex-col">
                          <input
                            type="text"
                            placeholder="Stock Quantity"
                            className={`mt-1 block border ${
                              errors.variants &&
                              errors.variants[index]?.stockQuantity
                                ? "border-red-500"
                                : "border-gray-300"
                            } rounded-md shadow-sm p-2`}
                            value={variant.stockQuantity.toString()}
                            onChange={(e) =>
                              setVariants((prev) =>
                                prev.map((v, i) =>
                                  i === index
                                    ? { ...v, stockQuantity: e.target.value }
                                    : v
                                )
                              )
                            }
                          />
                          {errors.variants &&
                            errors.variants[index]?.stockQuantity && (
                              <p className="mt-1 text-sm text-red-600">
                                {errors.variants[index].stockQuantity}
                              </p>
                            )}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveVariant(index)}
                        className="mt-2 text-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={handleAddVariant}
                    className="mt-2 bg-black text-white rounded-md p-2"
                  >
                    Add Variant
                  </button>
                </div>


                <button
                  type="submit"
                  className={`mt-4 w-full bg-black text-white rounded-md p-2 ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Adding..." : "Add Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
