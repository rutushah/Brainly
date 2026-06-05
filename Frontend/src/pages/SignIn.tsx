import { use, useRef } from 'react';
import {Button} from '../components/ui/Button';
import {Input} from '../components/ui/Input';
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../config';
import axios from 'axios';



export function Login(){
    const navigate = useNavigate();

    const usernameRef =  useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    
    async function userLogin(){
        try{
            const username = usernameRef.current?.value;
            const password = passwordRef.current?.value;
            const response = await axios.post(`${BACKEND_URL}/api/v1/signin`,{
                username,
                password
            })

            //storing jwt token in local storage
            const jwt = response.data.token;
            localStorage.setItem('token', jwt);
            alert("Login successful");
            navigate('/dashboard');
        }catch(error){
                alert("Login failed, please try again");
        }
    }

    return <div className="h-screen w-screen bg-gray-100 flex justify-center items-center">
        <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-10">
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">Login</h1>
            <div className="flex flex-col gap-4 mb-6"> 
                <Input 
                    ref = {usernameRef}
                    type="text"
                    placeholder="Enter Username"
                    className = "w-full py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 tex-sm" />
                <Input 
                    ref = {passwordRef}
                    type="password"
                    placeholder="Enter Password"
                    className = "w-full py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 tex-sm" />
            </div>
            
            {/* <div className="flex justify-center items-center">  */}
                <Button 
                    variant="primary" 
                    text="Login"
                    fullWidth={true}
                    className = "py-3 rounded-lg  transition-colors"
                    onClick={userLogin} />
            {/* </div> */}

              {/* footer code */}
              <p className='text-center text-gray-400 text-sm mt-6'>
                Dont have an account ? 
                <span 
                    onClick={() => navigate('/signup')}
                    className="text-purple-500 cursor-pointer hover:underline ml-1">Create Account</span>
            </p>
            
        </div>
    </div>
}