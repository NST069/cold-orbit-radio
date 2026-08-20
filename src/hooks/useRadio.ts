import { useCallback, useEffect, useState } from 'react';
import {
    fetchNowPlaying,
    NowPlaying,
    fetchRadioInfo,
    RadioInfo
} from '../api/radioApi';

interface UseRadioResult {
    nowPlaying: NowPlaying | null;
    radioInfo: RadioInfo | null;
    loading: boolean;
    error: Error | null;
    refresh: () => Promise<void>;
}

export function useRadio(): UseRadioResult {
    const [nowPlaying, setNowPlaying] = useState<NowPlaying | null>(null);

    const [radioInfo, setRadioInfo] = useState<RadioInfo | null>(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState<Error | null>(null);

    const refresh = useCallback(async () => {
        try {
            setError(null);
            setLoading(true);

            const nowPlayingData = await fetchNowPlaying();
            setNowPlaying(nowPlayingData);

            const radioInfoData = await fetchRadioInfo();
            setRadioInfo(radioInfoData);

        } catch (error) {
            setError(
                error instanceof Error
                    ? error
                    : new Error('Unknown error')
            );
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        refresh();

        const interval = setInterval(
            refresh,
            10_000
        );

        return () => {
            clearInterval(interval);
        };
    }, [refresh]);

    return {
        nowPlaying,
        radioInfo,
        loading,
        error,
        refresh,
    };
}
