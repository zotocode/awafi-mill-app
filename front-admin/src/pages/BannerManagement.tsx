import BannerApi from "../api/bannerapi";
import BannerCard from "../components/Cards/BannerCards";
import ConfirmationDialog from "../components/ConfirmationDialog";
import {
  Plus,
  Image as ImageIcon,
  X,
  FileQuestion,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const Banner = () => {
  const [banners, setBanners] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedBannerType, setSelectedBannerType] = useState<string>("");
  const [bannerName, setBannerName] = useState("");
  const [offerStartDate, setOfferStartDate] = useState("");
  const [offerEndDate, setOfferEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [currentBannerType, setCurrentBannerType] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogAction, setDialogAction] = useState<() => void>(() => {});

  // Form validation states
  const [errors, setErrors] = useState({
    bannerType: "",
    bannerName: "",
    startDate: "",
    endDate: "",
    file: ""
  });

  const bannerTypes = [
    { title: "Offer Banners", key: "offerBanners" },
    { title: "Welcome Banners", key: "welcomeBanners" },
    { title: "Collection Banners", key: "collectionBanners" },
  ];

  const handleNext = () => {
    setCurrentBannerType((prev) => (prev + 1) % bannerTypes.length);
  };

  const handlePrevious = () => {
    setCurrentBannerType(
      (prev) => (prev - 1 + bannerTypes.length) % bannerTypes.length
    );
  };

  const fetchBanners = async () => {
    setLoading(true);
    try {
      const response = await BannerApi.fetchBanners();
      setBanners(response.data);
    } catch (error) {
      console.error("Error fetching banners:", error);
      toast.error("Failed to fetch banners");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, [isModalOpen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setErrors(prev => ({ ...prev, file: "" }));
    }
  };

  const validateForm = (): boolean => {
    const currentDate = new Date().toISOString().split("T")[0];
    const newErrors = {
      bannerType: "",
      bannerName: "",
      startDate: "",
      endDate: "",
      file: ""
    };
    let isValid = true;

    if (!selectedBannerType) {
      newErrors.bannerType = "Please select a banner type";
      isValid = false;
    }

    if (!bannerName.trim()) {
      newErrors.bannerName = "Banner name is required";
      isValid = false;
    }

    if (!offerStartDate) {
      newErrors.startDate = "Start date is required";
      isValid = false;
    } else if (offerStartDate < currentDate || offerStartDate == currentDate) {
      newErrors.startDate = "Start date not be today or a can be future date";
      isValid = false;
    }

    if (!offerEndDate) {
      newErrors.endDate = "End date is required";
      isValid = false;
    } else if (offerEndDate <= offerStartDate) {
      newErrors.endDate = "End date must be after the start date";
      isValid = false;
    }

    if (!selectedFile) {
      newErrors.file = "Please upload a banner image";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const uploadImage = async (
    file: File,
    startDate: string,
    endDate: string,
    bannerName: string,
    bannerType: string
  ) => {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);
    formData.append("name", bannerName);
    formData.append("type", bannerType);

    try {
      const data = await BannerApi.addOfferBanner(formData);
      if (data) {
        resetModal();
        toast.success("Banner added successfully!");
      }
    } catch (error) {
      console.error("Error uploading image", error);
      toast.error("Failed to upload banner");
      return null;
    }
  };

  const handleAddBanner = async () => {
    if (validateForm()) {
      setLoading(true);
      await uploadImage(
        selectedFile!,
        offerStartDate,
        offerEndDate,
        bannerName,
        selectedBannerType
      );
      setLoading(false);
    }
  };

  const resetModal = () => {
    setIsModalOpen(false);
    setSelectedFile(null);
    setPreviewUrl(null);
    setOfferStartDate("");
    setOfferEndDate("");
    setSelectedBannerType("");
    setBannerName("");
    setErrors({
      bannerType: "",
      bannerName: "",
      startDate: "",
      endDate: "",
      file: ""
    });
  };

  const handleToggleListed = async (row: any) => {
    const action = row.listed ? "unlist" : "list";
    setDialogMessage(`Are you sure you want to ${action} this banner?`);
    setDialogAction(() => async () => {
      try {
        await BannerApi.unlistBanners(row);
        await fetchBanners();
        toast.success(`Banner ${action}ed successfully`);
      } catch (error) {
        toast.error(`Failed to ${action} banner`);
      } finally {
        setIsDialogOpen(false);
      }
    });
    setIsDialogOpen(true);
  };

  const deleteBanner = async (row: any) => {
    setDialogMessage("Are you sure you want to delete this banner?");
    setDialogAction(() => async () => {
      try {
        await BannerApi.deleteBanners(row);
        await fetchBanners();
        toast.success("Banner deleted successfully");
      } catch (error) {
        toast.error("Failed to delete banner");
      } finally {
        setIsDialogOpen(false);
      }
    });
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Banner Management
          </h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center px-4 py-2 bg-black text-white rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Banner
          </button>
        </div>

        {/* Navigation Pills */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-gray-100 rounded-lg p-1">
            {bannerTypes.map((type, index) => (
              <button
                key={type.key}
                onClick={() => setCurrentBannerType(index)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentBannerType === index
                    ? "bg-black text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {type.title}
              </button>
            ))}
          </div>
        </div>

        {/* Current Banner Type Display */}
        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={handlePrevious}
              className="p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            <h2 className="text-2xl font-bold text-gray-800">
              {bannerTypes[currentBannerType].title}
            </h2>
            <button
              onClick={handleNext}
              className="p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Banner Grid */}
          <div className="mt-6">
            {banners.flatMap(
              (banner) => banner[bannerTypes[currentBannerType].key]
            ).length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 bg-white dark:bg-gray-900">
                <FileQuestion className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  No Data Available
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  No records found to display.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {banners
                  .flatMap(
                    (banner) => banner[bannerTypes[currentBannerType].key]
                  )
                  .map((banner, index) => (
                    <BannerCard
                      key={index}
                      banner={banner}
                      type={bannerTypes[currentBannerType].key}
                      handleToggleListed={handleToggleListed}
                      deleteBanner={deleteBanner}
                    />
                  ))}
              </div>
            )}
          </div>

          {/* Page Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {bannerTypes.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentBannerType(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentBannerType === index ? "bg-blue-600" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative">
              <button
                onClick={resetModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>

              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Add New Banner
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Banner Type
                  </label>
                  <select
                    value={selectedBannerType}
                    onChange={(e) => {
                      setSelectedBannerType(e.target.value);
                      setErrors(prev => ({ ...prev, bannerType: "" }));
                    }}
                    className={`w-full p-3 rounded-lg border shadow-sm focus:ring-blue-500 ${
                      errors.bannerType ? "border-red-500" : "border-gray-300 focus:border-blue-500"
                    }`}
                  >
                    <option value="">Select type...</option>
                    <option value="Welcome">Welcome Banner</option>
                    <option value="Offer">Offer Banner</option>
                    <option value="Collection">Collection Banner</option>
                  </select>
                  {errors.bannerType && (
                    <p className="mt-1 text-sm text-red-600">{errors.bannerType}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Banner Name
                  </label>
                  <input
                    type="text"
                    value={bannerName}
                    onChange={(e) => {
                      setBannerName(e.target.value);
                      setErrors(prev => ({ ...prev, bannerName: "" }));
                    }}
                    className={`w-full p-3 rounded-lg border shadow-sm focus:ring-blue-500 ${
                      errors.bannerName ? "border-red-500" : "border-gray-300 focus:border-blue-500"
                    }`}
                    placeholder="Enter banner name"
                  />
                  {errors.bannerName && (
                    <p className="mt-1 text-sm text-red-600">{errors.bannerName}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={offerStartDate}
                      onChange={(e) => {
                        setOfferStartDate(e.target.value);
                        setErrors(prev => ({ ...prev, startDate: "" }));
                      }}
                      className={`w-full p-3 rounded-lg border shadow-sm focus:ring-blue-500 ${
                        errors.startDate ? "border-red-500" : "border-gray-300 focus:border-blue-500"
                      }`}
                    />
                    {errors.startDate && (
                      <p className="mt-1 text-sm text-red-600">{errors.startDate}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={offerEndDate}
                      onChange={(e) => {
                        setOfferEndDate(e.target.value);
                        setErrors(prev => ({ ...prev, endDate: "" }));
                      }}
                      className={`w-full p-3 rounded-lg border shadow-sm focus:ring-blue-500 ${
                        errors.endDate ? "border-red-500" : "border-gray-300 focus:border-blue-500"
                      }`}
                    />
                    {errors.endDate && (
                      <p className="mt-1 text-sm text-red-600">{errors.endDate}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Banner Image
                  </label>
                  <div className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg ${
                    errors.file ? "border-red-500" : "border-gray-300"
                  }`}>
                    <div className="space-y-1 text-center">
                      {previewUrl ? (
                        <div className="relative">
                          <img
                            src={previewUrl}
                            alt="Preview"
                            className="mx-auto h-32 w-auto rounded"
                          />
                          <button
                            onClick={() => {
                              setSelectedFile(null);
                              setPreviewUrl(null);
                            }}
                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <>
                          <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="flex text-sm text-gray-600">
                            <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                              <span>Upload a file</span>
                              <input
                                type="file"
                                className="sr-only"
                                accept="image/*"
                                onChange={handleFileChange}
                              />
                            </label>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  {errors.file && (
                    <p className="mt-1 text-sm text-red-600">{errors.file}</p>
                  )}
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-4">
                <button
                  onClick={resetModal}
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddBanner}
                  disabled={loading}
                  className={`px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Processing...
                    </>
                  ) : (
                    "Add Banner"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {isDialogOpen && (
        <ConfirmationDialog
          message={dialogMessage}
          confirmButtonLabel="Yes"
          cancelButtonLabel="No"
          onConfirm={dialogAction}
          onCancel={() => setIsDialogOpen(false)}
        />
      )}
    </div>
  );
};

export default Banner;