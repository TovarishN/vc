import { IValidator, ValidationResult, Validator } from 'ts.validator.fluent/dist';
import { LoginInfo, RegisterInfo } from './request';

const loginInfoValidatorRules = (vr: IValidator<LoginInfo>): ValidationResult => {
    return vr.Length(x => x.username, 3, 10, "username length must be between 3 and 10")
            .Length(x => x.password, 3, 10, "password length must be between 3 and 10")
        .ToResult();
};

const registerInfoValidatorRules = (vr:IValidator<RegisterInfo>) : ValidationResult => {
    return vr.Length(x => x.username, 3, 10, "username length must be between 3 and 10")
            .Length(x => x.password, 3, 10, "password length must be between 3 and 10")
            .Email(x => x.email, "email is not correct")
            .NotEmpty(x => x.firstname, "firstname must not be empty")
            .NotEmpty(x => x.lastname, "lastname must not be empty")
            .ToResult();
}

export function validateRegisterInfo(body: RegisterInfo)
{
    let result = new Validator(body).Validate(registerInfoValidatorRules);
    if(!result.IsValid)
        throw new Error(result.Errors.map(x => x.Message).join(", "));
}

export function validateLoginInfo(body: LoginInfo)
{
    let result = new Validator(body).Validate(loginInfoValidatorRules);
    if(!result.IsValid)
        throw new Error(result.Errors.map(x => x.Message).join(", "));
}