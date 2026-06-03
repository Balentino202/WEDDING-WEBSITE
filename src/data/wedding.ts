/**
 * Single source of truth for all wedding content.
 * Edit values here to update the whole site — components read from this file.
 */

export const couple = {
  brideFirstName: 'Purity',
  groomFirstName: 'Isaiah',
  brideFullName: 'Purity Chidimma',
  groomFullName: 'Isaiah Adejor',
  hashtag: '#SongsOfSong2026',
  tagline: 'Songs of Song 2026',
  // The white-wedding day is used for the headline date + countdown.
  // Format: YYYY-MM-DDTHH:mm:ss (local time)
  weddingDateISO: '2026-07-08T09:00:00',
  weddingDateLabel: 'July 8, 2026',
  location: 'Nnewi, Anambra State · Nigeria',
}

export const story = {
  heading: 'Our Story',
  subheading: 'How We Met',
  paragraphs: [
    'By the leading and arrangement of the Holy Spirit, we met at Revival Hub International Headquarters — total strangers at first.',
    'What began as a chance encounter between two people serving the same God soon became a story written in heaven. Through prayer, fellowship and spiritual confirmation, friendship grew into a covenant, and a covenant into a calling.',
    'Today we stand together, convinced that the One who brought us together will keep us together — for His glory and for a lifetime of love.',
  ],
}

export interface TimelineEvent {
  year: string
  title: string
  text: string
}

export const storyTimeline: TimelineEvent[] = [
  {
    year: 'The Meeting',
    title: 'Strangers at Revival Hub',
    text: 'We crossed paths at Revival Hub International Headquarters — two strangers united by one faith.',
  },
  {
    year: 'The Friendship',
    title: 'Fellowship & Growth',
    text: 'Shared purpose turned into a deep friendship rooted in prayer, ministry and mutual respect.',
  },
  {
    year: 'The Confirmation',
    title: "God's Leading",
    text: 'Through spiritual confirmation we knew our paths were meant to become one.',
  },
  {
    year: 'The Proposal',
    title: 'A Covenant Begins',
    text: 'A promise was made — to walk together, in love and in Christ, for the rest of our days.',
  },
  {
    year: 'July 2026',
    title: 'Forever Begins',
    text: 'We say "I do" and begin a Kingdom-driven marriage built on the Word of God.',
  },
]

export interface Person {
  name: string
  role: string
  state: string
  dob: string
  education: string
  roles: string[]
  likes: string[]
  photo: string
  facebookUrl: string
}

export const bride: Person = {
  name: 'Purity Chidimma',
  role: 'The Bride',
  state: 'Anambra State, Nigeria',
  dob: 'June 4th',
  education: 'B.Sc. Human Physiology — Chukwuemeka Odumegwu Ojukwu University',
  roles: ['Educator', 'Teacher', 'Minister', 'Discipler', 'Web Developer'],
  likes: [
    'Singing',
    'Quiet environments',
    'Loved ones',
    'Nature',
    'Chocolate',
    'Honesty & sincerity',
    'Commitment',
    'Music',
    'God',
    'Learning & tech',
    'Yam and egg sauce',
  ],
  photo: './gallery/bride-1.jpg',
  facebookUrl: 'https://www.facebook.com/',
}

export const groom: Person = {
  name: 'Isaiah Adejor',
  role: 'The Groom',
  state: 'Kogi State, Nigeria',
  dob: 'May 5th',
  education: 'B.Eng. Computer Engineering — Nnamdi Azikiwe University',
  roles: [
    'Lead Pastor — House of Delight International Church',
    'Cloud Engineer — Maizehost',
  ],
  likes: [
    'Studying',
    'Peaceful environments',
    'Family',
    'Truthful personalities',
    'Sincerity & humility',
    'Teachable spirits',
    'Respectfulness',
    'Well-prepared meals',
  ],
  photo: './gallery/groom-1.jpg',
  facebookUrl: 'https://www.facebook.com/',
}

export interface Goal {
  icon: string
  title: string
  text: string
}

export const maritalGoals: Goal[] = [
  {
    icon: '✝',
    title: 'A God-Centered Home',
    text: "To establish a home firmly centered on the Word of God in everything we do.",
  },
  {
    icon: '❤',
    title: 'Love, Peace & Unity',
    text: 'To foster genuine love, lasting peace and unbreakable unity in our marriage.',
  },
  {
    icon: '👨‍👩‍👧',
    title: 'Raising Godly Children',
    text: 'To raise children who know, love and serve God all the days of their lives.',
  },
  {
    icon: '🌍',
    title: 'The Great Commission',
    text: "To spread the message of Christ to the ends of the earth, together.",
  },
]

