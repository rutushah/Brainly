
interface InputProps {
     placeholder?: string;
     className?: string;
     type?:string;
     ref?:any
}

export function Input({ placeholder, className, ref,type}:InputProps){
    return <div>
         <input ref={ref} type={type} placeholder={placeholder} className={`px-4 py-2 border rounded m-2 ${className || ''}`} ></input>
    </div>
}