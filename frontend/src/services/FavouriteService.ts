const localStorageKey = 'tvbrowser_favourites';

let storedFavouritesJson: string | null;

let favourites: {[showId: number]: boolean};

if (storedFavouritesJson = localStorage.getItem(localStorageKey)) {
    favourites = JSON.parse(storedFavouritesJson);
} else {
    favourites = {};
}

const FavouriteService = {    
    setFavourite: (showId: number, favourite: boolean) => {
        favourites[showId] = favourite;
        localStorage.setItem(localStorageKey, JSON.stringify(favourites));
    },

    getFavourites: () => favourites
}

export default FavouriteService;