export interface WeddingEvent {
  name: string
  date: string
  time: string
  venue: string
  address: string
  mapQuery: string
  // Start/end used for the Add-to-Calendar buttons (local time, WAT).
  startISO: string
  endISO: string
}

export const weddingEvents: WeddingEvent[] = [
  {
    name: 'Traditional Ceremony',
    date: 'July 10, 2026',
    time: '10:00 AM',
    venue: "Bride's Family Home",
    address: 'Iruabor, Nkwelle Awkuzu, Anambra State',
    mapQuery: 'Nkwelle Awkuzu, Anambra, Nigeria',
    startISO: '2026-07-10T10:00:00',
    endISO: '2026-07-10T14:00:00',
  },
  {
    name: 'White Wedding',
    date: 'July 11, 2026',
    time: '9:00 AM',
    venue: 'Revival Hub International HQ',
    address: 'Nnewi, Anambra State',
    mapQuery: 'Nnewi, Anambra, Nigeria',
    startISO: '2026-07-11T09:00:00',
    endISO: '2026-07-11T12:00:00',
  },
  {
    name: 'Reception',
    date: 'July 11, 2026',
    time: '1:00 PM',
    venue: 'Revival Hub Main Hall',
    address: 'Nnewi, Anambra State',
    mapQuery: 'Nnewi, Anambra, Nigeria',
    startISO: '2026-07-11T13:00:00',
    endISO: '2026-07-11T18:00:00',
  },
]

export interface ProgramItem {
  time: string
  title: string
  icon: string
}

export const program: ProgramItem[] = [
  { time: '9:00 AM', title: 'Guest Arrival', icon: '🚪' },
  { time: '10:00 AM', title: 'Wedding Ceremony', icon: '💍' },
  { time: '1:00 PM', title: 'Reception', icon: '🍽' },
  { time: '4:00 PM', title: 'Celebration & Dancing', icon: '🎉' },
]

export interface BankAccount {
  bank: string
  accountName: string
  accountNumber: string
}

export const gifts = {
  intro:
    'Your presence is the greatest gift of all. Should you wish to bless us further, you may do so through the details below.',
  accounts: [
    {
      bank: 'First Bank',
      accountName: 'Udemezue Chidimma Purity',
      accountNumber: '3143617739',
    },
    {
      bank: 'GTBank',
      accountName: 'Adejor Isaiah',
      accountNumber: '0112160189',
    },
  ] as BankAccount[],
  phone: '07049982267',
}

export interface GalleryImage {
  src: string
  alt: string
  category: 'bride' | 'groom'
}

// The couple's real photos, served from /public/gallery.
export const gallery: GalleryImage[] = [
  { src: './gallery/bride-1.jpg', alt: 'Purity — studio portrait', category: 'bride' },
  { src: './gallery/groom-1.jpg', alt: 'Isaiah — studio portrait', category: 'groom' },
  { src: './gallery/bride-2.jpg', alt: 'Purity smiling', category: 'bride' },
  { src: './gallery/groom-2.jpg', alt: 'Isaiah smiling', category: 'groom' },
  { src: './gallery/bride-3.jpg', alt: 'Purity in blue lace', category: 'bride' },
  { src: './gallery/groom-3.jpg', alt: 'Isaiah in a blue suit', category: 'groom' },
  { src: './gallery/bride-4.jpg', alt: 'Purity in blue lace', category: 'bride' },
  { src: './gallery/groom-4.jpg', alt: 'Isaiah in white attire', category: 'groom' },
  { src: './gallery/bride-5.jpg', alt: 'Purity — side portrait', category: 'bride' },
  { src: './gallery/groom-5.jpg', alt: 'Isaiah — casual', category: 'groom' },
  { src: './gallery/bride-6.jpg', alt: 'Purity', category: 'bride' },
  { src: './gallery/groom-6.jpg', alt: 'Isaiah — casual', category: 'groom' },
  { src: './gallery/bride-7.jpg', alt: 'Purity', category: 'bride' },
]

/* ============================================================
   FAQ — common guest questions
   ============================================================ */
