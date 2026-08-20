import { useEffect } from 'react';

export function usePageTitle(
    artist?: string,
    title?: string
) {
    useEffect(() => {
        if (!artist || !title) {
            document.title = 'Cold Orbit Radio';
            return;
        }

        document.title =
            `${artist} - ${title} | Cold Orbit Radio`;
    }, [artist, title]);
}
