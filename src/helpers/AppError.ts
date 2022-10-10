export class AppError extends Error {
    private _code: number;
    private _crashDate: Date;
    private _log: boolean;

    constructor(log: boolean, message: string, code?: number) {
        super(message);
        this._code = code || 500;
        this._crashDate = new Date();
        this._log = log;
    }

    get code() {
        return this._code;
    }
    get log() {
        return this._log;
    }

}