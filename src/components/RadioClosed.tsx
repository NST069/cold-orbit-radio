import { Button, Divider, Flex, Grid, Typography } from 'antd';
import logo from '../assets/coradio_2026_transparent.svg';
import orbitLogo from '../assets/coradio_2026_transparent_no_letters.svg';
import telegramLogo from '../assets/telegram-svgrepo-com.svg';

const { Text, Title } = Typography;
const { useBreakpoint } = Grid;

const TELEGRAM_URL = 'https://t.me/co_radio';

export function RadioClosed() {

    const screens = useBreakpoint();
    const isMobile = !screens.md;

    return (
        <Flex
            vertical
            align="center"
            justify="center"
            style={{
                width: '100%',
                boxSizing: 'border-box',
                padding: 24,
                textAlign: 'center',
            }}
        >

            <Flex
                vertical
                align="center"
                gap={24}
                style={{
                    position: 'relative',
                    width: 'min(600px, 90vw)',
                }}
            >

                <img
                    src={orbitLogo}
                    alt=""
                    aria-hidden="true"
                    style={{
                        position: 'absolute',
                        top: '-150px',
                        right: isMobile ? '30%' : 0,
                        transform: isMobile
                            ? 'translateX(50%)'
                            : undefined,
                        width: isMobile
                            ? 280
                            : 'clamp(280px, 35vw, 450px)',
                        height: 'auto',
                        opacity: 0.12,
                        pointerEvents: 'none',
                        zIndex: 0,
                    }}
                />

                <Flex
                    vertical
                    align="center"
                    gap={24}
                    style={{
                        width: 'min(600px, 90vw)',
                    }}
                >
                    <Text
                        type="secondary"
                        style={{
                            fontFamily: 'monospace',
                            fontSize: 11,
                            letterSpacing: '0.2em',
                        }}
                    >
                        COLD ORBIT RADIO
                    </Text>

                    <Flex
                        vertical
                        align="center"
                        gap={8}
                    >
                        <Title
                            level={2}
                            style={{
                                margin: 0,
                                letterSpacing: '0.08em',
                            }}
                        >
                            TRANSMISSION PAUSED
                        </Title>

                        <Text
                            type="secondary"
                            style={{
                                fontFamily: 'monospace',
                                fontSize: 11,
                                letterSpacing: '0.12em',
                                opacity: 0.7,
                            }}
                        >
                            MAINTENANCE MODE
                        </Text>
                    </Flex>

                    <Text
                        type="secondary"
                        style={{
                            maxWidth: 460,
                            lineHeight: 1.7,
                        }}
                    >
                        Radio is temporarily offline for maintenance.
                        <br />
                        Transmission will resume when station systems are ready.
                    </Text>

                    <Flex
                        vertical
                        align="center"
                        gap={16}
                        style={{
                            width: 'min(500px, 90vw)',
                            marginTop: 16,
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
                            STAY IN ORBIT
                        </Text>

                        <Divider style={{ margin: 0 }} />

                        <Button
                            type="text"
                            href={TELEGRAM_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            icon={<img
                                src={telegramLogo}
                                alt="Telegram"
                                draggable={false}
                                style={{
                                    width: 30,
                                    height: 30,
                                }}
                            />
                            }
                            style={{
                                fontFamily: 'monospace',
                                letterSpacing: '0.08em',
                            }}
                        >
                            TELEGRAM CHANNEL
                        </Button>
                    </Flex>

                    <Text
                        type="secondary"
                        style={{
                            fontFamily: 'monospace',
                            fontSize: 10,
                            letterSpacing: '0.15em',
                            opacity: 0.5,
                            marginTop: 32,
                        }}
                    >
                        TRANSMISSION OFFLINE
                    </Text>
                </Flex>
            </Flex>
        </Flex>
    );
}