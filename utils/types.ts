export interface welcomeEmailData {
    email : string, 
    username: string,
}

export interface confirmationEmailData {
    email: string
    username : string,
    recoveryToken : string,
}
