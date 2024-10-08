export class HttpException extends Error {
    message: string;
    errorCode: any;
    statusCode: number;
    errors: ErrorCode;

    constructor(message: string, errorCode: ErrorCode, statusCode:number, error:any) {
        super(message);
        this.message = message;
        this.errorCode = errorCode;
        this.statusCode = statusCode;
        this.errors = error;
    }
}

export enum ErrorCode {
    USER_NOT_FOUND = 1001, 
    USER_ALREADY_EXIST = 1002,
    INCORRECT_PASSWORD = 1003, 
    UNPORCCESSABLEENTITY = 2001,
    INTERNALEXCEPTION = 3001, 
    UNAUTHORIZED = 4001,
    SOME_NOT_FOUND =  5001, 
}