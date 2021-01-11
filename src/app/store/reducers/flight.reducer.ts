import { FlightInformation } from './../../../assets/workersTypes';
import * as flights from '../actions/flights.action';
import { createReducer, on, Action } from '@ngrx/store';


const defaultState: FlightInformation = null;

const reducer = createReducer(
    defaultState,
    on(flights.UpdateFlightInformation, (state: FlightInformation, newData: FlightInformation) => {
        return newData;
    })
);

export function flightReducer(state: FlightInformation | undefined, action: Action): FlightInformation {
    return reducer(state, action);
}

