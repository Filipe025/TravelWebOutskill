import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { mockHotels, mockFlights, mockPackages } from '../services/mockData';
import { Hotel, Flight, Package } from '../types';
import HotelCard from '../components/cards/HotelCard';
import FlightCard from '../components/cards/FlightCard';
import PackageCard from '../components/cards/PackageCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

type SearchType = 'hotels' | 'flights' | 'packages';

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [searchType, setSearchType] = useState<SearchType>('hotels');
  const [showFilters, setShowFilters] = useState(false);
  
  const [filters, setFilters] = useState({
    priceRange: [0, 1000] as [number, number],
    starRating: 0,
    sortBy: 'price'
  });

  const destination = searchParams.get('destination') || '';
  const checkIn = searchParams.get('checkIn') || '';
  const checkOut = searchParams.get('checkOut') || '';
  const guests = parseInt(searchParams.get('guests') || '2');

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [searchParams]);

  const handleBookHotel = (hotel: Hotel) => {
    navigate('/booking', { 
      state: { 
        type: 'hotel', 
        item: hotel, 
        searchParams: {
          destination,
          checkIn,
          checkOut,
          guests
        }
      }
    });
  };

  const handleBookFlight = (flight: Flight) => {
    navigate('/booking', { 
      state: { 
        type: 'flight', 
        item: flight, 
        searchParams: {
          destination,
          checkIn,
          checkOut,
          guests
        }
      }
    });
  };

  const handleBookPackage = (pkg: Package) => {
    navigate('/booking', { 
      state: { 
        type: 'package', 
        item: pkg, 
        searchParams: {
          destination,
          checkIn,
          checkOut,
          guests
        }
      }
    });
  };

  const filteredHotels = mockHotels.filter(hotel => 
    hotel.pricePerNight >= filters.priceRange[0] && 
    hotel.pricePerNight <= filters.priceRange[1] &&
    (filters.starRating === 0 || hotel.rating >= filters.starRating)
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-muted-foreground">Searching for the best options...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Results Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Search Results</h1>
          <p className="text-muted-foreground">
            {destination && `Destination: ${destination}`}
            {checkIn && ` • Check-in: ${new Date(checkIn).toLocaleDateString()}`}
            {checkOut && ` • Check-out: ${new Date(checkOut).toLocaleDateString()}`}
            {` • ${guests} guest${guests > 1 ? 's' : ''}`}
          </p>
        </div>

        {/* Search Type Tabs */}
        <div className="flex space-x-1 bg-card p-1 rounded-lg shadow-sm mb-6 border border-border">
          <button
            onClick={() => setSearchType('hotels')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              searchType === 'hotels'
                ? 'bg-sky-500 text-white'
                : 'text-foreground hover:text-sky-600'
            }`}
          >
            Hotels ({filteredHotels.length})
          </button>
          <button
            onClick={() => setSearchType('flights')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              searchType === 'flights'
                ? 'bg-sky-500 text-white'
                : 'text-foreground hover:text-sky-600'
            }`}
          >
            Flights ({mockFlights.length})
          </button>
          <button
            onClick={() => setSearchType('packages')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              searchType === 'packages'
                ? 'bg-sky-500 text-white'
                : 'text-foreground hover:text-sky-600'
            }`}
          >
            Packages ({mockPackages.length})
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64">
            <div className="bg-card rounded-lg shadow-sm p-6 border border-border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Filters</h3>
                <SlidersHorizontal className="w-5 h-5 text-muted-foreground" />
              </div>
              
              {searchType === 'hotels' && (
                <>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Price Range (per night)
                    </label>
                    <div className="space-y-2">
                      <Input
                        type="range"
                        min="0"
                        max="1000"
                        value={filters.priceRange[1]}
                        onChange={(e) => setFilters(prev => ({
                          ...prev,
                          priceRange: [0, parseInt(e.target.value)]
                        }))}
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>$0</span>
                        <span>${filters.priceRange[1]}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Star Rating
                    </label>
                    <select
                      value={filters.starRating}
                      onChange={(e) => setFilters(prev => ({
                        ...prev,
                        starRating: parseFloat(e.target.value)
                      }))}
                      className="w-full rounded-md border-border bg-background text-foreground shadow-sm focus:border-sky-500 focus:ring-sky-500"
                    >
                      <option value={0}>Any Rating</option>
                      <option value={3}>3+ Stars</option>
                      <option value={4}>4+ Stars</option>
                      <option value={4.5}>4.5+ Stars</option>
                    </select>
                  </div>
                </>
              )}
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Sort By
                </label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    sortBy: e.target.value
                  }))}
                  className="w-full rounded-md border-border bg-background text-foreground shadow-sm focus:border-sky-500 focus:ring-sky-500"
                >
                  <option value="price">Price (Low to High)</option>
                  <option value="rating">Rating (High to Low)</option>
                  <option value="name">Name (A to Z)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {searchType === 'hotels' && filteredHotels.map(hotel => (
                <HotelCard
                  key={hotel.id}
                  hotel={hotel}
                  onBook={handleBookHotel}
                />
              ))}
              
              {searchType === 'flights' && mockFlights.map(flight => (
                <FlightCard
                  key={flight.id}
                  flight={flight}
                  onBook={handleBookFlight}
                />
              ))}
              
              {searchType === 'packages' && mockPackages.map(pkg => (
                <PackageCard
                  key={pkg.id}
                  package={pkg}
                  onBook={handleBookPackage}
                />
              ))}
            </div>
            
            {((searchType === 'hotels' && filteredHotels.length === 0) || 
              (searchType === 'flights' && mockFlights.length === 0) || 
              (searchType === 'packages' && mockPackages.length === 0)) && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No results found. Try adjusting your filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}