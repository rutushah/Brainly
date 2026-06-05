
import '../App.css'
import {Button} from '../components/ui/Button';
import { PlusIcon } from '../icons/Plus';
import { ShareIcon } from '../icons/ShareIcon';
import { Card} from '../components/ui/Card';
import { AddContentModel } from '../components/ui/AddContentModel';
import { useEffect, useState } from 'react';
import { Sidebar } from '../components/ui/SideBar';
import { useNavigate } from 'react-router-dom';
import { LogoutIcon } from '../icons/LogoutIcon';
import { useContent } from '../hooks/useContent';
import axios from 'axios';
import { BACKEND_URL } from '../config';

 
function Dashboard() {
  const [modelOpen, setModelOpen] = useState(false);
  const navigate = useNavigate();
  const {content,refresh} = useContent();
  const [copied, setCopied] = useState(false);

  //getting cards from backend


  function logout(){
    localStorage.removeItem('token');
    navigate('/signin');
  }

  async function shareBrain(){
      const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`,{
        share:true
      },
      {
        headers:{
            "token":localStorage.getItem('token')
        }
      });

      const shareURL = `http://localhost:5173/share/${response.data.shareLink}`;
      await navigator.clipboard.writeText(shareURL);
      
      setCopied(true);
      setTimeout(()=> setCopied(false), 2000);

  }

  return (
    <div>
      <Sidebar></Sidebar>
      <div className='p-18 ml-72 min-h-screen bg-slate-50'>
          <AddContentModel open = {modelOpen} onclose={() => {
            setModelOpen(false)
            refresh();
          }}/>
      <div className='flex gap-4 flex-wrap'>
      {/* {JSON.stringify(contents)} */}
        {content.map(({type, link, title, _id}) => (
          <Card 
            type={type}
            link={link} 
            title={title}
            contentId={_id}
            refresh={refresh}
          />
        ))}
    

      </div>
    
      <div className="flex items-center gap-4 absolute top-4 right-6">
      <Button onClick={() => setModelOpen(true)} variant="primary" text="Add Content" size='md' startIcon={<PlusIcon size='sm'/>}/>
      
      <Button 
        variant="secondary" 
        text="Share Brain"
        size='md' 
        startIcon={<ShareIcon size='sm' />}
        onClick={shareBrain}
      />

      <LogoutIcon size='lg' onClick={logout} /> 
      </div>

    
      {copied && (
        <div className="fixed top-4 right-6 bg-white text-red-500 text-xs px-3 py-1.5 rounded-md whitespace-nowrap z-[9999] shadow-lg">
          ✓ Copied to clipboard!
        </div>
      )}
    </div>
    </div>
    
  )
}

export default Dashboard
