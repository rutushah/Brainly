import {Button} from '../components/ui/Button';
import {Input} from '../components/ui/Input';
import { useNavigate } from 'react-router-dom';



export function Login(){
    const navigate = useNavigate();
    return <div className="h-screen w-screen bg-gray-100 flex justify-center items-center">
        <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-10">
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">Login</h1>
            <div className="flex flex-col gap-4 mb-6"> 
                <Input 
                    placeholder="Enter Username"
                    className = "w-full py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 tex-sm" />
                <Input 
                    placeholder="Enter Password"
                    className = "w-full py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 tex-sm" />
            </div>
            
            {/* <div className="flex justify-center items-center">  */}
                <Button 
                    variant="primary" 
                    text="Login"
                    fullWidth={true}
                    className = "py-3 rounded-lg  transition-colors" />
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