import { ThunkAction } from "redux-thunk";
import { State }       from "../../redux";
import { Action }      from "redux";

export type StandardThunk = ThunkAction<void, State, null, Action>
