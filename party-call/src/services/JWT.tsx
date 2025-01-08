import { jwtDecode } from "jwt-decode";

interface JwtPayload {
    exp?: number; 
    email?: string;
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

const extractEmail = (token: string) : string | null => {
  try{
    if(!token){
      console.warn("Token is empty or null");
      return null;
    }

    const decoded = jwtDecode<JwtPayload>(token);
    const email = decoded.email || (decoded.sub && decoded.sub.includes("@") ? decoded.sub : null);

    if (!email) {
      console.warn("Email claim not found in token.");
      return null;
    }

    return email;
  }catch(error){
    console.error("Error decoding token:", error);
    return null;
  }
}


export  {isTokenExpired, extractEmail};
