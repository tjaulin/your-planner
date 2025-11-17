import { useState, useEffect } from 'react';

const quotes = [
    "Aujourd'hui est une nouvelle opportunité de prendre soin de toi 🌸",
    "Chaque petit pas compte, tu fais de ton mieux 💜",
    "Tu es exactement là où tu dois être 🌼",
    "Prends le temps de respirer, tu mérites cette pause 🌿",
    "Ta valeur ne dépend pas de ta productivité 🦋",
    "Sois douce avec toi-même, comme tu le serais avec une amie 💕",
    "Célèbre tes petites victoires, elles sont importantes ✨",
    "Tu as le droit de prendre ton temps 🌺",
    "Ton bien-être est une priorité, pas un luxe 🌙",
    "Aujourd'hui, fais quelque chose qui te fait sourire 😊",
];

export default function DailyQuote() {
    const [quote, setQuote] = useState('');

    useEffect(() => {
        // Sélectionner une citation aléatoire basée sur le jour
        const today = new Date().getDate();
        setQuote(quotes[today % quotes.length]);
    }, []);

    return (
        <div className="card gradient-pastel p-8 text-center">
            <div className="flex items-center justify-center mb-3">
                <span className="text-4xl">🌸</span>
            </div>
            <p className="text-lg font-medium text-mauve-700 text-shadow-soft">
                {quote}
            </p>
        </div>
    );
}
