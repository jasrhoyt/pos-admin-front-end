


export const validate_password = (password?: string, verifiedPassword?: string) => {
    return password === verifiedPassword;
}

export const toNullIfEmpty = (value: string) => (value === "" ? null : value);