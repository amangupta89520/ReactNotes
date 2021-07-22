import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../context/user";
import { signInWithGoogle } from "../services/auth";

const Login = () => {

    const [ , setUser ] = useContext(UserContext).user;
    const history = useHistory();

    const signInBtnClick = async () => {
        let userBySignIn = await signInWithGoogle();
        if(userBySignIn) {
            setUser(userBySignIn);
            console.log(userBySignIn);
            // history.push("/");
        }

    }

    return (
        <div>
            <button onClick={signInBtnClick}>Sign In</button>
        </div>
    );
}
 
export default Login;