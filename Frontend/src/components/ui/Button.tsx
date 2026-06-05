import type { ReactElement } from "react";

type Variants = "primary" | "secondary";

export interface ButtonProps {
    variant: Variants
    size?: "sm"| "md" | "lg";
    text : string;
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    onClick?: () => void;
    // disabled?: boolean;
    className?: string;
    fullWidth? :boolean;
    loading?: boolean;
}



const variantStyles = {
    primary: "bg-indigo-500 text-white hover:bg-indigo-700 hover:text-white",
    secondary: "bg-white text-indigo-500 hover:bg-indigo-50 hover:text-indigo",
}
const sizeStyles = {
    "sm" : "py-1 px-2",
    "md" : "py-2 px-4",
    "lg" : "py-3 px-6",
}

const defaultStyles = "rounded-md flex items-center gap-2 p-4 transition-colors"

export const Button = (props: ButtonProps) => {
    return <button onClick={props.onClick} className={
        `${variantStyles[props.variant]} 
         ${defaultStyles} 
         ${sizeStyles[props.size]}
         ${props.className || ""}
         ${props.fullWidth? " w-full justify-center item-center" : ""}`
         }>
        {props.startIcon ? <div className="pr-2"> {props.startIcon} </div> : null} {props.text}{props.endIcon}</button>
}
