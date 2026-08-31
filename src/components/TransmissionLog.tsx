import { Divider, Flex, Typography } from 'antd';
import { TrackInfo } from '../api/radioApi';

const { Text } = Typography;

export interface Track {
    artist: string;
    title: string;
    playedAt: string;
}

interface TransmissionLogProps {
    tracks: TrackInfo[] | null;
}

export function TransmissionLog({
    tracks
}: TransmissionLogProps) {
    return (
        <Flex
            vertical
            gap={16}
            style={{
                width: 'min(500px, 90vw)',
                maxWidth: 'calc(100vw - 40px)',
                opacity: '50%'
            }}
        >
            <Text
                type="secondary"
                style={{
                    fontFamily: 'monospace',
                    fontSize: 11,
                    letterSpacing: '0.15em',
                }}
            >
                TRANSMISSION LOG
            </Text>

            <Divider style={{ margin: 0 }} />

            {tracks == null || tracks.length === 0 ? (
                <Text type="secondary">
                    No previous transmissions
                </Text>
            ) : (
                <Flex vertical gap={18}>
                    {tracks.map((track, index) => (
                        <Flex
                            key={`${track.artist} - ${track.title}`}
                            gap={12}
                        >
                            <Text
                                type="secondary"
                                style={{
                                    fontFamily: 'monospace',
                                    fontSize: 10,
                                }}
                            >
                                {String(index + 1).padStart(2, '0')}
                            </Text>

                            <Flex vertical>
                                <Text type="secondary">
                                    {track.artist}
                                </Text>

                                <Text>
                                    {track.title}
                                </Text>
                            </Flex>
                        </Flex>
                    ))}
                </Flex>
            )}
        </Flex>
    );
}