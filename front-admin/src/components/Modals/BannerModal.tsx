import React from "react";
import { X } from "lucide-react";

interface BannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  selectedBannerType: string;
  setSelectedBannerType: (value: string) => void;
  bannerName: string;
  setBannerName: (value: string) => void;
  offerStartDate: string;
  setOfferStartDate: (value: string) => void;
  offerEndDate: string;
  setOfferEndDate: (value: string) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  previewUrl: string | null;
  loading: boolean;
  validationErrors: { [key: string]: string }; // Validation errors mapped to fields
}

const BannerModal: React.FC<BannerModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  selectedBannerType,
  setSelectedBannerType,
  bannerName,
  setBannerName,
  offerStartDate,
  setOfferStartDate,
  offerEndDate,
  setOfferEndDate,
  onFileChange,
  previewUrl,
  loading,
  validationErrors,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        <h3 className="text-2xl font-bold text-gray-800 mb-6">Add New Banner</h3>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Banner Type
            </label>
            <select
              value={selectedBannerType}
              onChange={(e) => setSelectedBannerType(e.target.value)}
              className="w-full p-3 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select type...</option>
              <option value="Welcome">Welcome Banner</option>
              <option value="Offer">Offer Banner</option>
              <option value="Collection">Collection Banner</option>
            </select>
            {validationErrors.selectedBannerType && (
              <p className="text-sm text-red-500 mt-1">
                {validationErrors.selectedBannerType}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Banner Name
            </label>
            <input
              type="text"
              value={bannerName}
              onChange={(e) => setBannerName(e.target.value)}
              className="w-full p-3 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {validationErrors.bannerName && (
              <p className="text-sm text-red-500 mt-1">
                {validationErrors.bannerName}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <input
              type="date"
              value={offerStartDate}
              onChange={(e) => setOfferStartDate(e.target.value)}
              className="w-full p-3 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {validationErrors.offerStartDate && (
              <p className="text-sm text-red-500 mt-1">
                {validationErrors.offerStartDate}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <input
              type="date"
              value={offerEndDate}
              onChange={(e) => setOfferEndDate(e.target.value)}
              className="w-full p-3 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {validationErrors.offerEndDate && (
              <p className="text-sm text-red-500 mt-1">
                {validationErrors.offerEndDate}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Banner
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={onFileChange}
              className="w-full p-3 rounded-lg border-gray-300 shadow-sm"
            />
            {validationErrors.file && (
              <p className="text-sm text-red-500 mt-1">{validationErrors.file}</p>
            )}
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Preview"
                className="mt-4 w-full h-40 object-cover rounded-lg"
              />
            )}
          </div>
        </div>

        <button
          onClick={onSubmit}
          disabled={loading}
          className={`mt-6 w-full bg-black text-white py-3 rounded-lg shadow-sm ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-800"
          }`}
        >
          {loading ? "Adding Banner..." : "Add Banner"}
        </button>
      </div>
    </div>
  );
};

export default BannerModal;
