import { SET_FAVOURITE } from "../constants/index";
import { FavouritesState } from "../types/index";
import { SetFavouriteAction } from "../actions/index";
import FavouriteService from "../services/FavouriteService";

const DEFAULT_STATE: FavouritesState = FavouriteService.getFavourites();

export default function favourites(
    state: FavouritesState = DEFAULT_STATE,
    action: SetFavouriteAction
) {
    if(action.type === SET_FAVOURITE) {
        return Object.assign({}, action.favourites);
    }

    return state;
}
