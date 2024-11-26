import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ReviewApi, { type Review, type FetchReviewsParams } from '../api/reviewApi';
import ReviewItem from '../ui/Reviewcard';
import useDebounce from '../hooks/useDebounce'; // Import debounce hook

const ReviewManagementPage = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved'>('all');
  const [sortOrder, setSortOrder] = useState<'recent' | 'old'>('recent');
  const [totalPages, setTotalPages] = useState(1); // Add state for total pages

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10); // Parse the current page from the URL

  const fetchReviews = async () => {
    try {
      setIsLoading(true);
      const params: FetchReviewsParams = {
        sortOrder,
        status: statusFilter === 'all' ? undefined : statusFilter,
        search: debouncedSearchTerm || undefined,
        page,
        limit: 10, // Set a limit for pagination
      };
      const { reviews: fetchedReviews, totalPages: fetchedTotalPages } = await ReviewApi.fetchReviews(params);
      setReviews(fetchedReviews);
      setTotalPages(fetchedTotalPages);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [page, sortOrder, statusFilter, debouncedSearchTerm]);

  const handleStatusChange = async (id: string, status: 'approved' | 'declined') => {
    try {
      const updatedReview = await ReviewApi.statusReview(id, status);
      setReviews((prevReviews) =>
        prevReviews.map((review) =>
          review.id === id ? { ...review, status: updatedReview.status } : review
        )
      );
    } catch (error) {
      console.error(`Error updating review status to ${status}:`, error);
    }
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: String(newPage) });
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
              value={searchTerm} // Controlled component
              placeholder="Search by user or product name..."
              className="w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setSearchTerm(e.target.value)} // Update search term
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
            onClick={() => setSortOrder((prev) => (prev === 'recent' ? 'old' : 'recent'))}
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
        <div className="text-center py-12 text-gray-500">No reviews found</div>
      ) : (
        <div>
          <div className="space-y-4">
            {reviews.map((review) => (
              <ReviewItem
                key={review.id}
                review={review}
                onApprove={(id) => handleStatusChange(id, 'approved')}
                onDecline={(id) => handleStatusChange(id, 'declined')}
              />
            ))}
          </div>
          <div className="mt-6 flex justify-between items-center">
            <button
              className={`px-4 py-2 border rounded-lg ${page <= 1 ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-50'}`}
              onClick={() => handlePageChange(page - 1)}
              disabled={page <= 1}
            >
              Previous
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              className={`px-4 py-2 border rounded-lg ${page >= totalPages ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-50'
                }`}
              onClick={() => handlePageChange(page + 1)}
              disabled={page >= totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewManagementPage;
