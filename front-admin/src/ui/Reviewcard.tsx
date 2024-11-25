import { Review } from "../api/reviewApi";

const ReviewItem = ({ 
  review, 
  onApprove 
}: { 
  review: Review; 
  onApprove: (id: string) => void;
}) => (
  <div className="bg-white rounded-lg shadow-md p-6 mb-4">
    <div className="flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-32 h-32">
        <img
          src={review.productImage || "/api/placeholder/128/128"}
          alt={review.productName}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      
      <div className="flex-1">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold">{review.productName}</h3>
            <p className="text-sm text-gray-600">{review.userName}</p>
            <p className="text-xs text-gray-500">{review.userEmail}</p>
          </div>
          <div className="flex items-center">
            <div className="flex items-center mr-4">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-lg ${
                    i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            {review.status === 'pending' && (
              <button
                onClick={() => onApprove(review.id)}
                className="inline-flex items-center px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Approve
              </button>
            )}
          </div>
        </div>
        
        <p className="text-gray-700 mb-2">{review.reviewContent}</p>
        
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>
            {new Date(review.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs ${
            review.status === 'approved' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
          </span>
        </div>
      </div>
    </div>
  </div>
);

export default ReviewItem;