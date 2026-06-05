interface SelectProps {
    options?: {label: string; value: string}[];
    onChange?: (value: string) => void;
    value?: string;
}

export function Select({ options, onChange, value }: SelectProps) {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-4 py-2 border rounded m-2 focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm text-gray-600"
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}