import { useEffect, useState } from "react";
import { Card } from "../components/ui/Card";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useParams } from "react-router-dom";

export function ShareBrain(){

    const [content,setContent] = useState([]);
    const {shareLink} = useParams();
    const [user, setUser] = useState<{name: string, username: string} | null>(null);


    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/brain/${shareLink}`)
        .then((response) => {
            setContent(response.data.content);
            setUser(response.data.user);

        })
    },[])
    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
                {user?.username}'s Brain
            </h1>
            <p className="text-gray-400 mb-8">@{user?.username}</p>
            <div className="flex gap-4 flex-wrap">
                {content.map(({type, link, title}) => (
                    <Card
                        key={link}
                        type={type}
                        link={link}
                        title={title}
                    />
                ))}
            </div>
        </div>
    )
}