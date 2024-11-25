// pages/ReviewManagementPage.tsx
import  { useState, useEffect } from 'react';
import ReviewApi, { type Review, type FetchReviewsParams } from '../api/reviewApi';
import ReviewItem from '../ui/Reviewcard';


const ReviewManagementPage = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved'>('all');
  const [sortOrder, setSortOrder] = useState<'recent' | 'old'>('recent');

  const fetchReviews = async () => {
    try {
      setIsLoading(true);
      const params: FetchReviewsParams = {
        sortOrder,
        status: statusFilter === 'all' ? undefined : statusFilter,
        search: searchTerm || undefined,
      };
      // const data = await ReviewApi.fetchReviews(params);
      setReviews([
        {
          "id": "1",
          "userName": "John Doe",
          "userEmail": "john.doe@example.com",
          "reviewContent": "Amazing product, loved it!",
          "rating": 5,
          "productImage": "https://via.placeholder.com/128",
          "productName": "Wireless Headphones",
          "createdAt": "2024-03-20T10:00:00Z",
          "status": "pending"
        },
        {
          "id": "2",
          "userName": "Jane Smith",
          "userEmail": "jane.smith@example.com",
          "reviewContent": "Good quality, but delivery was slow.",
          "rating": 4,
          "productImage": "https://via.placeholder.com/128",
          "productName": "Bluetooth Speaker",
          "createdAt": "2024-03-18T15:30:00Z",
          "status": "approved"
        }
      ]);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [sortOrder, statusFilter, searchTerm]);

  const handleApprove = async (id: string) => {
    try {
      await ReviewApi.approveReview(id);
      fetchReviews();
    } catch (error) {
      console.error('Error approving review:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Review Management</h1>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search by user or product name..."
              className="w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <select
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
          >
            <option value="all">All Reviews</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
          </select>

          <button
            onClick={() => setSortOrder(prev => prev === 'recent' ? 'old' : 'recent')}
            className="inline-flex items-center px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <svg
              className={`w-4 h-4 mr-2 ${sortOrder === 'recent' ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
            Sort by Date
          </button>
        </div>
      </div>

      {reviews.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No reviews found
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <ReviewItem 
              key={review.id} 
              review={review} 
              onApprove={handleApprove}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewManagementPage;