import React, { useState } from 'react';
import BannerApi from '../api/bannerapi';

const Banner = () => {
  const [welcomeBanners, setWelcomeBanners] = useState<string[]>([]);
  const [offerBanners, setOfferBanners] = useState<any[]>([]);
  const [collectionBanners, setCollectionBanners] = useState<string[]>([]);
  const [offerStartDate, setOfferStartDate] = useState('');
  const [offerEndDate, setOfferEndDate] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // This function will use the API to upload the image
  const uploadImage = async (file: File, startDate: string, endDate: string) => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('startDate', startDate);
    formData.append('endDate', endDate);

    try {
      // Using the BannerApi class to upload the image and form data
      const imageUrl = await BannerApi.addOfferBanner(formData);
      return imageUrl;
    } catch (error) {
      console.error('Error uploading image', error);
      return null;
    }
  };

  const handleAddWelcomeBanner = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && welcomeBanners.length < 6) {
    //   const uploadedImageUrl = await uploadImage(file);
    //   if (uploadedImageUrl) {
    //     setWelcomeBanners([...welcomeBanners, uploadedImageUrl]);
    //   }
    }
  };

  const handleAddOfferBanner = async () => {
    if (selectedFile && offerStartDate && offerEndDate) {
      const uploadedImageUrl = await uploadImage(selectedFile, offerStartDate, offerEndDate);
      if (uploadedImageUrl) {
        setOfferBanners([
          ...offerBanners,
          { image: uploadedImageUrl, startDate: offerStartDate, endDate: offerEndDate },
        ]);
        setOfferStartDate('');
        setOfferEndDate('');
        setSelectedFile(null);
        setIsModalOpen(false);
      }
    }
  };

  const handleAddCollectionBanner = async (event: React.ChangeEvent<HTMLInputElement>) => {
    // const file = event.target.files?.[0];
    // if (file && collectionBanners.length < 4) {
    //   const uploadedImageUrl = await uploadImage(file);
    //   if (uploadedImageUrl) {
    //     setCollectionBanners([...collectionBanners, uploadedImageUrl]);
    //   }
    // }
  };

  const handleDeleteWelcomeBanner = (index: number) => {
    const updatedBanners = [...welcomeBanners];
    updatedBanners.splice(index, 1);
    setWelcomeBanners(updatedBanners);
  };

  const handleDeleteOfferBanner = (index: number) => {
    const updatedBanners = [...offerBanners];
    updatedBanners.splice(index, 1);
    setOfferBanners(updatedBanners);
  };

  const handleDeleteCollectionBanner = (index: number) => {
    const updatedBanners = [...collectionBanners];
    updatedBanners.splice(index, 1);
    setCollectionBanners(updatedBanners);
  };

  return (
    <div className="p-4 sm:ml-64 mt-16 space-y-6">
      {/* Welcome Banner Section */}
      <div className="relative bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Welcome Banner</h2>
        <div className="flex flex-wrap gap-4">
          {welcomeBanners.map((banner, index) => (
            <div key={index} className="relative">
              <img src={banner} alt="Welcome Banner" className="w-48 h-32 object-cover rounded-md" />
              <button
                onClick={() => handleDeleteWelcomeBanner(index)}
                className="absolute top-0 right-0 px-2 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          ))}
          <input type="file" accept="image/*" onChange={handleAddWelcomeBanner} className="mt-4" />
        </div>
      </div>

      {/* Offer Banner Section */}
      <div className="relative bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Offer Banner</h2>
        <div className="flex flex-wrap gap-4">
          {offerBanners.map((banner, index) => (
            <div key={index} className="relative">
              <img src={banner.image} alt="Offer Banner" className="w-48 h-32 object-cover rounded-md" />
              <p className="text-gray-600">Offer valid from {banner.startDate} to {banner.endDate}</p>
              <button
                onClick={() => handleDeleteOfferBanner(index)}
                className="absolute top-0 right-0 px-2 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
        <button onClick={() => setIsModalOpen(true)} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
          Add Offer Banner
        </button>
      </div>

      {/* Collection Banner Section */}
      <div className="relative bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Collection Banner</h2>
        <div className="flex flex-wrap gap-4">
          {collectionBanners.map((banner, index) => (
            <div key={index} className="relative">
              <img src={banner} alt="Collection Banner" className="w-48 h-32 object-cover rounded-md" />
              <button
                onClick={() => handleDeleteCollectionBanner(index)}
                className="absolute top-0 right-0 px-2 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          ))}
          <input type="file" accept="image/*" onChange={handleAddCollectionBanner} className="mt-4" />
        </div>
      </div>

      {/* Modal for Adding Offer Banner */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">Add Offer Banner</h3>
            <label className="block text-gray-700">Start Date:</label>
            <input
              type="date"
              value={offerStartDate}
              onChange={(e) => setOfferStartDate(e.target.value)}
              className="border border-gray-300 rounded p-2 mt-1 w-full"
            />
            <label className="block text-gray-700 mt-4">End Date:</label>
            <input
              type="date"
              value={offerEndDate}
              onChange={(e) => setOfferEndDate(e.target.value)}
              className="border border-gray-300 rounded p-2 mt-1 w-full"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
              className="mt-4"
            />
            <div className="flex justify-end space-x-4 mt-4">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-500 text-white rounded">
                Cancel
              </button>
              <button onClick={handleAddOfferBanner} className="px-4 py-2 bg-blue-500 text-white rounded">
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Banner;
