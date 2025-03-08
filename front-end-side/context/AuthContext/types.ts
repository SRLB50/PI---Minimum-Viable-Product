export interface AuthContextType {
  isAuthenticated: boolean
  login: (token: string, expire:string, empresa:string, email:string, nome:string, userKey:string) => void
  logout: () => void
}