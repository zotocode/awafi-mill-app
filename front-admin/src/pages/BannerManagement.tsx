import { useState, useEffect } from 'react';
import BannerApi from '../api/bannerapi';
import Table from '../components/Tables/Table';
import { toast } from 'react-toastify';





const Banner = () => {
  const [banners, setBanners] = useState<any[]>([]); // State for all banners
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedBannerType, setSelectedBannerType] = useState<string>(''); 
  const [bannerName, setBannerName] = useState(''); 
  const [offerStartDate, setOfferStartDate] = useState('');
  const [offerEndDate, setOfferEndDate] = useState('');
  const [loading,setLoading] = useState(false)


  // Define fetchBanners outside the useEffect so it can be reused
  const fetchBanners = async () => {
    setLoading(true);
    try {
      const response = await BannerApi.fetchBanners();
      setBanners(response.data); // Update banners state
    } catch (error) {
      console.error('Error fetching banners:', error);
    }finally{
      setLoading(false);
    }
  };

  // useEffect to fetch banners on mount and when modal state changes
  useEffect(() => {
    fetchBanners(); // Fetch banners when component mounts or modal is opened/closed
  }, [isModalOpen]); // Refetch banners when modal is opened/closed

  const welcomeBanners = banners.flatMap(banner => banner.welcomeBanners);
  const offerBanners = banners.flatMap(banner => banner.offerBanners);
  const collectionBanners = banners.flatMap(banner => banner.collectionBanners);

  const uploadImage = async (file: File, startDate: string, endDate: string, bannerName: string, bannerType: string) => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('startDate', startDate);
    formData.append('endDate', endDate);
    formData.append('name', bannerName); 
    formData.append('type', bannerType); 

    try {
      const data = await BannerApi.addOfferBanner(formData);
      if(data){
        resetModal(); 
      }
    } catch (error) {
      console.error('Error uploading image', error);
      return null;
    }
  };

  const handleAddBanner = async () => {
    const currentDate = new Date().toISOString().split("T")[0]; // Get the current date in YYYY-MM-DD format
    if (!offerStartDate || !offerEndDate) {
      toast.error("Please select both start and end dates.");
      return;
    }
    
    if (offerStartDate < currentDate) {
        toast.error("Start date must be today or a future date.");
        return;
    }

    if (offerEndDate <= offerStartDate) {
        toast.error("End date must be after the start date.");
        return;
    }

    if (selectedFile && selectedBannerType && bannerName) {
      setLoading(true);
        const uploadedImageUrl = await uploadImage(selectedFile, offerStartDate, offerEndDate, bannerName, selectedBannerType);
        if (uploadedImageUrl) {
            setBanners((prevBanners) => [
                ...prevBanners,
                { 
                    type: selectedBannerType, 
                    name: bannerName, 
                    image: uploadedImageUrl, 
                    startDate: offerStartDate, 
                    endDate: offerEndDate,
                },
            ]);
            resetModal();
            toast.success("Banner added successfully!");
        }
        setLoading(false);
    } else {
        toast.error("Please fill in all fields.");
    }
    resetModal()
};


  const resetModal = () => {
    setIsModalOpen(false);
    setSelectedFile(null);
    setOfferStartDate('');
    setOfferEndDate('');
    setSelectedBannerType('');
    setBannerName('');
  };

  const handleToggleListed = async (row: any) => {
    setLoading(true);
    try {
      const data = await BannerApi.unlistBanners(row);  // Call the API to toggle listed status
      console.log(data);
      await fetchBanners();  // Re-fetch banner data to reflect the changes in the table
    } catch (error) {
      console.error('Error toggling listed status:', error);
    }finally {
      setLoading(false);
    }
  };
 
  const deleteBanner = async (row:any)=>{
    try {
      const data = await BannerApi.deleteBanners(row);  // Call the API to toggle listed status
      console.log(data);
      await fetchBanners();  // Re-fetch banner data to reflect the changes in the table
    } catch (error) {
      console.error('Error toggling listed status:', error);
    }

  }

  // Define columns for the table component
  const columns = [
    {
      header: 'Preview',
      accessor: 'image',
      render: (row: any) => <img src={row.imageUrl} alt="Banner Preview" className="w-20 h-20 object-cover" />,
    },
    { header: 'Name', accessor: 'name' },
    { header: 'Start Date', accessor: 'startDate', render: (row: any) => new Date(row.startDate).toLocaleDateString() },
    { header: 'End Date', accessor: 'endDate', render: (row: any) => new Date(row.endDate).toLocaleDateString() },
    {
      header: 'Status',
      accessor: 'listed',
      render: (row: any) => (
        <button
          onClick={() => handleToggleListed(row)}
          className={`px-4 py-2 rounded ${row.listed ? 'bg-red-500' : 'bg-green-500'} text-white`}
        >
          {row.listed ? 'Unlist' : 'List'}
        </button>
      ),
    },
    {
      header: 'Delete',
      accessor: 'delete',
      render: (row: any) => (
        <button
          onClick={() => deleteBanner(row)}
          className={"px-4 py-2 rounded bg-red-500 text-white"}
        >
          Delete
        </button>
      ),
    }

  ];

  return (
    <div className="p-4 sm:ml-15 space-y-6">
      <button onClick={() => setIsModalOpen(true)} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        Add Banner
      </button>

      {/* Modal for Adding Banner */}
{isModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"> {/* Added z-50 */}
    <div className="bg-white p-6 rounded-lg shadow-lg w-96 z-60"> {/* Added z-60 */}
      <h3 className="text-xl font-bold mb-4">Add Banner</h3>
      {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-75 z-70">
                <div className="loader">Loading...</div>
              </div>
            )}
      <label className="block text-gray-700">Select Banner Type:</label>
      <select
        value={selectedBannerType}
        onChange={(e) => setSelectedBannerType(e.target.value)}
        className="border border-gray-300 rounded p-2 mt-1 w-full"
      >
        <option value="">Select...</option>
        <option value="Welcome">Welcome Banner</option>
        <option value="Offer">Offer Banner</option>
        <option value="Collection">Collection Banner</option>
      </select>
      <label className="block text-gray-700 mt-4">Banner Name:</label>
      <input
        type="text"
        value={bannerName}
        onChange={(e) => setBannerName(e.target.value)}
        className="border border-gray-300 rounded p-2 mt-1 w-full"
        placeholder="Enter Banner Name"
      />
      <label className="block text-gray-700 mt-4">Start Date:</label>
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
        <button onClick={resetModal} className="px-4 py-2 bg-gray-500 text-white rounded">
          Cancel
        </button>
        <button onClick={handleAddBanner} className="px-4 py-2 bg-blue-500 text-white rounded">
          Submit
        </button>
      </div>
    </div>
  </div>
)}


      {/* Welcome Banners Table */}

      <div>
  <h2 className="text-xl font-bold">Welcome Banners</h2>
  {welcomeBanners.length === 0 ? (
    <p className="text-red-500">There are no welcome banners present.</p> // Message when there are no welcome banners
  ) : (
    <Table 
      data={welcomeBanners}
      columns={columns}
    />
  )}
</div>

{/* Offer Banners Table */}
<div className="mt-8">
        <h2 className="text-xl font-bold">Offer Banners</h2>
        {offerBanners.length === 0 ? (
          <p className="text-red-500">There are no offer banners present.</p>
        ) : (
          <Table 
            data={offerBanners}
            columns={columns}
          />
        )}
      </div>

{/* Product Banners Table */}
<div className="mt-8">
        <h2 className="text-xl font-bold">Product Banners</h2>
        {collectionBanners.length === 0 ? (
          <p className="text-red-500">There are no product banners present.</p>
        ) : (
          <Table 
            data={collectionBanners}
            columns={columns}
          />
        )}
      </div>

    </div>
  );
};

export default Banner;
