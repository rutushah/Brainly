export interface IconProps {
    size?: "sm" | "md" | "lg";
    onClick?: () => void;
}

export const iconSizeVariants = {
    "sm": "size-4",
    "md": "size-6",
    "lg": "size-8",
}