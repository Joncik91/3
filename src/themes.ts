export interface Theme {
    id: string;
    name: string;
    colors: {
        bgGradientStart: string;
        bgGradientMid: string;
        bgGradientEnd: string;
        primary: string;
        secondary: string;
        accent: string;
        textMain: string;
        textMuted: string;
        textDim: string;
        glassBg: string;
        glassBorder: string;
        glassShadow: string;
    };
}

export const themes: Theme[] = [
    {
        id: 'nebula',
        name: 'Nebula',
        colors: {
            bgGradientStart: '#0f0c29',
            bgGradientMid: '#302b63',
            bgGradientEnd: '#24243e',
            primary: '#a18cd1',
            secondary: '#fbc2eb',
            accent: '#00d2ff',
            textMain: '#ffffff',
            textMuted: 'rgba(255, 255, 255, 0.7)',
            textDim: 'rgba(255, 255, 255, 0.4)',
            glassBg: 'rgba(255, 255, 255, 0.1)',
            glassBorder: 'rgba(255, 255, 255, 0.1)',
            glassShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        },
    },
    {
        id: 'sunset',
        name: 'Sunset',
        colors: {
            bgGradientStart: '#2b1055',
            bgGradientMid: '#7597de',
            bgGradientEnd: '#ff9a9e',
            primary: '#ff9a9e',
            secondary: '#fad0c4',
            accent: '#ffd1ff',
            textMain: '#ffffff',
            textMuted: 'rgba(255, 255, 255, 0.8)',
            textDim: 'rgba(255, 255, 255, 0.5)',
            glassBg: 'rgba(43, 16, 85, 0.4)',
            glassBorder: 'rgba(255, 255, 255, 0.2)',
            glassShadow: '0 8px 32px 0 rgba(100, 38, 38, 0.37)',
        },
    },
    {
        id: 'forest',
        name: 'Forest',
        colors: {
            bgGradientStart: '#134e5e',
            bgGradientMid: '#326f58',
            bgGradientEnd: '#71b280',
            primary: '#71b280',
            secondary: '#a8e063',
            accent: '#56ab2f',
            textMain: '#ffffff',
            textMuted: 'rgba(255, 255, 255, 0.8)',
            textDim: 'rgba(255, 255, 255, 0.5)',
            glassBg: 'rgba(0, 0, 0, 0.2)',
            glassBorder: 'rgba(255, 255, 255, 0.1)',
            glassShadow: '0 8px 32px 0 rgba(0, 50, 0, 0.37)',
        },
    },
    {
        id: 'ocean',
        name: 'Ocean',
        colors: {
            bgGradientStart: '#1a2980',
            bgGradientMid: '#26d0ce',
            bgGradientEnd: '#1a2980',
            primary: '#26d0ce',
            secondary: '#1a2980',
            accent: '#00c6ff',
            textMain: '#ffffff',
            textMuted: 'rgba(255, 255, 255, 0.8)',
            textDim: 'rgba(255, 255, 255, 0.5)',
            glassBg: 'rgba(26, 41, 128, 0.3)',
            glassBorder: 'rgba(255, 255, 255, 0.2)',
            glassShadow: '0 8px 32px 0 rgba(0, 38, 135, 0.37)',
        },
    },
    {
        id: 'midnight',
        name: 'Midnight',
        colors: {
            bgGradientStart: '#000000',
            bgGradientMid: '#434343',
            bgGradientEnd: '#000000',
            primary: '#d4d4d4',
            secondary: '#868f96',
            accent: '#ffffff',
            textMain: '#ffffff',
            textMuted: 'rgba(255, 255, 255, 0.7)',
            textDim: 'rgba(255, 255, 255, 0.5)',
            glassBg: 'rgba(255, 255, 255, 0.03)',
            glassBorder: 'rgba(255, 255, 255, 0.05)',
            glassShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
        },
    },
];