export interface Faq {
  q: string
  a: string
}

export const faqs: Faq[] = [
  {
    q: 'What is the dress code?',
    a: 'Formal / smart attire in keeping with the colours of the day. We would love to see everyone looking elegant — modest and classy.',
  },
  {
    q: 'What are the colours of the day (Aso-Ebi)?',
    a: 'Our colours are Champagne Gold, Ivory and Burgundy. Feel free to incorporate them into your outfit.',
  },
  {
    q: 'Can I bring my children?',
    a: 'We love your little ones! Children are welcome at the ceremony and reception. Please indicate them in your guest count when you RSVP.',
  },
  {
    q: 'What time should I arrive?',
    a: 'Please arrive at least 30 minutes before each event begins so you can be seated comfortably before proceedings start.',
  },
  {
    q: 'Will there be parking?',
    a: 'Yes, parking will be available near each venue with attendants on hand to direct you.',
  },
  {
    q: 'Can I take photos?',
    a: 'Absolutely — we would love that! We kindly ask that you keep aisles clear during the ceremony so our photographers can capture every moment. Share yours with #SongsOfSong2026.',
  },
  {
    q: 'What about gifts?',
    a: 'Your presence is our greatest gift. If you wish to bless us further, please see the Gifts section for bank details.',
  },
]

/* ============================================================
   Colours of the day (Aso-Ebi swatches)
   ============================================================ */
export interface ColourSwatch {
  name: string
  hex: string
}

export const colourOfTheDay: ColourSwatch[] = [
  { name: 'Champagne Gold', hex: '#bfa05a' },
  { name: 'Ivory', hex: '#f3ebdc' },
  { name: 'Burgundy', hex: '#6e1423' },
]

/* ============================================================
   Accommodation & travel
   ============================================================ */
export interface Hotel {
  name: string
  area: string
  distance: string
  priceTier: string
  phone?: string
  mapQuery: string
}

export const travelIntro =
  'Travelling in for the celebration? Here are a few suggested places to stay around Nnewi and Awka. Please book early, as July is a busy season.'

export const hotels: Hotel[] = [
  {
    name: 'Comfort Suites',
    area: 'Nnewi (near Revival Hub HQ)',
    distance: '~5 min to venue',
    priceTier: '₦₦ · Mid-range',
    phone: '0800 000 0001',
    mapQuery: 'hotels in Nnewi, Anambra, Nigeria',
  },
  {
    name: 'Grace Court Hotel',
    area: 'Nnewi Central',
    distance: '~10 min to venue',
    priceTier: '₦₦₦ · Premium',
    phone: '0800 000 0002',
    mapQuery: 'hotels in Nnewi central, Anambra, Nigeria',
  },
  {
    name: 'Awka Budget Lodge',
    area: 'Awka',
    distance: '~40 min to venue',
    priceTier: '₦ · Budget',
    phone: '0800 000 0003',
    mapQuery: 'hotels in Awka, Anambra, Nigeria',
  },
]

/* ============================================================
   RSVP backend configuration
   ------------------------------------------------------------
   Paste your Formspree endpoint here to receive RSVP emails, e.g.
   'https://formspree.io/f/abcdwxyz'. Create a free form at
   https://formspree.io. While this is empty, RSVPs are saved to the
   browser's localStorage as a fallback so nothing is lost.
   ============================================================ */
export const rsvpEndpoint = ''

// Full list of sections — used by the footer (and scroll-spy).
export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'story', label: 'Our Story' },
  { id: 'couple', label: 'Bride & Groom' },
  { id: 'goals', label: 'Our Goals' },
  { id: 'details', label: 'Details' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'program', label: 'Program' },
  { id: 'travel', label: 'Travel' },
  { id: 'faq', label: 'FAQ' },
  { id: 'guestbook', label: 'Guestbook' },
  { id: 'gifts', label: 'Gifts' },
  { id: 'rsvp', label: 'RSVP' },
]

// Curated subset shown in the top navbar so it stays a clean single row.
// Every other section is still reachable by scrolling and from the footer.
export const headerLinks = [
  { id: 'home', label: 'Home' },
  { id: 'story', label: 'Our Story' },
  { id: 'couple', label: 'Bride & Groom' },
  { id: 'details', label: 'Details' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'gifts', label: 'Gifts' },
  { id: 'rsvp', label: 'RSVP' },
]
