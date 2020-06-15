export interface InjectablePasswordService {
    validatePassword(
        password: string,
        hashedPassword: string
    ): Promise<boolean>;
    hashPassword(password: string): Promise<string>;
}
