import { Search, X } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  isSearching?: boolean;
  title:string
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  searchTerm,
  setSearchTerm,
  isSearching = false ,
  title
}) => {
  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className="relative w-full max-w-xl">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="w-4 h-4 text-gray-500" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 pl-10 pr-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-300 focus:border-blue-500 focus:outline-none"
          placeholder={title}
        />
        {searchTerm && (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 flex items-center pr-3 hover:text-gray-600"
            title="Clear search"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        )}
      </div>
      {isSearching && (
        <div className="absolute mt-1 text-sm text-gray-500">
          Searching...
        </div>
      )}
    </div>
  );
};

export default SearchBar;
