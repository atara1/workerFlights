export type WorkerInfo = {
    id: number,
    name: string
};

export interface WorkerInformation {
    num: string;
    from: string;
    to: string;
    from_date: string;
    to_date: string;
    plane: string;
    duration: number;
    from_gate: number;
    to_gate: number;
}

export interface FlightInformation {
    duration: number;
    num: string;
    from_gate: number;
    to_gate: number;
}

export interface WorkerColumns {
    headerName: string;
    field: string;
}
