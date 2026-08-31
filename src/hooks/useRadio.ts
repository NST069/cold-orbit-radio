import { useCallback, useEffect, useState } from 'react';
import {
    fetchNowPlaying,
    NowPlaying,
    fetchRadioInfo,
    RadioInfo,
    fetchHistory,
    TrackInfo
} from '../api/radioApi';

const RADIO_CLOSED = process.env.REACT_APP_RADIO_CLOSED === 'true';

interface UseRadioResult {
    nowPlaying: NowPlaying | null;
    radioInfo: RadioInfo | null;
    playbackHistory: TrackInfo[] | null;
    loading: boolean;
    error: Error | null;
    refresh: () => Promise<void>;
}

export function useRadio(): UseRadioResult {
    const [nowPlaying, setNowPlaying] = useState<NowPlaying | null>(null);

    const [radioInfo, setRadioInfo] = useState<RadioInfo | null>(null);

    const [playbackHistory, setPlaybackHistory] = useState<TrackInfo[] | null>(null);

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

            const playbackHistoryData = await fetchHistory();
            setPlaybackHistory(playbackHistoryData);

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
        if (RADIO_CLOSED) return;
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
        playbackHistory,
        loading,
        error,
        refresh,
    };
}
