// pages/index.tsx
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { PROPERTYLISTINGSAMPLE, FILTER_OPTIONS, HERO_BACKGROUND } from '../constants';
import { PropertyProps } from '../interfaces';
import Pill from '../components/common/Pill';
import PropertyCard from '../components/common/PropertyCard';

const HomePage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('');
  const [filteredProperties, setFilteredProperties] = useState<PropertyProps[]>(PROPERTYLISTINGSAMPLE);

  const handleFilterClick = (filter: string) => {
    if (activeFilter === filter) {
      // If clicking the same filter, reset to show all properties
      setActiveFilter('');
      setFilteredProperties(PROPERTYLISTINGSAMPLE);
    } else {
      // Apply new filter
      setActiveFilter(filter);
      const filtered = PROPERTYLISTINGSAMPLE.filter(property =>
        property.category.some(cat => cat.toLowerCase().includes(filter.toLowerCase()))
      );
      setFilteredProperties(filtered);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section 
        className="relative h-96 md:h-[500px] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${HERO_BACKGROUND})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Find your favorite place here!
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl">
              The best prices for over 2 million properties worldwide.
            </p>
            
            {/* Hero Search Bar */}
            <div className="max-w-md mx-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Where do you want to go?"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Filter by Category</h2>
          <div className="flex flex-wrap gap-3 overflow-x-auto pb-2">
            {FILTER_OPTIONS.map((filter) => (
              <Pill
                key={filter}
                label={filter}
                isActive={activeFilter === filter}
                onClick={() => handleFilterClick(filter)}
              />
            ))}
          </div>
          
          {/* Results Counter */}
          <div className="mt-6 text-gray-600">
            <p>
              Showing {filteredProperties.length} of {PROPERTYLISTINGSAMPLE.length} properties
              {activeFilter && (
                <span className="ml-2 text-blue-600 font-medium">
                  filtered by "{activeFilter}"
                </span>
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Property Listings Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProperties.map((property, index) => (
                <PropertyCard key={`${property.name}-${index}`} property={property} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No properties found
                </h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your filters or search criteria to find more properties.
                </p>
                <button
                  onClick={() => {
                    setActiveFilter('');
                    setFilteredProperties(PROPERTYLISTINGSAMPLE);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Properties
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked selection of premium properties with exceptional ratings and unique features.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROPERTYLISTINGSAMPLE
              .filter(property => property.rating >= 4.9)
              .slice(0, 6)
              .map((property, index) => (
                <PropertyCard key={`featured-${property.name}-${index}`} property={property} />
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
