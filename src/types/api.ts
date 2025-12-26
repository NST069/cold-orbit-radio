export interface NowPlayingResponse {
    id: number;
    title: string;
    performer: string;
    duration: number;
    hasCover: boolean;
}

export interface RadioInfoResponse {
    name: string;
    description: string;
    url: string;
}

export interface ListenersResponse {
    listeners: number;
    peakListeners: number;
}

export interface HealthResponse {
    status: 'ok' | 'error';
    uptime: number;
    timestamp: string;
}
