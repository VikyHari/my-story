import type { LoveStoryConfig } from "@/types";

/**
 * ============================================================
 *  OUR LITTLE UNIVERSE — PERSONALIZATION FILE
 * ============================================================
 * Everything you need to change to make this website yours
 * lives in this one file. You should never need to touch a
 * component to personalize the experience — just edit the
 * values below.
 *
 * Replace every [BRACKETED_PLACEHOLDER] with your own words.
 * See the README for a full guide (photos, music, colors...).
 * ============================================================
 */
export const loveStory: LoveStoryConfig = {
  myName: "Viky",
  herName: "Dheekshy",

  // Format: YYYY-MM-DD
  relationshipStartDate: "2022-05-30",
  anniversaryDate: "2022 - june",
  herBirthday: "2005-05-22",

  favoriteColor: "#e8748f",
  favoriteSong: "Po indru neeyaga — ANI",

  // Powers the real map in the Love Meter's "∞" zoom-out sequence.
  // Replace with coordinates that mean something to you two (where you met,
  // your city, home). Find coordinates by right-clicking a spot on
  // https://www.openstreetmap.org or Google Maps and copying the lat/lng.
  mapLocation: {
    label: "Where our story began",
    lat: 13.0827,
    lng: 80.2707,
  },

  introLines: [
    "Hey you...",
    "I made something for you.",
    "Just stay with me for a few minutes ❤️",
  ],

  // ---------------------------------------------------------
  // CHAPTER: "Do you remember?"
  // ---------------------------------------------------------
  rememberQuestions: [
    {
      id: "r1",
      question: "Do you remember the first time we talked?",
      options: [
        { label: "YES", emoji: "❤️", response: "See? I knew you remembered 😌❤️" },
        { label: "NO", emoji: "😭", response: "Okay... clearly I need to improve my storytelling skills 😂" },
        { label: "MAYBE", emoji: "🤭", response: "Suspicious answer detected 👀" },
      ],
    },
    {
      id: "r2",
      question: "Do you remember our first proper conversation?",
      options: [
        { label: "YES", emoji: "❤️", response: "I remember every word. Okay, almost every word 😌" },
        { label: "NO", emoji: "😭", response: "Fair. I barely remember what I said either 😂" },
        { label: "MAYBE", emoji: "🤭", response: "That's a very political answer 👀" },
      ],
    },
    {
      id: "r3",
      question: "Do you remember our first photo together?",
      options: [
        { label: "YES", emoji: "❤️", response: "It's still one of my favorites 🥹" },
        { label: "NO", emoji: "😭", response: "We'll have to take a better one then 📸" },
        { label: "MAYBE", emoji: "🤭", response: "I'll take that as a soft yes 👀" },
      ],
    },
    {
      id: "r4",
      question: "Do you remember the moment I realized I really liked you?",
      options: [
        { label: "YES", emoji: "❤️", response: "Took me long enough to admit it, huh 😅" },
        { label: "NO", emoji: "😭", response: "Good — that story is for another chapter 👀" },
        { label: "MAYBE", emoji: "🤭", response: "Close enough. I'll tell you the real version later." },
      ],
    },
    {
      id: "r5",
      question: "Do you remember our funniest fight?",
      options: [
        { label: "YES", emoji: "❤️", response: "We were both so wrong and so dramatic about it 😂" },
        { label: "NO", emoji: "😭", response: "Honestly? Lucky you." },
        { label: "MAYBE", emoji: "🤭", response: "Selective memory. Respect." },
      ],
    },
    {
      id: "r6",
      question: "Do you remember our cutest moment?",
      options: [
        { label: "YES", emoji: "❤️", response: "It's permanently saved in my head 🎞️" },
        { label: "NO", emoji: "😭", response: "There have been too many to count, to be fair." },
        { label: "MAYBE", emoji: "🤭", response: "I'll allow it." },
      ],
    },
  ],

  // ---------------------------------------------------------
  // CHAPTER: Playful yes/no questions
  // ---------------------------------------------------------
  playfulQuestions: [
    {
      id: "p1",
      question: "Do you love me?",
      yesResponse: "Good answer. That's the correct answer ❤️",
      noEscalation: {
        prompts: ["Are you absolutely sure? 🥺", "Really really sure?", "Think again..."],
        finalLabel: "Okay fine, YES ❤️",
        finalResponse: "That's what I thought 😌",
      },
    },
    {
      id: "p2",
      question: "Do I make you smile?",
      yesResponse: "Mission accomplished, every single time 😊",
      noEscalation: {
        prompts: ["Not even a little? 🥺", "Not even my terrible jokes?", "Last chance..."],
        finalLabel: "Okay, sometimes ❤️",
        finalResponse: "I'll take 'sometimes' and turn it into 'always' 😌",
      },
    },
    {
      id: "p3",
      question: "Do you miss me when I'm not around?",
      yesResponse: "Good. Same here, constantly 🥹",
      noEscalation: {
        prompts: ["Not even a tiny bit? 🥺", "Not even on boring days?", "Hmm, suspicious..."],
        finalLabel: "A tiny bit, maybe ❤️",
        finalResponse: "I'll take it 😌",
      },
    },
    {
      id: "p4",
      question: "Am I your favorite person?",
      yesResponse: "Correct. Glad we agree 😌❤️",
      noEscalation: {
        prompts: ["Wait, who's higher on the list?! 😭", "I need a name.", "...I'm listening."],
        finalLabel: "Fine, top 3 ❤️",
        finalResponse: "I'll fight for the #1 spot 😤❤️",
      },
    },
    {
      id: "p5",
      question: "Will you tolerate my nonsense forever?",
      yesResponse: "Brave. I respect that ❤️",
      noEscalation: {
        prompts: ["Even the good nonsense? 🥺", "The charming kind?", "C'mon..."],
        finalLabel: "Okay, forever ❤️",
        finalResponse: "Locking that in 😌",
      },
    },
    {
      id: "p6",
      question: "Will you go on more adventures with me?",
      yesResponse: "Pack your bags, the list is long 🌍❤️",
      noEscalation: {
        prompts: ["Not even small ones? 🥺", "Not even snack adventures?", "Reconsider..."],
        finalLabel: "Fine, adventures it is ❤️",
        finalResponse: "Best answer ✈️😌",
      },
    },
    {
      id: "p7",
      question: "Will you grow old with me?",
      yesResponse: "That's all I really wanted to hear 🥹❤️",
      noEscalation: {
        prompts: ["Wait, really think about it 🥺", "We'll have matching rocking chairs.", "Last try..."],
        finalLabel: "Okay, yes ❤️",
        finalResponse: "Best decision you'll make today 😌",
      },
    },
  ],

  // ---------------------------------------------------------
  // CHAPTER: Memory Lane
  // ---------------------------------------------------------
  memories: [
    {
      id: "m1",
      date: "the first bike ride",
      title: "The Beginning",
      category: "first-meeting",
      description: "The day our paths crossed for the very first time — I didn't know yet how much you'd change everything.",
      emoji: "🌱",
    },
    {
      id: "m2",
      date: "After your birthday",
      title: "First Real Conversation",
      category: "first-conversation",
      description: "We talked for way longer than either of us expected. I remember not wanting it to end.",
      emoji: "💬",
    },
    {
      id: "m3",
      date: "In Room",
      title: "Our First Date",
      category: "first-date",
      description: "I was more nervous than I let on. You made it easy anyway.",
      emoji: "☕",
    },
    {
      id: "m4",
      date: "In cafe First proper pic",
      title: "That First Photo",
      category: "first-photo",
      description: "That smile... I still remember taking this. One of my favorite days.",
      emoji: "📸",
    },
    {
      id: "m5",
      date: "Unga appa chinna veedu iruku ",
      title: "The Time We Couldn't Stop Laughing",
      category: "funny",
      description: "In my home — I still laugh thinking about it.",
      emoji: "😂",
    },
    {
      id: "m6",
      date: "First pondy trip",
      title: "Our Best Trip",
      category: "trip",
      description: "Somewhere far from home, but it felt exactly like home because you were there.",
      emoji: "🌄",
    },
    {
      id: "m7",
      date: "First bike ride ne ooti na ukandhutu irundhan",
      title: "My Favorite Memory",
      category: "favorite",
      description: "If I could relive one day on repeat, it would probably be this one.",
      emoji: "✨",
    },
    {
      id: "m8",
      date: "In messages",
      title: "A Hard Moment, Together",
      category: "difficult",
      description: "It wasn't easy, but we got through it side by side. That mattered more than I said at the time.",
      emoji: "🌧️",
    },
    {
      id: "m9",
      date: "You got negative in pregnancy test",
      title: "Something Worth Celebrating",
      category: "achievement",
      description: "You worked so hard for this, and I got to watch it happen. I was so proud of you.",
      emoji: "🏆",
    },
    {
      id: "m10",
      date: "Puma Shoe gift",
      title: "Recently...",
      category: "recent",
      description: "A small, ordinary moment that I didn't want to forget.",
      emoji: "🕯️",
    },
  ],

  // ---------------------------------------------------------
  // Photo Gallery (replace src with real image paths, e.g. /photos/us-01.jpg)
  // ---------------------------------------------------------
  photos: [
    { id: "ph1", src: "", caption: "That smile...", rotation: -4 },
    { id: "ph2", src: "", caption: "One of my favorite days.", rotation: 3 },
    { id: "ph3", src: "", caption: "I still remember this moment.", rotation: -2 },
    { id: "ph4", src: "", caption: "My favorite person ❤️", rotation: 5 },
    { id: "ph5", src: "", caption: "We look ridiculous here and I love it.", rotation: -5 },
    { id: "ph6", src: "", caption: "This one lives in my head rent-free.", rotation: 2 },
  ],

  // ---------------------------------------------------------
  // CHAPTER: Things I love about you (constellation) — 20+
  // ---------------------------------------------------------
  reasonsILoveYou: [
    { id: "l1", title: "Your smile", message: "It's genuinely my favorite thing in the world. No contest." },
    { id: "l2", title: "Your laugh", message: "Loud, unfiltered, and somehow always makes me laugh too." },
    { id: "l3", title: "Your kindness", message: "You're kind even when no one's watching. That's rare." },
    { id: "l4", title: "Your patience", message: "Especially with me. Especially on my worst days." },
    { id: "l5", title: "Your craziness", message: "You make ordinary moments feel like an adventure." },
    { id: "l6", title: "Your voice", message: "I could listen to you talk about nothing for hours." },
    { id: "l7", title: "Your eyes", message: "They give away exactly how you're feeling, and I love that." },
    { id: "l8", title: "The way you care", message: "For me, for people you love, even for strangers. It's who you are." },
    { id: "l9", title: "The way you support me", message: "You believe in me even when I don't believe in myself." },
    { id: "l10", title: "The little things you do", message: "The small, quiet things you probably don't even notice you do." },
    { id: "l11", title: "Your curiosity", message: "You ask questions like you actually want to know the answer. You do." },
    { id: "l12", title: "Your stubbornness", message: "Infuriating sometimes. Also one of your best qualities." },
    { id: "l13", title: "Your hugs", message: "You give the kind that actually make things feel okay." },
    { id: "l14", title: "Your handwriting", message: "I don't know why, but I love it." },
    { id: "l15", title: "How you remember details", message: "Small things I mentioned once. You remembered anyway." },
    { id: "l16", title: "Your honesty", message: "Even when it's hard to say. Especially then." },
    { id: "l17", title: "The way you dance badly", message: "With zero shame. It's one of my favorite things to watch." },
    { id: "l18", title: "Your ambition", message: "Watching you chase what you want is genuinely inspiring." },
    { id: "l19", title: "Your comfort food order", message: "Iconic. Never changes. Deeply reliable." },
    { id: "l20", title: "The way you say my name", message: "Different from anyone else. I noticed early on." },
    { id: "l21", title: "Your playlists", message: "They somehow always match the exact mood of the day." },
    { id: "l22", title: "How safe you make me feel", message: "Like I can just be myself, no performance required." },
  ],

  // ---------------------------------------------------------
  // CHAPTER: I'm sorry
  // ---------------------------------------------------------
  apologies: [
    {
      id: "a1",
      title: "For the times I didn't listen",
      whatHappened: "I'm sorry for the times I didn't fully understand what you were feeling.",
      whatIShouldHaveDone: "I should have listened instead of immediately trying to explain myself.",
      whatILearned: "That being right matters so much less than making you feel heard.",
      whatIWillDo: "I'll slow down and actually listen before I speak.",
    },
    {
      id: "a2",
      title: "For being distracted",
      whatHappened: "I'm sorry for the moments I was physically there but not really present.",
      whatIShouldHaveDone: "I should have put things down and given you my full attention.",
      whatILearned: "The time I give you is worth more than anything I was distracted by.",
      whatIWillDo: "I'll make sure you never have to compete for my attention.",
    },
    {
      id: "a3",
      title: "For Using abuse words",
      whatHappened: "I'm sorry for WHAT HAPPENED.",
      whatIShouldHaveDone: "I should have control my words.",
      whatILearned: "It hurts you so much",
      whatIWillDo: "i will not repeat the same thing hereafter.",
    },
  ],

  // ---------------------------------------------------------
  // CHAPTER: Love letter
  // ---------------------------------------------------------
  letter: [
    { text: "My Love,," },
    { text: "I don't say this enough, so I wanted to write it down where it can't be forgotten." },
    { text: "You make ordinary days feel like something worth remembering. You make me want to be a better person, not because you ask me to, but because of how you see me." },
    { text: "I think about the little things most — the way you laugh at your own jokes before you finish telling them, the way you always save me the last bite, the way you somehow know when something's wrong before I've said a word." },
    { text: "Thank you for your patience. Thank you for staying, even on the days I made it hard. Thank you for being exactly who you are." },
    { text: "I don't know everything about what's coming next for us, but I know I want you there for whatever it is." },
    { text: "Forever yours," },
    { text: "Viky ❤️" },
  ],

  // ---------------------------------------------------------
  // Random love button — 50 messages
  // ---------------------------------------------------------
  loveMessages: [
    "You are loved.",
    "You are important to me.",
    "I am lucky to have you.",
    "Your smile is still one of my favorite things.",
    "Don't forget how special you are.",
    "I choose you.",
    "You make ordinary days better.",
    "Come here, virtual hug 🤗",
    "You're doing better than you think.",
    "I'm proud of you.",
    "You make it easy to love you.",
    "I like who I am when I'm with you.",
    "You're my favorite notification.",
    "I'd choose our story again, every time.",
    "You're stuck with me now.",
    "You are enough, exactly as you are.",
    "I love the way you see the world.",
    "You're my favorite person to do nothing with.",
    "I hope you know how much you matter.",
    "You're allowed to rest. I've got you.",
    "You make hard days softer.",
    "I still get excited when I see your name pop up.",
    "You're my favorite hello and my hardest goodbye.",
    "You're doing great, even on the messy days.",
    "I'm always in your corner.",
    "You're the best decision I keep making.",
    "You deserve every good thing coming your way.",
    "I love your weird 3am thoughts.",
    "Thank you for being you.",
    "You're my favorite place.",
    "I'd pick your side of the story every time.",
    "You're braver than you give yourself credit for.",
    "You make me laugh more than anyone.",
    "I love our inside jokes.",
    "You're worth every bit of effort.",
    "I love watching you get excited about things.",
    "You're my calm.",
    "I never get tired of your voice.",
    "You're my favorite kind of chaos.",
    "I'm grateful for you today, like every day.",
    "You make small moments feel big.",
    "You're the softest place I know.",
    "I like you on your bad days too.",
    "You are so deeply loved, it's kind of ridiculous.",
    "I'll never get tired of choosing you.",
    "You're my favorite plan and my favorite surprise.",
    "You're doing better than you think you are.",
    "Being loved by you changed me for the better.",
    "You're my home, wherever we are.",
    "I love you today, tomorrow, and every ordinary day in between.",
    "Okay, that's enough — go smile at something now 😊",
  ],

  // ---------------------------------------------------------
  // CHAPTER: Our Future
  // ---------------------------------------------------------
  futurePlans: [
    { id: "f1", title: "Travel together", description: "New places, bad maps, great memories.", icon: "globe" },
    { id: "f2", title: "Build our home", description: "Somewhere that feels like the two of us.", icon: "home" },
    { id: "f3", title: "Cook together", description: "Even if half of it ends up slightly burnt.", icon: "cooking" },
    { id: "f4", title: "Maybe get a pet", description: "A tiny chaotic addition to the family.", icon: "paw" },
    { id: "f5", title: "Celebrate achievements", description: "Yours, mine, ours — every single one.", icon: "trophy" },
    { id: "f6", title: "Watch sunsets", description: "As many as we can, wherever we are.", icon: "sunset" },
    { id: "f7", title: "Explore new places", description: "Together, at our own pace.", icon: "compass" },
    { id: "f8", title: "Grow together", description: "Through every version of who we become.", icon: "sprout" },
    { id: "f9", title: "Grow old together", description: "Still laughing at the same bad jokes.", icon: "heart-handshake" },
  ],

  // ---------------------------------------------------------
  // Bucket list
  // ---------------------------------------------------------
  bucketList: [
    { id: "b1", label: "Watch sunrise together", emoji: "🌅" },
    { id: "b2", label: "Take a random road trip", emoji: "🚗" },
    { id: "b3", label: "Travel somewhere neither of us has been", emoji: "🧳" },
    { id: "b4", label: "Cook something terrible together 😂", emoji: "🍳" },
    { id: "b5", label: "Take 1,000 photos", emoji: "📸" },
    { id: "b6", label: "Have a movie marathon", emoji: "🎬" },
    { id: "b7", label: "Build our dream home", emoji: "🏡" },
    { id: "b8", label: "Celebrate every little achievement", emoji: "🎉" },
    { id: "b9", label: "Make more memories", emoji: "✨" },
    { id: "b10", label: "Grow old together", emoji: "👴👵" },
  ],

  // ---------------------------------------------------------
  // "If we were..." game
  // ---------------------------------------------------------
  ifWeWere: [
    { id: "i1", prompt: "If we were characters in a movie, who would we be?", myAnswer: "siva manasula sakthi" },
    { id: "i2", prompt: "If we could travel anywhere tomorrow, where would we go?", myAnswer: "swizterland" },
    { id: "i3", prompt: "If we had a pet, what would we name it?", myAnswer: "Zaara" },
    { id: "i4", prompt: "If we could relive one day, which day would you choose?", myAnswer: "Therila neyae solu" },
    { id: "i5", prompt: "If our relationship had a song, what would it be?", myAnswer: "epadiyo matikitan" },
  ],

  specialDates: [
    { id: "sd1", label: "The day we met", date: "June- 2022", emoji: "🌱" },
    { id: "sd2", label: "Our anniversary", date: "2022 - June ", emoji: "💍" },
    { id: "sd3", label: "Her birthday", date: "2005-05-22", emoji: "🎂" },
  ],

  // Add track files under /public/music and reference them here, e.g. "/music/our-song.mp3"
  // Leave empty to gracefully disable the music player.
  musicTracks: [],

  proposalQuestion: "Will you keep making memories with me?",
  finalSignature: "VIKY ❤️ DHEEKSHY",
};

export default loveStory;
