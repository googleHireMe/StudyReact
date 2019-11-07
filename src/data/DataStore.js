import { createStore, applyMiddleware } from "redux";
import { ShopReducer } from "./reducers/ShopReducer";
import { CartReducer } from "./reducers/CartReducer";
import { CommonReducer } from "./reducers/CommonReducer";
import { asyncActions } from "./remote/AsyncMiddleware";

export const SportsStoreDataStore = createStore(CommonReducer(ShopReducer, CartReducer), applyMiddleware(asyncActions));