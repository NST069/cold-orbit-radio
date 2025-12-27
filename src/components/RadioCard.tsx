import { useState, useEffect, useRef, useCallback } from "react";

import { Card, Space, Statistic, Spin } from 'antd';
import { NowPlayingResponse, ListenersResponse, RadioInfoResponse } from '../types/api';
import AudioPlayer from './AudioPlayer';
import GradientPlaceholder from "./GradientPlaceholder";

const RadioCard = () => {
    const endpoint = process.env.REACT_APP_ENDPOINT;

    const [radioTitle, setRadioTitle] = useState<string>();
    const [trackTitle, setTrackTitle] = useState<string>();
    const [isLoading, setIsLoading] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const timerRef = useRef<NodeJS.Timeout>(null);
    const [trackPerformer, setTrackPerformer] = useState<string>();
    const [listenerCount, setListenerCount] = useState({ listeners: 0, peakListeners: 0 });
    const [pageTitle, setPageTitle] = useState('Cold Orbit Radio');
    //const [cover, setCover] = useState<string>();

    const [nowPlaying, setNowPlaying] = useState<NowPlayingResponse>();
    const [listeners, setListeners] = useState<ListenersResponse>();
    const [radioInfo, setRadioInfo] = useState<RadioInfoResponse>();
    const [radioUrl, setRadioUrl] = useState<string>();

    const fetchData = useCallback(async () => {
        try {
            setIsLoading(true);
            const playingResponse = await fetch(`${endpoint}/now-playing`, { headers: { 'Accept': 'application/json', } });
            const playingData = await playingResponse.json();
            setNowPlaying({
                id: playingData.id,
                title: playingData.title,
                performer: playingData.performer,
                duration: playingData.duration,
                hasCover: playingData.hasCover
            });

            const listenersResponse = await fetch(`${endpoint}/listeners`, { headers: { 'Accept': 'application/json', } });
            const listenersData = await listenersResponse.json();
            setListeners({
                listeners: listenersData.listeners,
                peakListeners: listenersData.peakListeners
            });

            const radioResponse = await fetch(`${endpoint}/`, { headers: { 'Accept': 'application/json', } });
            const radioData = await radioResponse.json();
            setRadioInfo({
                name: radioData.name,
                description: radioData.description,
                url: radioData.url
            });
            setIsLoading(false);
        } catch (error) {
            console.log('Ошибка загрузки:', error);
            setIsLoading(false);
        }
    }, [endpoint]);

    useEffect(() => {
        setTrackTitle(nowPlaying ? nowPlaying.title : "");
        setTrackPerformer(nowPlaying ? nowPlaying.performer : "");
        //setCover(`${endpoint}/cover/${nowPlaying?.id}`)
    }, [nowPlaying]);

    useEffect(() => {
        setListenerCount({ listeners: listeners?.listeners || 0, peakListeners: listeners?.peakListeners || 0 });
    }, [listeners]);

    useEffect(() => {
        if (radioInfo) {
            setRadioTitle(radioInfo.name);
        }
    }, [radioInfo]);

    useEffect(() => {
        if (isLoading) {
            timerRef.current = setTimeout(() => { setShowLoading(true) }, 5000);
        } else if (timerRef.current) {
            clearTimeout(timerRef.current);
            setShowLoading(false);
        }
    }, [isLoading]);

    useEffect(() => {
        setRadioUrl(process.env.REACT_APP_RADIOSTREAM_ENDPOINT);
        fetchData();

        const interval = setInterval(fetchData, 5000);

        return () => clearInterval(interval);
    }, [fetchData]);

    useEffect(() => {
        document.title = pageTitle;
    }, [pageTitle]);

    useEffect(() => {
        setPageTitle(`${trackPerformer} - ${trackTitle}`);
    }, [trackPerformer, trackTitle]);

    const changePageTitle = (isPlaying: boolean) => {
        setPageTitle(isPlaying ? `${trackPerformer} - ${trackTitle}` : "Cold Orbit Radio");
    }

    return (
        <Card
            title={
                <Space>
                    <span>{radioTitle}</span>
                    {showLoading && <Spin />}
                </Space>

            }
            style={{
                width: 'min(500px, 90vw)',
                maxWidth: 'calc(100vw - 40px)',
                height: 'fit-content',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
            }}
            cover={
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                    aspectRatio: '1 / 1',
                    overflow: 'hidden'
                }}>
                    <GradientPlaceholder title={trackTitle} artist={trackPerformer} />
                </div>
            }
        >

            <AudioPlayer
                streamUrl={radioUrl}
                autoPlay={false}
                changePageTitle={changePageTitle}
            />

            <div style={{
                display: 'flex',
            }}>
                <div style={{ margin: 20 }}>
                    <Statistic title="Listeners" value={listenerCount.listeners} />
                </div>
                <div style={{ margin: 20 }}>
                    <Statistic title="Peak Listeners" value={listenerCount.peakListeners} />
                </div>
            </div>
        </Card>
    );
}

export default RadioCard;
