
import './App.css'
import {Button} from "./components/ui/Button";
import { PlusIcon } from './icons/Plus';
import { ShareIcon } from './icons/ShareIcon';
 
function App() {

  return (
    <div className="flex items-center gap-4 absolute top-4 right-6 ">
      <Button  variant="primary" text="Add Content" size='md' startIcon={<PlusIcon size='sm'/>}></Button>
      <Button variant="secondary" text="Share" size='md' startIcon={<ShareIcon size ='sm' />}></Button>
    </div>
  )
}

export default App
