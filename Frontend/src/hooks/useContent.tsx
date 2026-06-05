import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

interface Content {
    type: "twitter" | "youtube" | "article";
    link: string;
    title: string;
    _id: string;
}

export function useContent(){
    const [content, setContent] = useState<Content[]>([]);

    function refresh(){
        axios.get(`${BACKEND_URL}/api/v1/content`,{
            headers:{
                "token":localStorage.getItem('token')
            }
        })
        .then((response) => {
                setContent(response.data.content);
        })
    }

    useEffect(() => {
        refresh();
        // let interval =  setInterval(()=>{
        //     refresh();
        // }, 10 * 1000)

        // return() => {
        //     clearInterval(interval);
        // }

    }, [])
    return {content,refresh};
}