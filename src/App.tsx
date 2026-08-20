import { Flex, Layout, Grid } from 'antd';
import { RadioHeader } from './components/RadioHeader';
import { NowPlaying } from './components/NowPlaying';
import { TransmissionLog } from './components/TransmissionLog';
import { useRadio } from './hooks/useRadio';
import { usePageTitle } from './hooks/usePageTitle';
import Colors from './util/Palette';
import { TransmissionDivider } from './components/TransmissionDivider';

const { Header, Content } = Layout;

const STREAM_URL = process.env.REACT_APP_RADIOSTREAM_ENDPOINT;

const App = () => {
    const {
        nowPlaying,
        radioInfo,
        loading,
    } = useRadio();

    usePageTitle(
        nowPlaying?.performer,
        nowPlaying?.title
    );

    const screens = Grid.useBreakpoint();
    const isMobile = !screens.md;

    return (
        <Layout style={{
            minHeight: '100vh',
            background: Colors.BG_BASE,
        }}>
            <Header style={{ background: Colors.BG_BLACK }}>
                <RadioHeader
                    listeners={radioInfo?.listeners ?? 0}
                    loading={loading} />
            </Header>

            <Content
                style={{
                    width: '100%',
                    boxSizing: 'border-box',
                    overflowX: 'hidden',
                }}
            >
                <Flex
                    justify="center"
                    align="center"
                    style={{
                        minHeight: 'calc(100vh - 64px)',
                        padding: 40,
                    }}
                >
                    <Flex
                        vertical={isMobile}
                        align="center"
                        justify="center"
                        gap={isMobile ? 48 : 80}
                        style={{
                            width: '100%',
                            maxWidth: 1050,
                            boxSizing: 'border-box',
                        }}
                    >
                        <NowPlaying
                            artist={nowPlaying?.performer}
                            title={nowPlaying?.title}
                            streamUrl={STREAM_URL} />
                        {!isMobile && <TransmissionDivider />}
                        <TransmissionLog />
                    </Flex>
                </Flex>
            </Content>
        </Layout>
    );
}

export default App;
