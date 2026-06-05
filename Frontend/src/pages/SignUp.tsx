import { useRef } from 'react';
import {Button} from '../components/ui/Button';
import {Input} from '../components/ui/Input';
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../config';
import axios from 'axios';



export function SignUp(){

    //to get the username and password we will use refs
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    

    async function signup(){
        try{
                const username = usernameRef.current?.value;
                const password = passwordRef.current?.value;
                await axios.post(`${BACKEND_URL}/api/v1/signup`,{
                    username,
                    password
                })
                alert("Signup successful, please login to continue");
                navigate('/signin');
            }catch(error){
                alert("Signup failed, please try again");
            }
        
    }



    const navigate = useNavigate();
    return <div className="h-screen w-screen bg-gray-100 flex justify-center items-center">
        <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-10">
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">Create Account</h1>
            <p className="text-center text-gray-400 text-sm mb-8">Join us today, it's free!</p>
            <div className="flex flex-col gap-4 mb-6"> 
                <Input 
                    ref = {usernameRef}
                    placeholder="Enter Username"
                    type="text"
                    className = "w-full py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 tex-sm" />
                <Input 
                    ref = {passwordRef}
                    placeholder="Enter Password"
                    type="password"
                    className = "w-full py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 tex-sm" />
            </div>
            
            {/* <div className="flex justify-center items-center">  */}
                <Button 
                    variant="primary" 
                    text="Sign Up"
                    fullWidth={true}
                    className = "py-3 rounded-lg  transition-colors" 
                    onClick={signup}/>
            {/* </div> */}

        {/* footer code */}
            <p className='text-center text-gray-400 text-sm mt-6'>
                Already have an account ? 
                <span 
                    onClick={() => navigate('/signin')}
                    className="text-purple-500 cursor-pointer hover:underline ml-1">Sign In</span>
            </p>
            
        </div>
    </div>
}