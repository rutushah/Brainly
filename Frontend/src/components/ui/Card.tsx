import axios from "axios";
import { DeleteIcon } from "../../icons/DeleteIcon";
import { DocumentTexIcon } from "../../icons/DocumentTextIcon";
import { ShareIcon } from "../../icons/ShareIcon";
import { BACKEND_URL } from "../../config";
import { Button } from "./Button";
import { useEffect } from "react";

interface CardProps {
    title?: string;
    link?: string;
    type?: "twitter" | "youtube" | "article";
    contentId?: string;
    refresh?: () => void;
}


export function Card({title, link, type, contentId,refresh}: CardProps){


    useEffect(() => {
        if (type === "twitter") {
            // @ts-ignore
            if (window.twttr) window.twttr.widgets.load();
        }
    }, [type]);

    //delete user content function

    async function deleteUserContent(){
       try{
            await axios.delete(`${BACKEND_URL}/api/v1/content`,{
                data:{
                    contentId
                },
                headers:{
                    "token":localStorage.getItem('token')
                }
            });
            alert("Content deleted successfully!!");
            refresh();
       }catch(error){
            alert("Failed to delete content. Please try again.");
       }
     
    }



    return <div>
        <div className="p-8 bg-white rounded-md shadow-md outline-slate-200 max-w-96 border-gray-200 border min-h-48">
            <div className="flex justify-between">
                <div className="flex gap-3 items-center"> 
                    <DocumentTexIcon size="md"/>
                    {title}
                </div>
                <div className="flex gap-3 items-center">
                    <div className="pr-2 text-gray-500">
                    <a href={link} target="_blank" rel="noopener noreferrer">
                        <ShareIcon size="md"/>
                    </a>
                    </div>
                    <div className="pr-2 text-gray-500" onClick={deleteUserContent}>
                       <DeleteIcon size="md" />
                       
                    </div>
                </div>
            </div>
            {/* emmbedding of youtube video */}
            {/* <div className="pt-4">
                <iframe className="w-full" src="https://www.youtube.com/embed/19WOD84JFxA?si=kpvol45iQ9d1s4HF" title="YouTube video player" 
                frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            </div> */}
         
            {/* Embedding of twitter link */}
            
            {/* Embedding of twitter link */}
                
            <div className="pt-4">
                {type === "youtube" && <iframe className="w-full" src={`https://www.youtube.com/embed/${link?.split("v=")[1]?.split("&")[0]}`} title="YouTube video player" 
                frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}

                {type === "twitter" && <blockquote className="twitter-tweet">
                    <a href={link.replace("x.com", "twitter.com")}></a>
                </blockquote> } 

                {type === "article" && (
                <a href={link} target="_blank" rel="noopener noreferrer" 
                    className="block p-4 rounded-md border border-gray-200 hover:bg-gray-100 transition-colors">
                    <p className="text-sm text-gray-500 mb-1">📄 Article</p>
                    <p className="text-sm text-blue-500 underline break-all">{link}</p>
                    <p className="text-xs text-gray-400 mt-2">Click to open article →</p>
                </a>
            )}


                {/* <blockquote className="twitter-tweet">
                    <a href="https://twitter.com/ThePSF/status/2056306362494169562"></a>
                </blockquote> */}
            </div>
        
           
      
     
        
      </div>
    </div> 
}