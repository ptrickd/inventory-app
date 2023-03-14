// components/ClientOnly.js

import React, { useEffect, useState } from "react";

interface IProps {
    children: React.ReactNode,
    delegated: string[]
}

export default function ClientOnly({ children, ...delegated }: IProps) {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) {
        return null;
    }

    return (
        <div {...delegated} > {children} </div>
    );
}