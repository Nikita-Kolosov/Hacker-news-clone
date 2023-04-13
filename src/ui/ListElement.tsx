import { useState } from 'react';

export default function ListElement() {
    const [open, setOpen] = useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <div></div>
    );
};