import { LogoIcon } from "../../icons/Logo";
import { TwitterIcon } from "../../icons/TwitterIcon";
import { YoutubeIcon } from "../../icons/YoutubeIcon";
import { SideBarItem } from "./SideBarItem";

export function Sidebar(){
    return <div className="h-screen border-r border-slate-100
         w-72 position-fixed absolute left-0 top-0 bg-slate-700 text-slate-200">
            <div className="flex gap-2 pt-4 pl-2">
                    <LogoIcon size="md"/> 
                    <h1>Brainly</h1>
            </div>
            
            <div className="pt-4 pl-6  ">
                <SideBarItem text="Twitter" icon={<TwitterIcon size="md"/>}></SideBarItem>
                <SideBarItem text="Youtube" icon={<YoutubeIcon size="md"/>}></SideBarItem>

            </div>
    </div>
}