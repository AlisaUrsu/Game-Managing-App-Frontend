import React, { useState } from 'react';

interface FilterModalProps {
  show: boolean;
  onClose: () => void;
  onApplyFilters: (filters: any) => void;
}

const genres = ['Action', 'Adventure', 'RPG', 'Strategy', 'Sports'];
const platforms = ['PC', 'Xbox', 'PlayStation', 'Nintendo Switch'];
const developers = ['Developer1', 'Developer2', 'Developer3'];
const publishers = ['Publisher1', 'Publisher2', 'Publisher3'];

const FilterModal: React.FC<FilterModalProps> = ({ show, onClose, onApplyFilters }) => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [releaseYearRange, setReleaseYearRange] = useState<[number, number]>([2000, 2024]);
  const [ratingRange, setRatingRange] = useState<[number, number]>([0, 10]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [developer, setDeveloper] = useState<string>('');
  const [publisher, setPublisher] = useState<string>('');

  const toggleGenre = (genre: string) => {
    setSelectedGenres(prev =>
      prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
    );
  };

  const togglePlatform = (platform: string) => {
    setSelectedPlatforms(prev =>
      prev.includes(platform) ? prev.filter(p => p !== platform) : [...prev, platform]
    );
  };

  const handleApplyFilters = () => {
    onApplyFilters({
      genres: selectedGenres,
      releaseYearRange,
      ratingRange,
      platforms: selectedPlatforms,
      developer,
      publisher
    });
    onClose();
  };

  if (!show) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Filters</h2>
        
        <div>
          <h3>Genres</h3>
          {genres.map(genre => (
            <label key={genre}>
              <input
                type="checkbox"
                checked={selectedGenres.includes(genre)}
                onChange={() => toggleGenre(genre)}
              />
              {genre}
            </label>
          ))}
        </div>
        
        <div>
          <h3>Release Year</h3>
          <input
            type="number"
            value={releaseYearRange[0]}
            onChange={(e) => setReleaseYearRange([+e.target.value, releaseYearRange[1]])}
          />
          -
          <input
            type="number"
            value={releaseYearRange[1]}
            onChange={(e) => setReleaseYearRange([releaseYearRange[0], +e.target.value])}
          />
        </div>
        
        <div>
          <h3>Rating</h3>
          <input
            type="number"
            value={ratingRange[0]}
            onChange={(e) => setRatingRange([+e.target.value, ratingRange[1]])}
          />
          -
          <input
            type="number"
            value={ratingRange[1]}
            onChange={(e) => setRatingRange([ratingRange[0], +e.target.value])}
          />
        </div>
        
        <div>
          <h3>Platforms</h3>
          {platforms.map(platform => (
            <label key={platform}>
              <input
                type="checkbox"
                checked={selectedPlatforms.includes(platform)}
                onChange={() => togglePlatform(platform)}
              />
              {platform}
            </label>
          ))}
        </div>
        
        <div>
          <h3>Developer</h3>
          <select value={developer} onChange={(e) => setDeveloper(e.target.value)}>
            <option value="">Select Developer</option>
            {developers.map(dev => (
              <option key={dev} value={dev}>{dev}</option>
            ))}
          </select>
        </div>
        
        <div>
          <h3>Publisher</h3>
          <select value={publisher} onChange={(e) => setPublisher(e.target.value)}>
            <option value="">Select Publisher</option>
            {publishers.map(pub => (
              <option key={pub} value={pub}>{pub}</option>
            ))}
          </select>
        </div>

        <button onClick={handleApplyFilters}>Apply Filters</button>
      </div>
    </div>
  );
};

export default FilterModal;
