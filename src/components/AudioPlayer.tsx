import {
    MutedOutlined,
    SoundOutlined,
    CaretRightOutlined,
    LoadingOutlined
} from '@ant-design/icons';

import { Button, Flex, Slider } from 'antd';
import { useState, useRef } from 'react';

interface AudioPlayerProps {
    streamUrl?: string;
}

export function AudioPlayer({
    streamUrl,
}: AudioPlayerProps) {
    const audioRef = useRef<HTMLAudioElement>(null);

    const [playing, setPlaying] = useState(false);
    const [buffering, setBuffering] = useState(false);
    const [muted, setMuted] = useState(false);
    const [volume, setVolume] = useState(70);

    const handleClick = async () => {
        const audio = audioRef.current;

        if (!audio) {
            return;
        }

        if (!playing) {
            try {
                await audio.play();
            } catch (error) {
                console.error(
                    'Failed to start audio stream',
                    error
                );
            }

            return;
        }

        audio.muted = !audio.muted;
        setMuted(audio.muted);
    };

    const adjustVolume = (value: number) => {
        setVolume(value);
        if (audioRef.current) {
            audioRef.current.volume = value / 100;
            if (value === 0) {
                audioRef.current.muted = true;
                setMuted(true);
            } else if (muted) {
                audioRef.current.muted = false;
                setMuted(false);
                setPlaying(true);
            }
        }
    };

    return (
        <Flex
            align="center"
            gap={8}
            style={{
                width: 'min(500px, 90vw)',
                maxWidth: 'calc(100vw - 40px)',
                marginTop: 18,
            }}
        >
            <audio
                ref={audioRef}
                src={streamUrl}
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                onEnded={() => setPlaying(false)}
                onWaiting={() => setBuffering(true)}
                onCanPlay={() => setBuffering(false)}
                onError={() => {
                    setPlaying(false);
                    setBuffering(false);
                }}
                style={{ display: 'none' }}
            />
            {buffering && <LoadingOutlined />}
            <Button
                type="text"
                shape="circle"
                icon={
                    !playing
                        ? <CaretRightOutlined />
                        : muted
                            ? <MutedOutlined />
                            : <SoundOutlined />
                }
                onClick={handleClick}
            />

            <Slider
                min={0}
                max={100}
                defaultValue={volume}
                disabled={!streamUrl || !playing}
                onChange={adjustVolume}
                style={{ flex: 1 }}
            />

        </Flex>
    );
}
