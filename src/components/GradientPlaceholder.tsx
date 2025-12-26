import Colors from '../util/Palette';

const GradientPlaceholder: React.FC<{ title?: string; artist?: string }> = ({ title, artist }) => {

    return (
        <div style={{
            width: '90%',
            height: '90%',
            background: `linear-gradient(135deg, ${Colors.PRIMARY_1} 0%, ${Colors.PRIMARY_2} 100%)`,
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            textAlign: 'center'
        }}>
            <div style={{ margin: '10px' }}>
                <div style={{ fontSize: '48px', marginBottom: '10px' }}>♪</div>
                <div style={{ fontSize: '28px', fontWeight: 'bold', wordWrap: 'normal' }}>{title}</div>
                <div style={{ fontSize: '16px', opacity: 0.9, wordWrap: 'normal' }}>{artist}</div>
            </div></div>
    );
};

export default GradientPlaceholder;
