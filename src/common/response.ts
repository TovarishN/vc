export type LoginSuccess = "success" | "error";

export type LoginResult = {
    result: LoginSuccess;
    message?: string;
};
