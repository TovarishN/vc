export type Result = "success" | "error";

export type RequestResult = {
    result: Result;
    message?: string;
};
