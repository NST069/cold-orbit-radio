export interface NowPlaying {
    id: number;
    title: string;
    performer: string;
    duration: number;
    hasCover: boolean;
}

export interface RadioInfo {
    name: string,
    description: string,
    genre: string,
    url: string,
    listeners: number,
    peakListeners: number,
    currentSong: string,
    streamStart: string
}

const API_URL = process.env.REACT_APP_ENDPOINT;

export async function fetchNowPlaying(): Promise<NowPlaying> {
    const response = await fetch(
        `${API_URL}/now-playing`
    );

    if (!response.ok) {
        throw new Error(
            `Failed to fetch now playing: ${response.status}`
        );
    }

    return response.json();
}

export async function fetchRadioInfo(): Promise<RadioInfo> {
    const response = await fetch(
        `${API_URL}/`
    );

    if (!response.ok) {
        throw new Error(
            `Failed to fetch radio info: ${response.status}`
        );
    }

    return response.json();
}
