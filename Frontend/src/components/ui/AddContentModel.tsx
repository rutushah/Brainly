import { useState } from "react";
import { CrossIcon } from "../../icons/CrossIcon";
import { Input } from "./Input";
import { Button } from "./Button";

export function AddContentModel({open,onclose}){
    // const [modelOpen, setModelOpen] = useState(false);
    
    return  <div>
            {open && <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 flex justify-center">
                <div className="flex flex-col justify-center">
                    <span className="bg-white opacity-100 p-4 rounded"> 
                        <div className="flex justify-end">
                            <div onClick={onclose} className="cursor-pointer">
                            <CrossIcon size="md"/>
                            </div>
                        </div>
                        <div>
                            <Input placeholder={"Enter Content Title"}/>
                            <Input placeholder={"Enter Link of the content"}/>
                        </div>
                        <div className="flex justify-center">
                            <Button variant ="primary" text="Submit"/>
                        </div>
                        
                    </span>
                </div>
             </div>}
        </div>
   


}