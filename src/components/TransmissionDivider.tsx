export function TransmissionDivider() {
    return (
        <div
            style={{
                width: 3,
                height: 320,
                position: 'relative',
                background:
                    'linear-gradient('
                    + 'to bottom, '
                    + 'transparent, '
                    + 'rgba(255,255,255,0.12) 20%, '
                    + 'rgba(255,255,255,0.12) 80%, '
                    + 'transparent'
                    + ')',
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: -4,
                    width: 9,
                    height: 1,
                    background:
                        'rgba(255,255,255,0.18)',
                }}
            />
        </div>
    );
}