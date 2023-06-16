interface RegistrationCredentials {
  userName: string;
  email: string;
  password: string;
  avatar: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}
interface User {
  userName: string;
  email: string;
  avatar: string;
}

type Token = string;
