import { jwtDecode } from "jwt-decode";

interface JwtPayload {
    exp?: number; 
    [key: string]: any; 
}

const isTokenExpired = (token: string): boolean => {
    try {
      const { exp } = jwtDecode<JwtPayload>(token);
      if (!exp) return true; 
      const now = Math.floor(Date.now() / 1000);
      return exp < now; // Token expired
    } catch (e) {
      return true; 
    }
};


export  {isTokenExpired};
