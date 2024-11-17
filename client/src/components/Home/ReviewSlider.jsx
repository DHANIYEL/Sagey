import React from 'react';


function ReviewSlider() {
  const reviews = [
    {
      name: 'Sarah M.',
      message: "I'm blown away by the quality and style of the clothes I received from ShopZoo. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
      rating: 5
    },
    {
      name: 'Alex K.',
      message: "Finding clothes that align with my personal style used to be a challenge until I discovered ShopZoo. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.",
      rating: 5
    },
    {
      name: 'James L.',
      message: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon ShopZoo. The selection of clothes is not only diverse but also on-point with the latest trends.",
      rating: 5
    }
  ];

  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <Header />
      <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review, index) => (
          <Review key={index} review={review} />
        ))}
      </div>
    </div>
  );
}

export default ReviewSlider;


function Header() {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
        Our Happy Customers
      </h2>
    </div>
  );
}


function Review({ review }) {
  return (
    <div className="bg-gray-50 overflow-hidden shadow rounded-lg">
      <div className="px-6 py-5 sm:px-8">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <img
              className="inline-block h-10 w-10 rounded-full"
              src={`https://ui-avatars.com/api/?name=${review.name}&background=0D8ABC&color=fff`}
              alt={review.name}
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-gray-900">{review.name}</p>
            <p className="text-sm text-gray-500">{review.message}</p>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center">
            {[...Array(review.rating)].map((_, i) => (
              <svg
                key={i}
                className="text-yellow-400 h-5 w-5 flex-shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
