import { useRef, useState } from "react";
import { CrossIcon } from "../../icons/CrossIcon";
import { Input } from "./Input";
import { Button } from "./Button";
import { Select } from "./Select";
import { BACKEND_URL } from "../../config";
import axios from "axios";

enum ContentType{
    Twitter = "twitter",
    Youtube = "youtube",
    Article = "article",
    NoTypeSelected = "select"
}

export function AddContentModel({open,onclose}){
    // const [modelOpen, setModelOpen] = useState(false);
    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const[type, setType] = useState(ContentType.NoTypeSelected);    

    async function addContent(){
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;

        await axios.post(`${BACKEND_URL}/api/v1/content`,{
            title,
            link,
            type
        },{
            headers:{
                "token":localStorage.getItem('token')
            }
        })
            alert("Content Added successfully!!");
            // onclose();
            onclose();
            

            //debug line to check token in local storage
            // const token =  localStorage.getItem('token');
            // console.log("token:", token);

    }

    return (
        <div>
            {open && (
                <div>
                    {/* Overlay */}
                    <div className="w-screen h-screen bg-black/50 fixed top-0 left-0 z-10" />
    
                    {/* Modal */}
                    <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center z-20">
                        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
                            
                            {/* Header */}
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-gray-800">Add Content</h2>
                                <div onClick={onclose} className="cursor-pointer text-gray-400 hover:text-gray-600">
                                    <CrossIcon size="md" />
                                </div>
                            </div>
    
                            {/* Inputs */}
                            <div className="flex flex-col gap-4 mb-6">
                                <Input
                                    ref={titleRef}
                                    placeholder="Enter Content Title"
                                    type="text"
                                    className="w-full"
                                />
                                <Input
                                    ref={linkRef}
                                    placeholder="Enter Link of the content"
                                    type="text"
                                    className="w-full"
                                />
                                <Select
                                    value={type}
                                    onChange={(value) => setType(value as ContentType)}
                                    options={[
                                        { label: "Select", value: ContentType.NoTypeSelected },
                                        { label: "Twitter", value: ContentType.Twitter },
                                        { label: "Youtube", value: ContentType.Youtube },
                                        { label: "Article", value: ContentType.Article },
                                    ]}
                                />
                            </div>
    
                            {/* Button */}
                            <Button
                                onClick={addContent}
                                variant="primary"
                                text="Submit"
                                fullWidth={true}
                                className="py-3 rounded-lg transition-colors"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}