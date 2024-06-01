import { useState } from 'react';

export default function useStringInput() {
    const [value, setValue] = useState('');
    const handleValueChange = (event) => setValue(event.target.value);

    return [value, handleValueChange];
}
