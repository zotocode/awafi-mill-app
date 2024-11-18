import { useEffect, useState } from 'react';
import { Trash2, Calendar } from 'react-feather';
import LoadingSpinner from '../Spinner/LoadingSpinner';

// Define the interface for the banner object
interface Banner {
  imageUrl: string;
  name: string;
  startDate: string; // You may want to use `Date` if you're working with date objects
  endDate: string;   // Same for this field
  listed: boolean;
}

// Define the interface for the component props
interface BannerCardProps {
  banner: Banner | null; // Change to null initially until the data is fetched
  type: string;
  handleToggleListed: (banner: Banner) => void;
  deleteBanner: (banner: Banner) => void;
}

const BannerCard = ({
  banner,
  type,
  handleToggleListed,
  deleteBanner,
}: BannerCardProps) => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // If no banner data is provided (i.e., still loading), set loading to true
    if (!banner) {
      setLoading(true);
    } else {
      // When banner data is available, set loading to false
      setLoading(false);
    }
  }, [banner]);

  // If loading, show the spinner, otherwise display the banner content
  if (loading || !banner) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-300 relative">
        <div className="absolute inset-0 bg-white bg-opacity-75 flex justify-center items-center z-10">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-200 hover:scale-105 border border-gray-300 relative">
      <div className="relative h-48">
        {/* Display the status label in the top-left corner */}
        <div
          className={`absolute top-2 left-2 px-3 py-1 text-xs font-medium rounded-full ${
            banner.listed ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
          }`}
        >
          {banner.listed ? 'Active' : 'Inactive'}
        </div>
        <img
          src={banner.imageUrl}
          alt={banner.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{banner.name}</h3>
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            <span>Start: {new Date(banner.startDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            <span>End: {new Date(banner.endDate).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="mt-4 flex justify-end space-x-4">
          {/* List/Unlist Buttons */}
          <button
            onClick={() => handleToggleListed(banner)}
            className={`px-4 py-2 rounded-md text-sm font-medium border-2 transition-colors duration-200 
              ${banner.listed ? 'text-gray-900 border-gray-900 hover:bg-gray-900 hover:text-white' : 'text-gray-600 border-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}
          >
            {banner.listed ? 'Unlist' : 'List'}
          </button>

          {/* Delete Button */}
          <button
            onClick={() => deleteBanner(banner)}
            className="px-4 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 border-2 border-transparent hover:border-gray-400 transition-colors duration-200"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

    </div>
  );
};

export default BannerCard;
