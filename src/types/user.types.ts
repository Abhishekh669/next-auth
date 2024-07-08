export interface SignUpValidation {
  username: string;
  name: string;
  password: string;
  email: string;
  confirmPassword: string;
}


export interface SignInValidation{
  email : string,
  password : string
}