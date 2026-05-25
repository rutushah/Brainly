
import './App.css'
import {Button} from "./components/ui/Button";
import { PlusIcon } from './icons/Plus';
import { ShareIcon } from './icons/ShareIcon';
import { Card} from './components/ui/Card';

 
function App() {

  return (
    <div className='p-8'>
      <div className='flex gap-4'>
        <Card type ="twitter" link ="https://x.com/banala_sathwik/status/2057773905910350232/photo/1" title='First Tweet'/>
        <Card type ="youtube" link ="http://youtube.com/watch?v=mOHc09hDtFw" title='First Video'/>
      </div>
    
        <div className="flex items-center gap-4 absolute top-4 right-6 ">
          <Button  variant="primary" text="Add Content" size='md' startIcon={<PlusIcon size='sm'/>}></Button>
          <Button variant="secondary" text="Share Brain" size='md' startIcon={<ShareIcon size ='sm' />}></Button>
        </div>
    </div>
    
  )
}

export default App
