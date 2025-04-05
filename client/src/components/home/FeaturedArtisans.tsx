import React from 'react';

const FeaturedArtisans = () => {
  const artisans = [
    {
      id: 1,
      name: "Maria Rodriguez",
      craft: "Ceramic Artist",
      image: "https://images.unsplash.com/photo-1556760544-74068565f05c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Specializing in hand-painted ceramic tiles and pottery"
    },
    {
      id: 2,
      name: "John Smith",
      craft: "Woodworker",
      image: "https://images.unsplash.com/photo-1558637845-c8b7ead71a3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Creating bespoke furniture and wooden home décor"
    },
    {
      id: 3,
      name: "Sarah Chen",
      craft: "Textile Artist",
      image: "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Hand-woven textiles using traditional techniques"
    }
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Artisans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {artisans.map((artisan) => (
            <div key={artisan.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={artisan.image}
                alt={artisan.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{artisan.name}</h3>
                <p className="text-indigo-600 mb-2">{artisan.craft}</p>
                <p className="text-gray-600">{artisan.description}</p>
                <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedArtisans;