import { FlightInformation, WorkerInformation } from './../../../assets/workersTypes';
import { createAction, props } from '@ngrx/store';


export const UpdateFlightInformation = createAction(
    '[WorkerInformation] UpdateFlightInformation',
    props<WorkerInformation>()
);
