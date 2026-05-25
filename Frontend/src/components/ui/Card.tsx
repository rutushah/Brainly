import { DeleteIcon } from "../../icons/DeleteIcon";
import { DocumentTexIcon } from "../../icons/DocumentTextIcon";
import { ShareIcon } from "../../icons/ShareIcon";

interface CardProps {
    title?: string;
    link?: string;
    type?: "twitter" | "youtube" | "article";
}


export function Card({title, link, type}: CardProps){
    return <div>
        <div className="p-8 bg-white rounded-md shadow-md outline-slate-200 max-w-96 border-gray-200 border min-h-48">
            <div className="flex justify-between">
                <div className="flex gap-3 items-center"> 
                    <DocumentTexIcon size="md"/>
                    {title}
                </div>
                <div className="flex gap-3 items-center">
                    <div className="pr-2 text-gray-500">
                        <a href={link} target="_blank" />
                        <ShareIcon size="md"/>
                    </div>
                    <div className="pr-2 text-gray-500">
                        <DeleteIcon size="md"/>
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
                {type === "youtube" && <iframe className="w-full" src={link.replace("watch","embed").replace("?v=","/")} title="YouTube video player" 
                frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}

                {type === "twitter" && <blockquote className="twitter-tweet">
                    <a href={link}></a>
                </blockquote> }


                {/* <blockquote className="twitter-tweet">
                    <a href="https://twitter.com/ThePSF/status/2056306362494169562"></a>
                </blockquote> */}
            </div>
        
           
      
     

      </div>
    </div> 
}