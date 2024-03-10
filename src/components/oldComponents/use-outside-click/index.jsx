import { useEffect } from "react";


export default function useOutisdeClick(ref, handler) {

    useEffect(() => {

        function listener(e) {
            if (!ref.current || ref.current.contains(e.target)) return;
            handler();
        }

        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);

        return () => {
            document.removeEventListener('mousedowm', listener);
            document.removeEventListener('touchstart', listener);
        };

    }, [handler, ref]);

}