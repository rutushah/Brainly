import type { ReactElement } from "react";

export function SideBarItem ({text, icon}:{
    text: string;
    icon: ReactElement;
}){
    return <div className="flex cursor-pointer hover:bg-blue-50 rounded max-w-48 hover:bg-slate-800 hover:text-white"> 
    <div className="p-2">
        {icon}
    </div>
    <div className="p-2 ">
        {text}
    </div>
    </div>
}

