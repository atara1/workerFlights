import { WorkerInformation } from './../../../assets/workersTypes';
import * as flights from '../actions/flights.action';
import { createReducer, on, Action } from '@ngrx/store';


const defaultState: WorkerInformation = null;

const reducer = createReducer(
    defaultState,
    on(flights.UpdateFlightInformation, (state: WorkerInformation, newData: WorkerInformation) => {
        return newData;
    })
);

export function flightReducer(state: WorkerInformation | undefined, action: Action): WorkerInformation {
    return reducer(state, action);
}

