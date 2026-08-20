import { Flex, Image, Typography } from 'antd';
import { AudioPlayer } from './AudioPlayer';
import GradientPlaceholder from './GradientPlaceholder';

const { Text } = Typography;

interface NowPlayingProps {
    artist?: string;
    title?: string;
    coverUrl?: string;
    streamUrl?: string;
}

export function NowPlaying({
    artist,
    title,
    coverUrl,
    streamUrl,
}: NowPlayingProps) {
    return (
        <Flex
            vertical
            align="center"
            flex={1}
        >
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '75%',
                aspectRatio: '1 / 1',
                overflow: 'hidden'
            }}>
                {coverUrl ? (
                    <Image
                        src={coverUrl}
                        preview={false}
                        style={{
                            objectFit: 'cover',
                        }}
                    />
                ) : (
                    <GradientPlaceholder />
                )}
            </div>

            <Flex
                vertical
                align="center"
                gap={4}
                style={{ marginTop: 20 }}
            >
                <Text type="secondary">
                    {artist}
                </Text>

                <Text strong>
                    {title}
                </Text>
            </Flex>

            <AudioPlayer streamUrl={streamUrl} />
        </Flex>
    );
}
