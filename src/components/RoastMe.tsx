import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface FloatingEmoji {
  id: number;
  emoji: string;
  x: number;
  y: number;
}

const RoastMe = () => {
  const [inputText, setInputText] = useState('');
  const [currentRoast, setCurrentRoast] = useState('');
  const [floatingEmojis, setFloatingEmojis] = useState<FloatingEmoji[]>([]);
  const [isRoasting, setIsRoasting] = useState(false);

  const roastEmojis = ['😂', '🔥', '💀', '🤣', '🤡', '😈', '😹', '🙃', '🤯', '💣', '⚡', '🌶️'];

  const categorySounds = {
    short: ['/sounds/short-roast.mp3'], // Add your short roast sound here
    medium: ['/sounds/medium-roast.mp3'], // Add your medium roast sound here
    long: ['/sounds/long-roast.mp3'], // Add your long roast sound here
    extralong: ['/sounds/extralong-roast.mp3'], // Add your extralong roast sound here
    ultimate: ['/sounds/ultimate-roast.mp3'] // Add your ultimate roast sound here
  };

  // Fallback sounds if category-specific sounds aren't available
  const fallbackSounds = [
    '/sounds/airhorn-6466.mp3',
    '/sounds/boing-spring-mouth-harp-04-20-13-4-103346.mp3',
    '/sounds/buzzer-227217.mp3',
    '/sounds/crowd-disappointment-reaction-352718.mp3',
    '/sounds/dat-evil-laugh-104401.mp3'
  ];

  const roastCategories = {
    short: [
      "That's it? My goldfish writes longer texts 😂🐠",
      "Short and not sweet, just like your personality 🔥💀",
      "Even Twitter has more character than this 🤣📱",
      "Brevity is the soul of wit... too bad you have neither 😈✨",
      "Your text is shorter than your attention span 🤡⏰",
      "That's more basic than a pumpkin spice latte 🎃☕",
      "Even a fortune cookie has more depth 🥠💭",
      "Your creativity ran out faster than my patience 😹⚡",
      "That's weaker than WiFi in a basement 📶💀",
      "Less effort than a participation trophy 🏆🤣"
    ],
    medium: [
      "Congrats! You managed a whole sentence without autocorrect crying 😂📱💀",
      "That's about as exciting as watching paint dry in slow motion 🎨😴🔥",
      "Your writing skills peaked in elementary school, didn't they? 🎓🤣💣",
      "I've seen more personality in a cardboard box 📦😈⚡",
      "That text has less flavor than unseasoned chicken 🐔🌶️💀",
      "Your thoughts are more scattered than my weekend plans 🤯📅😂",
      "Even my spam folder has better content than this 📧🤡🔥",
      "That's more disappointing than a cancelled Netflix show 📺😹💀",
      "Your text reads like an AI having an existential crisis 🤖💭🤣",
      "More boring than a lecture on paint drying techniques 🎨😴⚡"
    ],
    long: [
      "Wow, a whole paragraph! Did your brain hurt from all that thinking? 🧠💀😂",
      "That's longer than most relationships these days... and just as pointless 💔🔥🤣",
      "I lost the will to live halfway through reading that masterpiece 😴💀⚡",
      "Your text is like a marathon nobody asked to run 🏃‍♀️💨🤡",
      "That rambling has more twists than a pretzel factory 🥨😈🤯",
      "You managed to say absolutely nothing in so many words 🗣️💭💀",
      "That's more exhausting than explaining TikTok to grandparents 👴📱😂",
      "Your writing style: 50% confusion, 50% regret 🤷‍♀️😹🔥",
      "I need a vacation after reading that emotional rollercoaster 🎢😴💣",
      "That text has more filler than a gas station burrito 🌯⚡🤣"
    ],
    extralong: [
      "Holy wall of text! Did you copy-paste your diary in here? 📖💀😂🔥",
      "That's longer than a CVS receipt and twice as useless 🧾🤡⚡",
      "I aged 10 years reading that epic novel of nonsense 📚👴💀🤣",
      "You wrote a whole thesis on how to waste everyone's time 🎓⏰😈",
      "That text is longer than my last relationship and equally disappointing 💔📝😹",
      "I need subtitles for your stream of consciousness disaster 🎬💭🔥",
      "Your fingers must be exhausted from typing that much nothing 👆💨💀",
      "That's more content than most people's entire social media history 📱🤯😂",
      "I've read shorter terms and conditions agreements 📋⚡🤡",
      "You turned typing into an extreme sport nobody wanted to watch 🏆😴🔥"
    ],
    ultimate: [
      "DEAR LORD, what literary crime against humanity did I just witness?! 📚💀😂🔥⚡",
      "That text is longer than the entire Lord of the Rings trilogy and makes less sense 🧙‍♂️📖🤯",
      "I'm calling the authorities - this has to violate some kind of reading law 👮‍♀️📱💀🤣",
      "You just broke the world record for most words used to say absolutely nothing 🏆🗣️😈",
      "That masterpiece needs its own zip code and a search function 🏘️🔍💣😹",
      "I started reading this in 2024 and I'm still going... send help 📅⏰💀🔥",
      "You've achieved the impossible: making War and Peace look like a tweet 📚🐦⚡😂",
      "That text has more chapters than a Netflix series nobody asked for 📺🤡💭",
      "I need therapy after surviving that emotional marathon of confusion 🛋️💀🤯🔥",
      "Congratulations! You just invented a new form of torture through typography 🏆😈📝💣"
    ]
  };

  const playCategorySound = (category: string) => {
    const categoryKey = category as keyof typeof categorySounds;
    const categorySpecificSounds = categorySounds[categoryKey];
    
    // Try to play category-specific sound first, fallback to random if not available
    let soundToPlay: string;
    if (categorySpecificSounds && categorySpecificSounds.length > 0) {
      soundToPlay = categorySpecificSounds[Math.floor(Math.random() * categorySpecificSounds.length)];
    } else {
      soundToPlay = fallbackSounds[Math.floor(Math.random() * fallbackSounds.length)];
    }
    
    const audio = new Audio(soundToPlay);
    audio.play().catch(e => console.log('Audio play failed:', e));
  };

  const generateFloatingEmojis = () => {
    const newEmojis: FloatingEmoji[] = [];
    for (let i = 0; i < 12; i++) {
      newEmojis.push({
        id: Date.now() + i,
        emoji: roastEmojis[Math.floor(Math.random() * roastEmojis.length)],
        x: Math.random() * 100,
        y: Math.random() * 100
      });
    }
    setFloatingEmojis(newEmojis);

    // Clear emojis after animation
    setTimeout(() => setFloatingEmojis([]), 3000);
  };

  const getRoastCategory = (textLength: number) => {
    if (textLength < 15) return 'short';
    if (textLength < 30) return 'medium';
    if (textLength < 55) return 'long';
    if (textLength < 70) return 'extralong';
    return 'ultimate';
  };

  const handleRoastMe = () => {
    if (!inputText.trim()) {
      setCurrentRoast("You can't roast nothing, genius! Type something first 🤡💀");
      return;
    }

    setIsRoasting(true);
    const category = getRoastCategory(inputText.length);
    const roasts = roastCategories[category];
    const randomRoast = roasts[Math.floor(Math.random() * roasts.length)];
    
    playCategorySound(category);
    generateFloatingEmojis();
    
    // Dramatic reveal
    setTimeout(() => {
      setCurrentRoast(randomRoast);
      setIsRoasting(false);
    }, 500);
  };

  useEffect(() => {
    // Cleanup floating emojis on unmount
    return () => setFloatingEmojis([]);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Floating emojis */}
      {floatingEmojis.map((emoji) => (
        <div
          key={emoji.id}
          className="floating-emoji absolute text-4xl pointer-events-none z-20"
          style={{
            left: `${emoji.x}%`,
            top: `${emoji.y}%`,
          }}
        >
          {emoji.emoji}
        </div>
      ))}

      <div className="w-full max-w-2xl mx-auto text-center relative z-10">
        {/* Title */}
        <h1 className="text-6xl md:text-8xl font-black mb-8 roast-text">
          ROAST ME 🔥
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-muted-foreground font-bold">
          Think you can handle the heat? Let's find out... 😈
        </p>

        {/* Input section */}
        <div className="space-y-6 mb-8">
          <Input
            type="text"
            placeholder="Type anything... if you dare 🤡"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="text-lg h-16 text-center border-2 border-border bg-input/50 backdrop-blur-sm"
            onKeyPress={(e) => e.key === 'Enter' && handleRoastMe()}
          />
          
          <Button
            onClick={handleRoastMe}
            disabled={isRoasting}
            className="roast-button text-xl font-black py-6 px-12 text-black w-full md:w-auto transition-all duration-300"
          >
            {isRoasting ? 'PREPARING THE FIRE 🔥' : 'ROAST ME 🔥'}
          </Button>
        </div>

        {/* Character count indicator */}
        <div className="mb-8 text-muted-foreground">
          <span className="text-sm">
            Characters: {inputText.length} | 
            Category: {inputText.length === 0 ? 'None' : getRoastCategory(inputText.length).toUpperCase()}
          </span>
        </div>

        {/* Roast display */}
        {currentRoast && (
          <div className="bg-card/80 backdrop-blur-sm border-2 border-border rounded-2xl p-8 shadow-2xl">
            <div className="text-2xl md:text-3xl font-bold leading-relaxed roast-text">
              {currentRoast}
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-8 text-sm text-muted-foreground">
          <p>💡 Tip: The longer your text, the more savage the roast gets!</p>
        </div>
      </div>
    </div>
  );
};

export default RoastMe;