'use client';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';

const Page = dynamic(() => import('~&/src/screens/500').then(p => p.ErrorPage));

export default function Error() {
    return <Page />;
}
