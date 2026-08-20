import { Flex, Typography, Image, Button } from 'antd';
import { LoadingOutlined, SendOutlined } from '@ant-design/icons';
import logo from '../assets/coradio_2026_transparent.svg';
import telegramLogo from '../assets/telegram-svgrepo-com.svg';

const { Text } = Typography;

interface RadioHeaderProps {
    listeners?: number;
    loading: boolean;
}

const telegramUrl = "https://t.me/co_radio";

export function RadioHeader({
    listeners = 0,
    loading = false,
}: RadioHeaderProps) {
    return (
        <Flex
            align="center"
            justify="space-between"
            style={{
                height: '100%'
            }}
        >
            <Flex align="baseline" gap={8}>
                <Image
                    src={logo}
                    alt="Cold Orbit Radio"
                    preview={false}
                    draggable={false}
                    height='100px'
                    style={{
                        overflow: 'hidden'
                    }}
                />

                <Text type="secondary">RADIO</Text>
            </Flex>

            <Flex align="center" gap={25}>
                {loading && <LoadingOutlined />}

                <Text type="secondary">
                    {listeners} LISTENER{listeners % 10 !== 1 && "S"}
                </Text>

                <a
                    href={telegramUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        opacity: 0.45,
                    }}
                >
                    <img
                        src={telegramLogo}
                        alt="Telegram"
                        draggable={false}
                        style={{
                            width: 30,
                            height: 30,
                        }}
                    />
                </a>
            </Flex>
        </Flex>
    );
}
