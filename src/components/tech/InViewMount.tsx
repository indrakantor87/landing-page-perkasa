 'use client';
 
 import { useEffect, useRef, useState } from 'react';
 
 export default function InViewMount({
   children,
   rootMargin = '200px',
   placeholderHeight = 384,
 }: {
   children: React.ReactNode;
   rootMargin?: string;
   placeholderHeight?: number;
 }) {
   const ref = useRef<HTMLDivElement | null>(null);
   const [visible, setVisible] = useState(false);
 
   useEffect(() => {
     if (!ref.current || visible) return;
     const observer = new IntersectionObserver(
       (entries) => {
         entries.forEach((entry) => {
           if (entry.isIntersecting) {
             setVisible(true);
           }
         });
       },
       { root: null, rootMargin, threshold: 0.01 }
     );
     observer.observe(ref.current);
     return () => observer.disconnect();
   }, [visible, rootMargin]);
 
   return (
     <div ref={ref}>
       {visible ? children : <div style={{ minHeight: placeholderHeight }} />}
     </div>
   );
 }
