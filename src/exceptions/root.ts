class HttpException extends Error {
    message: string;
    errorCode: any;
    statusCode: number;
    errors: any;

    constructor(message: string, errorCode: any, statusCode:number, error:any) {
        super(message);
        this.errorCode = errorCode;
        this.statusCode = statusCode;
        this.errors = this.errors;
    }
}

export enum ErrorCodes {
    USER_NOT_FOUND = 1001, 
    USER_ALREADY_EXIST = 1002,
    INCORRECT_PASSWORD = 1003
}