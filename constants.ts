import type { GalleryItem } from './types';

export const GALLERY_ITEMS: GalleryItem[] = [
  // == Portrait Styles ==
  {
    id: 1,
    imageUrl: 'https://picsum.photos/seed/CurtainLightStreaks/300/300',
    prompt: "A high-fashion portrait where horizontal streaks of light, as if coming through window blinds, cast dramatic shadows across the face and a tailored suit. The subject's expression is calm and confident, exuding elegance. The style is minimal and symmetrical, with sharp, highly detailed features.",
    name: 'Curtain Light Streaks',
    category: 'Portrait'
  },
  {
    id: 3,
    imageUrl: 'https://picsum.photos/seed/GoldenHourRooftop/300/300',
    prompt: "A luxurious rooftop portrait during the golden hour. The subject wears a smart-casual outfit (e.g., open-collar shirt, linen blazer). Sunset lighting casts soft, warm tones across their skin. In the background, a modern city skyline fades into a warm bokeh. The look is clean, editorial, and has professional photography vibes with 4K clarity.",
    name: 'Golden Hour Rooftop',
    category: 'Portrait'
  },
  {
    id: 4,
    imageUrl: 'https://picsum.photos/seed/BWWaterDroplets/300/300',
    prompt: "A high-contrast, black and white close-up portrait focusing on the face. The subject has a proud expression, and their face is covered in fine water droplets. The background is a deep black shadow, making only the face visible and causing the profile to look sharp and defined. Shot with a 35mm lens, 4K HD quality.",
    name: 'B&W Water Droplets',
    category: 'Portrait'
  },
  {
    id: 8,
    imageUrl: 'https://picsum.photos/seed/HollywoodGlamour/300/300',
    prompt: "A 1920s Hollywood glamour style portrait in high-contrast black and white. The subject is at a 3/4 angle, with their gaze slightly away from the camera. The lighting is a studio spot effect, creating a chiaroscuro look with strong highlights on one side and deep shadows on the other. The mood is timeless, elegant, and dramatic, with a finish that has a silver gelatin print appearance.",
    name: 'Hollywood Glamour',
    category: 'Portrait'
  },
  {
    id: 9,
    imageUrl: 'https://picsum.photos/seed/NeonRainPortrait/300/300',
    prompt: "A hyper-detailed and realistic portrait of a person with fair skin and dark hair, looking directly at the camera with a serious expression. Their face is wet with realistic water droplets. The environment's lighting is dark, and their face is illuminated with a combination of red and blue lights, creating a dramatic, moist, and emotional atmosphere. Photorealistic with a shallow depth of field, sharp focus, and 8K resolution.",
    name: 'Neon Rain Portrait',
    category: 'Portrait'
  },
   {
    id: 13,
    imageUrl: 'https://picsum.photos/seed/MysteriousShadow/300/300',
    prompt: "Create a moody, mysterious portrait using warm golden-hour sunlight to cast a dramatic shadow of the subject's profile on a plain wall. The subject's hairstyle should be medium-length and slightly wavy. The skin is smooth and fair, and the expression is calm and introspective. Ensure the shadow on the wall is a strong, defining feature of the composition.",
    name: 'Mysterious Shadow',
    category: 'Portrait'
  },
  {
    id: 19,
    imageUrl: 'https://picsum.photos/seed/WaterEmerge/300/300',
    prompt: "Generate a black and white closeup portrait showing just one side of the subject's face emerging from dark water. Their skin and hair should be wet, with visible water droplets. Use dramatic lighting to highlight the illuminated side while leaving the other in deep shadow. Emphasize skin texture, beard stubble (if applicable), and sharp eye detail. The mood is intense and cinematic against a minimal background.",
    name: 'Emerging From Water',
    category: 'Portrait'
  },
  {
    id: 47,
    imageUrl: 'https://picsum.photos/seed/MinimalistBW/300/300',
    prompt: 'A minimalist black and white studio portrait with high contrast. The lighting is dramatic, creating strong highlights on one side of the face while the other remains in shadow (chiaroscuro). The background is pure black, focusing all attention on the subject\'s form and expression. The mood is timeless and elegant.',
    name: 'Minimalist B&W',
    category: 'Portrait',
  },

  // == Cinematic Styles ==
  {
    id: 2,
    imageUrl: 'https://picsum.photos/seed/CinematicMotionBlur/300/300',
    prompt: "A cinematic overhead shot of me standing still on a brick city sidewalk. A motion-blurred crowd rushes past, creating a sense of isolation in a busy environment. The lighting is moody, shot with a 35mm film look, shallow depth of field, and sharp focus on me.",
    name: 'Cinematic Motion Blur',
    category: 'Cinematic'
  },
  {
    id: 6,
    imageUrl: 'https://picsum.photos/seed/VintagePaparazzi/300/300',
    prompt: "A cinematic, vintage-toned photo where the subject stands confidently, smiling, while surrounded by an enthusiastic crowd holding smartphones and cameras, creating a celebrity paparazzi moment. The style reflects 1960s-1970s aesthetics with rich, warm sepia tones and dramatic soft lighting. Capture a candid, high-fashion moment in editorial quality.",
    name: 'Vintage Paparazzi',
    category: 'Cinematic'
  },
  {
    id: 7,
    imageUrl: 'https://picsum.photos/seed/PreStormRooftop/300/300',
    prompt: "A cinematic wide-angle portrait of a person standing on a rooftop under a cloudy, pre-storm sky. A light breeze gently moves their clothing. The camera is at a low angle, capturing the vast open sky behind them. The style is realistic with soft desaturation and warm-gray tones, creating a sense of calm before the storm.",
    name: 'Pre-Storm Rooftop',
    category: 'Cinematic'
  },
   {
    id: 14,
    imageUrl: 'https://picsum.photos/seed/HeistMovie/300/300',
    prompt: "A cinematic shot of me holding a mask that covers half of my face, giving a badass, action-hero look. I'm wearing a red outfit reminiscent of the 'Money Heist' series. In the background, a crowd is running in fear. The scene has moody lighting, a 35mm film look, shallow depth of field, and sharp focus on me.",
    name: 'Heist Movie',
    category: 'Cinematic'
  },
   {
    id: 48,
    imageUrl: 'https://picsum.photos/seed/JungleTemple/300/300',
    prompt: 'An ancient temple ruin deep within a lush jungle, overgrown with vines and moss. Cinematic lighting streams through the canopy, illuminating mysterious carvings and crumbling stone structures. The atmosphere is adventurous and enigmatic, like a scene from an exploration movie.',
    name: 'Jungle Temple',
    category: 'Cinematic',
  },
  {
    id: 49,
    imageUrl: 'https://picsum.photos/seed/FilmNoir/300/300',
    prompt: 'A black and white film noir cinematic scene. A detective figure stands in a dimly lit, rain-slicked alleyway. The lighting is high-contrast with deep shadows, characteristic of the noir style. The mood is mysterious and suspenseful, with a vintage film grain.',
    name: 'Film Noir',
    category: 'Cinematic',
  },
  {
    id: 50,
    imageUrl: 'https://picsum.photos/seed/VintageCar/300/300',
    prompt: 'A classic vintage car from the 1950s is parked on a charming European cobblestone street at dusk. The warm glow from streetlights reflects off its polished surface. The scene has a nostalgic and romantic cinematic quality, with soft focus on the background.',
    name: 'Vintage Car',
    category: 'Cinematic',
  },
  
  // == Fashion Styles ==
  {
    id: 10,
    imageUrl: 'https://picsum.photos/seed/BoldRedFashion/300/300',
    prompt: "A highly stylized fashion portrait. The subject has sharp features and flawless skin, wearing a black t-shirt and black sunglasses, standing confidently against a bold, red gradient background. The lighting is dramatic and cinematic, creating a luxury fashion magazine vibe. Ultra-realistic with high-detail and symmetrical composition.",
    name: 'Bold Red Fashion',
    category: 'Fashion'
  },
  {
    id: 12,
    imageUrl: 'https://picsum.photos/seed/SoakedInRain/300/300',
    prompt: "An editorial fashion shoot of a model standing in heavy rain. They are soaked and expressive, wearing a semi-wet white dress shirt that clings artistically to their form. They look upward with a cinematic, emotional expression. Rain droplets are suspended mid-air, and the lighting has cool blue tones with a soft mist in the background. Ultra-high resolution with shallow depth of field.",
    name: 'Soaked in Rain',
    category: 'Fashion'
  },
  {
    id: 16,
    imageUrl: 'https://picsum.photos/seed/UrbanMotion/300/300',
    prompt: "An editorial fashion photo. The subject stands confidently on a brick city sidewalk, wearing a black oversized blazer and black sunglasses. The surrounding crowd is motion-blurred as they rush past. The lighting is moody and overcast, shot with a 35mm analog film grain effect for a luxury aesthetic.",
    name: 'Urban Motion',
    category: 'Fashion'
  },
  
  // == Creative Styles ==
  {
    id: 5,
    imageUrl: 'https://picsum.photos/seed/GraphicPosterArt/300/300',
    prompt: "A hyper-detailed graphic design poster. A striking black-and-white portrait of a young man is set against a minimalist grey background. One eye is partially obscured by a bold red rectangular overlay. The words 'PAUL SOMENDRA' are repeated vertically on the left in semi-transparent black letters, interspersed with other red graphic elements. The style blends streetwear culture with modern graphic artistry. Photorealistic, with shallow depth of field and 8K detail.",
    name: 'Graphic Poster Art',
    category: 'Creative'
  },
  {
    id: 11,
    imageUrl: 'https://picsum.photos/seed/SpontaneousSelfie/300/300',
    prompt: "An ordinary, unremarkable iPhone selfie with slight motion blur and uneven lighting, as if taken by accident. The angle is awkward and the framing is messy. The main character is me, and a world-famous celebrity (e.g., Cristiano Ronaldo, Taylor Swift) stands next to me, both caught in a casual, imperfect moment. The background is a lively street at night with neon lights. The vibe is of a poorly composed but authentic, spontaneous snapshot.",
    name: 'Spontaneous Selfie',
    category: 'Creative'
  },
  {
    id: 17,
    imageUrl: 'https://picsum.photos/seed/ChibiStickerSet/300/300',
    prompt: "Convert my photo into a set of 12 cute chibi stickers in a 4x4 grid. The stickers should show a variety of expressions like laughing, angry, crying, thinking, sleepy, and winking. The style should be fun, colorful, and exaggerated, perfect for messaging apps.",
    name: 'Chibi Sticker Set',
    category: 'Creative'
  },
  {
    id: 21,
    imageUrl: 'https://picsum.photos/seed/CliffsideExposure/300/300',
    prompt: "A cinematic double exposure portrait. The main image is a silhouette of a man's profile. Inside the silhouette, a dramatic cliffside vista is revealed, with waves crashing below and a lone figure overlooking a stormy sea. The outer portrait is dark and windswept, with sharp contrast, symbolizing emotional reckoning.",
    name: 'Cliffside Exposure',
    category: 'Creative'
  },
   {
    id: 51,
    imageUrl: 'https://picsum.photos/seed/HolographicGlitch/300/300',
    prompt: 'A futuristic portrait with holographic glitch effects. The subject\'s face is partially fragmented into colorful, distorted pixels and scan lines, creating a sense of digital disruption. The background is dark with neon grid lines, enhancing the cyberpunk aesthetic.',
    name: 'Holographic Glitch',
    category: 'Creative',
  },
   {
    id: 52,
    imageUrl: 'https://picsum.photos/seed/TribalTattoo/300/300',
    prompt: 'A powerful black and white portrait where the subject\'s face is adorned with intricate, glowing tribal tattoo patterns. The tattoos should follow the contours of the face, with dramatic lighting that makes them appear to emit a soft light. The mood is mystical and strong.',
    name: 'Tribal Tattoo Art',
    category: 'Creative',
  },

  // == Artistic Styles ==
  {
    id: 53,
    imageUrl: 'https://picsum.photos/seed/PopArt/300/300',
    prompt: 'A vibrant pop art portrait in the style of Andy Warhol. The image should use bold, contrasting colors, a silkscreen effect, and be presented in a grid of four panels, each with a different color scheme. The look should be graphic, iconic, and retro.',
    name: 'Pop Art Portrait',
    category: 'Artistic',
  },
  {
    id: 54,
    imageUrl: 'https://picsum.photos/seed/Watercolor/300/300',
    prompt: 'Transform the image into a serene watercolor painting. The colors should be soft and blended, with visible paper texture and fluid brush strokes. The final result should look like a delicate, hand-painted piece of art with a dreamy, ethereal quality.',
    name: 'Watercolor Painting',
    category: 'Artistic',
  },
  {
    id: 55,
    imageUrl: 'https://picsum.photos/seed/CharcoalSketch/300/300',
    prompt: 'A dramatic charcoal sketch of the subject. The style should emphasize high contrast, with deep blacks and expressive, smudged lines. The background should be a simple textured paper, focusing all attention on the raw, artistic quality of the sketch.',
    name: 'Charcoal Sketch',
    category: 'Artistic',
  },
  {
    id: 56,
    imageUrl: 'https://picsum.photos/seed/Anime/300/300',
    prompt: 'Convert the photo into a vibrant, high-quality anime character portrait. The style should feature large, expressive eyes, dynamic hair, and clean, sharp line art. Use a bright color palette and cel-shading to capture the classic anime aesthetic.',
    name: 'Anime Style',
    category: 'Artistic',
  },
  {
    id: 57,
    imageUrl: 'https://picsum.photos/seed/PixelArt/300/300',
    prompt: 'Recreate the image as a retro 8-bit pixel art scene. The image should be simplified into a grid of colored squares, with a limited color palette, capturing the nostalgic feel of classic video games. Details should be blocky and stylized.',
    name: 'Pixel Art',
    category: 'Artistic',
  },
  {
    id: 58,
    imageUrl: 'https://picsum.photos/seed/Claymation/300/300',
    prompt: 'A charming claymation-style figure of the subject. The character should have a handcrafted look with visible fingerprints and textures, similar to stop-motion animation. The lighting should be soft and playful, set against a simple, colorful backdrop.',
    name: 'Claymation Figure',
    category: 'Artistic',
  },

  // == Fantasy & Sci-Fi ==
  {
    id: 25,
    imageUrl: 'https://picsum.photos/seed/ApocalypticExposure/300/300',
    prompt: "A cinematic double exposure of a person in profile, with a post-apocalyptic cityscape inside their silhouette. The inner scene shows the person walking through a destroyed, burning urban street with buildings in ruins and glowing embers. Moody lighting, warm tones, and an emotional, introspective mood.",
    name: 'Apocalyptic Exposure',
    category: 'Fantasy'
  },
  {
    id: 59,
    imageUrl: 'https://picsum.photos/seed/Steampunk/300/300',
    prompt: 'A detailed steampunk-inspired machine with intricate brass gears, copper pipes, and glowing vacuum tubes. The design is complex and functional, with a vintage, industrial aesthetic. The background is a dimly lit workshop, enhancing the intricate details.',
    name: 'Steampunk Machine',
    category: 'Fantasy',
  },
  {
    id: 60,
    imageUrl: 'https://picsum.photos/seed/CosmicNebula/300/300',
    prompt: 'A breathtaking cosmic nebula with swirling galaxies and vibrant, colorful gases. Stars twinkle in the background, and planets are visible in the distance. The scene is vast, awe-inspiring, and full of cosmic beauty, like a high-resolution space telescope image.',
    name: 'Cosmic Nebula',
    category: 'Fantasy',
  },
  {
    id: 61,
    imageUrl: 'https://picsum.photos/seed/FireAndIce/300/300',
    prompt: 'A fantasy character who embodies the elements of fire and ice. One half of their body is wreathed in flames, the other is covered in frost and icicles. The background is a dramatic landscape split between a volcanic field and a frozen tundra, showcasing their elemental power.',
    name: 'Fire and Ice',
    category: 'Fantasy',
  },

  // == Urban & Street ==
  {
    id: 62,
    imageUrl: 'https://picsum.photos/seed/CyberpunkCity/300/300',
    prompt: 'A neon-drenched cyberpunk city street at night, with flying vehicles, towering holographic advertisements, and a diverse crowd of futuristic inhabitants. The atmosphere is rainy, with reflections glistening on the wet pavement. The style is detailed, vibrant, and atmospheric.',
    name: 'Cyberpunk City',
    category: 'Urban',
  },
  {
    id: 63,
    imageUrl: 'https://picsum.photos/seed/SkaterAction/300/300',
    prompt: 'A dynamic action shot of a skateboarder mid-air in a gritty, urban skatepark covered in graffiti. The motion is frozen, capturing the intensity and skill of the trick. The lighting is harsh afternoon sun, creating strong shadows. The style is energetic and raw.',
    name: 'Skateboarder Action',
    category: 'Urban',
  },

  // == Product Photography ==
  {
    id: 64,
    imageUrl: 'https://picsum.photos/seed/LuxuryWatch/300/300',
    prompt: 'A macro shot of a luxury watch, showcasing the intricate details of the watch face, hands, and metallic finish. The lighting is professional and clean, with soft reflections. The background is a dark, elegant, and slightly out-of-focus texture, making the watch the hero of the shot.',
    name: 'Luxury Watch',
    category: 'Product',
  },
  {
    id: 65,
    imageUrl: 'https://picsum.photos/seed/PerfumeBottle/300/300',
    prompt: 'A professional product shot of a perfume bottle on a reflective surface. The lighting is soft and elegant, highlighting the shape of the bottle and the color of the liquid. The background is a clean, minimalist gradient that complements the product\'s branding. The image is crisp, clean, and luxurious.',
    name: 'Perfume Bottle',
    category: 'Product',
  },
  {
    id: 66,
    imageUrl: 'https://picsum.photos/seed/FoodPhotography/300/300',
    prompt: 'A delicious-looking gourmet burger, shot with professional food photography techniques. The focus is sharp on the juicy patty and fresh ingredients, with cheese melting down the side. The background is a rustic wooden table, and the lighting is warm and inviting. The image is vibrant and appetizing.',
    name: 'Gourmet Burger',
    category: 'Product',
  }
];
