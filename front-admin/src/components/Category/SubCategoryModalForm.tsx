import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CategoryApi from "../../api/categoryapi";
import subcategoryapi from "../../api/subcategoryapi";

interface CategoryModalFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newCategory: any) => any;
  category?: any;
}

const SubCategoryModalForm: React.FC<CategoryModalFormProps> = ({
  isOpen,
  onClose,
  onSuccess,
  category,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [mainCategory, setMainCategory] = useState("");
  const [mainCategories, setMainCategories] = useState<any[]>([]);
  const [priority, setPriority] = useState<number | 101>(101);
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    mainCategory: "",
    priority: "",
    photo: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availablePriorities, setAvailablePriorities] = useState<number[]>([]);
  const [isLoadingPriority, setIsLoadingPriority] = useState(false);

  useEffect(() => {
    if (category) {
      setName(category.name || "");
      setDescription(category.description || "");
      setMainCategory(category.mainCategory || "");
      setPriority(category.priority || 101);
      setPhotoPreview(category.photo || null);
    } else {
      setName("");
      setDescription("");
      setMainCategory("");
      setPriority(101);
      setPhoto(null);
      setPhotoPreview(null);
    }
  }, [category]);

  useEffect(() => {
    const fetchMainCategories = async () => {
      try {
        const response = await CategoryApi.fetchAllListedCategories();
        setMainCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching main categories:", error);
      }
    };
    fetchMainCategories();
  }, []);

  useEffect(() => {
    const fetchAvailablePriorities = async () => {
      try {
        setIsLoadingPriority(true);
        const response = await subcategoryapi.getAvailablePriorities();
        let priorities = response.data.priorities || [];
        if (category && !priorities.includes(category.priority)) {
          if(category.priority==101)
          {priorities = [...priorities];}
          else{priorities = [category.priority, ...priorities];}
        }
        setAvailablePriorities(priorities);
      } catch (error) {
        console.error("Error fetching available priorities:", error);
        toast.error("Failed to fetch available priorities. Please try again.");
      } finally {
        setIsLoadingPriority(false);
      }
    };

    if (isOpen) {
      fetchAvailablePriorities();
    }
  }, [isOpen, category]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: "",
      description: "",
      mainCategory: "",
      priority: "",
      photo: "",
    };

    if (!name.trim()) {
      newErrors.name = "Subcategory name is required";
      isValid = false;
    }

    if (!description.trim()) {
      newErrors.description = "Description is required";
      isValid = false;
    }

    if (!mainCategory) {
      newErrors.mainCategory = "Main category is required";
      isValid = false;
    }

    if (!priority) {
      newErrors.priority = "Priority is required";
      isValid = false;
    }

    if (!photo && !category?.photo) {
      newErrors.photo = "Subcategory image is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("mainCategory", mainCategory);
    formData.append("priority", String(priority));
    if (photo) formData.append("photo", photo);

    try {
      let response;
      if (category) {
        response = await subcategoryapi.updateCategory(category._id, formData);
      } else {
        response = await subcategoryapi.addCategory(formData);
      }

      if (response.data) {
        onSuccess(response.data);
        toast.success(
          `Subcategory ${category ? "updated" : "created"} successfully`
        );
        onClose();
      }
    } catch (error) {
      console.error("Error submitting subcategory:", error);
      toast.error(
        `Failed to ${category ? "update" : "create"} subcategory. Please try again.`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h2 className="text-xl font-semibold mb-4">
          {category ? "Edit Subcategory" : "Add Subcategory"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Name Input */}
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded"
              />
              {errors.name && (
                <p className="text-sm text-red-600">{errors.name}</p>
              )}
            </div>
            {/* Main Category */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Main Category
              </label>
              <select
                value={mainCategory}
                onChange={(e) => setMainCategory(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="">Select Category</option>
                {mainCategories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {errors.mainCategory && (
                <p className="text-sm text-red-600">{errors.mainCategory}</p>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded"
            />
            {errors.description && (
              <p className="text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          {/* Priority and Photo */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(Number(e.target.value))}
                className="w-full p-2 border rounded"
                disabled={isLoadingPriority}
              >
                <option value="101">Select defualt</option>
                {availablePriorities.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
              {errors.priority && (
                <p className="text-sm text-red-600">{errors.priority}</p>
              )}
            </div>

            {/* Photo Upload */}
            <div>
              <label className="block text-sm font-medium mb-1">Photo</label>
              <input
                type="file"
                onChange={handlePhotoChange}
                className="w-full p-2 border rounded"
              />
              {errors.photo && (
                <p className="text-sm text-red-600">{errors.photo}</p>
              )}
              {photoPreview && (
                <div className="mt-2">
                  <img
                    src={photoPreview}
                    alt="Preview"
                    className="w-32 h-32 object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubCategoryModalForm;
