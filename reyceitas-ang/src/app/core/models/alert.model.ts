export interface Alert {
    message: string;
    action: string;
    type: AlertType;
}

export enum AlertType {
    Success = 'success',
    Error = 'error'
}