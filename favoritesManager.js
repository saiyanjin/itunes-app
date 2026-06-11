let favorites = [];

let listeners = [];

export const favoritesManager = {
  getFavorites() {
    return favorites;
  },

  addFavorite(track) {
    const exists = favorites.some(fav => fav.trackId === track.trackId);
    if (!exists) {
      favorites.push({ ...track, rating: 0 });
      this.notifyListeners();
    }
  },

  updateRating(trackId, rating) {
    favorites = favorites.map(fav => 
      fav.trackId === trackId ? { ...fav, rating: rating } : fav
    );
    this.notifyListeners();
  },

  subscribe(listener) {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  },

  notifyListeners() {
    listeners.forEach(listener => listener());
  }
};