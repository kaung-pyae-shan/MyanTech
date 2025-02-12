import { useState } from "react";

export default function SearchForm({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Only call onSearch if there's a non-empty query
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center w-[200px] gap-4 p-4">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {/* <button
        type="submit"
        className="px-4 py-2 text-white transition bg-blue-500 rounded-md hover:bg-blue-600"
      >
        Search
      </button> */}
    </form>
  );
}
