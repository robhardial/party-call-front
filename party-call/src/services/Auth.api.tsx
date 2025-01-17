import axios from "axios";

interface UserToken{
    token : string;
    userDTO :{  
        userId : number;
        email : string;
        name : string;
    }

}




const userLogin = async (email : string, password : string) : Promise<UserToken> => {

    try{
        const response = await axios.post("http://localhost:8080/auth/authenticate",{
            email : email,
            password : password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          },

        );
        console.log(response.data);
        return response.data;

    }catch(error){
        console.error("Error: ", error);
        throw error;
    }
}

const userRegistration = async (firstName : string, lastName : string, email : string, password : string) : Promise<UserToken> =>{
    try{

        const response = await axios.post("http://localhost:8080/auth/register",
            {
                firstName : firstName,
                lastName : lastName,
                email : email,
                password : password,
            },
            {
                headers: {
                  "Content-Type": "application/json",
                },
            },
        );
        return response.data;

    }catch(error){
        console.error("Error: ", error);
        throw error;
    }
}

export {userLogin, userRegistration};