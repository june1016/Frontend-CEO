// components/OperationStartAnimation.jsx
import { useState, useEffect, useRef } from 'react';
import { Box, Typography, keyframes, styled } from '@mui/material';
import ParticlesBackground from './particlesBackground';

const fadeIn = keyframes`
  0% { opacity: 0; transform: scale(0.8); }
  100% { opacity: 1; transform: scale(1); }
`;

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const AnimationContainer = styled(Box)(({ theme }) => ({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main}, ${theme.palette.primary.dark})`,
    backgroundSize: '400% 400%',
    animation: `${gradientAnimation} 8s ease infinite`,
    transition: 'opacity 0.5s ease-out',
    opacity: ({ visible }) => visible ? 1 : 0,
    pointerEvents: ({ visible }) => visible ? 'auto' : 'none'
}));

const ContentBox = styled(Box)({
    textAlign: 'center',
    animation: `${fadeIn} 0.8s ease-out`,
});

const OperationStartAnimation = ({ onComplete }) => {
    const [visible, setVisible] = useState(true);
    const animationRef = useRef(null);

    useEffect(() => {
        if (animationRef.current) {
            clearTimeout(animationRef.current);
        }

        animationRef.current = setTimeout(() => {
            setVisible(false);
            onComplete();
        }, 3000);

        return () => {
            if (animationRef.current) {
                clearTimeout(animationRef.current);
            }
        };
    }, [onComplete]);

    if (!visible) return null;

    const ProgressBar = styled(Box)({
        height: 8,
        borderRadius: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        width: '60%',
        margin: '20px auto',
        overflow: 'hidden',
    });

    const ProgressFill = styled(Box)({
        height: '100%',
        borderRadius: 4,
        backgroundColor: 'white',
        animation: `${keyframes`
      0% { width: 0%; }
      100% { width: 100%; }
    `} 2s ease-out forwards`
    });

    return (
        <AnimationContainer>
            <ParticlesBackground />
            <ContentBox>
                <Typography variant="h2" color="white" fontWeight="bold">
                    ¡Iniciando Operaciones!
                </Typography>
                <ProgressBar>
                    <ProgressFill />
                </ProgressBar>
            </ContentBox>
        </AnimationContainer>
    );
};

export default OperationStartAnimation;