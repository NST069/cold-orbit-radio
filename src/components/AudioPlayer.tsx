import React, { useRef, useState } from 'react';
import { Button, Slider, Flex } from 'antd';
import { CaretRightOutlined, MutedOutlined, SoundOutlined } from '@ant-design/icons';

interface AudioPlayerProps {
    streamUrl?: string;
    autoPlay?: boolean;
    changePageTitle: (isPlaying: boolean) => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ streamUrl, autoPlay, changePageTitle }) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(80);

    const togglePlay = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(err => {
                console.log('Автовоспроизведение заблокировано:', err);
            });
        }
        changePageTitle(!isPlaying);
        setIsPlaying(!isPlaying);
    };

    const toggleMute = () => {
        if (audioRef.current) {
            setIsMuted(!isMuted);
            audioRef.current.muted = !audioRef.current.muted;
        }
    }

    const adjustVolume = (value: number) => {
        setVolume(value);
        if (audioRef.current) {
            audioRef.current.volume = value / 100;
            if (value === 0) {
                audioRef.current.muted = true;
                setIsMuted(true);
            } else if (isMuted) {
                audioRef.current.muted = false;
                setIsMuted(false);
                setIsPlaying(true);
            }
        }
    };


    return (
        <div>
            <audio
                ref={audioRef}
                src={streamUrl}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                style={{ display: 'none' }}
            />
            <Flex>
                {!isPlaying && <Button
                    type="text"
                    icon={<CaretRightOutlined />}
                    onClick={togglePlay}
                    disabled={!streamUrl}
                ></Button>}
                <Button
                    type="text"
                    icon={isMuted ? <MutedOutlined /> : <SoundOutlined />}
                    onClick={toggleMute}
                    disabled={!streamUrl || !isPlaying}
                ></Button>
                <Slider style={{ "flex": 1 }} defaultValue={volume} disabled={!streamUrl || !isPlaying} onChange={adjustVolume} />
            </Flex>
        </div>
    );
}

export default AudioPlayer;
