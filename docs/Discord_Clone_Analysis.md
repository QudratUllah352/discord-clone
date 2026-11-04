# Discord Website Clone — Full Analysis

> [!IMPORTANT]
> This document contains every piece of information needed to build a pixel-faithful clone of the Discord homepage (discord.com). Read top-to-bottom before writing any code.

---

## 1. Page Architecture (Top → Bottom)

The page is a **long-scroll, single-page marketing site** with 7 distinct horizontal sections:

```
┌────────────────────────────────┐
│  1. Sticky Navigation Bar      │
├────────────────────────────────┤
│  2. Hero Section               │
├────────────────────────────────┤
│  3. Feature Block 1 (Servers)  │
├────────────────────────────────┤
│  4. Feature Block 2 (Voice)    │
├────────────────────────────────┤
│  5. Feature Block 3 (Community)│
├────────────────────────────────┤
│  6. Download Banner (CTA)      │
├────────────────────────────────┤
│  7. Footer                     │
└────────────────────────────────┘
```

---

## 2. Color System

### Brand & Accent Colors
| Name | Hex | Usage |
|------|-----|-------|
| **Blurple (Primary)** | `#5865F2` | Buttons, links, highlights |
| **Green** | `#57F287` | Success, online status |
| **Yellow** | `#FEE75C` | Warning, idle status |
| **Red** | `#ED4245` | Error, DND status |
| **Fuchsia** | `#EB459E` | Accent gradient stops |
| **Old Blurple** | `#7289DA` | Secondary gradient reference |

### Background & Surface Colors (Dark Theme)
| Name | Hex | Usage |
|------|-----|-------|
| **Primary BG** | `#313338` | Main chat/content area |
| **Secondary BG** | `#2B2D31` | Sidebars, panels |
| **Tertiary BG** | `#1E1F22` | App frame, server list |
| **Border/Divider** | `#3F4147` | Subtle separators |

### Text Colors
| Name | Hex | Usage |
|------|-----|-------|
| **Primary Text** | `#F2F3F5` | Headings, main copy |
| **Secondary Text** | `#B5BAC1` | Subheadings, descriptions |
| **Muted Text** | `#6D6F78` | Timestamps, placeholders |

### Key Gradient (Hero & CTA Sections)
```css
/* Hero Section Background */
background: linear-gradient(135deg, #5865F2 0%, #7289DA 50%, #EB459E 100%);

/* Deep Navy variant (some feature sections) */
background: linear-gradient(to bottom, #1a2081, #2B2D31);
```

---

## 3. Typography

| Property | Value |
|----------|-------|
| **Primary Font** | `gg sans` (Discord proprietary) |
| **Fallback Stack** | `"Noto Sans"`, `"Inter"`, `"Helvetica Neue"`, `Helvetica`, `Arial`, `sans-serif` |
| **Heading Style** | Bold, oversized, uppercase for major hero headings |
| **Body Style** | Regular weight, optimized for screen readability |

```css
:root {
  --font-primary: "gg sans", "Noto Sans", "Inter", "Helvetica Neue", Helvetica, Arial, sans-serif;
}
body {
  font-family: var(--font-primary);
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}
```

> [!TIP]
> Use **Inter** from Google Fonts as the closest free alternative to `gg sans`.

---

## 4. Section-by-Section Breakdown

---

### Section 1 — Navigation Bar (Header)

**Behavior:** Fixed/sticky at top; high-contrast against page background.

> [!IMPORTANT]
> This is the **pre-login homepage navbar** (what any visitor sees on `discord.com` before signing in). It is different from the in-app navbar shown after login.

#### Layout
```
[ Discord Logo ]  [ Nav Links... ]                    [ Login ]
      LEFT               CENTER / LEFT                  RIGHT
```

#### Left — Brand Logo
| Element | Detail |
|---------|--------|
| **Icon** | "Clyde" — white speech-bubble robot SVG icon |
| **Wordmark** | "Discord" text in white next to the icon |
| **Link** | Clicking it scrolls back to the top / `href="/"` |

#### Center — Navigation Links
| # | Link Label | Destination / Purpose |
|---|------------|----------------------|
| 1 | **Download** | App download page — Windows, Mac, Linux, iOS, Android |
| 2 | **Nitro** | Discord Nitro premium subscription page |
| 3 | **Discover** | Public server & community discovery browser |
| 4 | **Quests** | Discord Quests page (gaming tasks/rewards) |
| 5 | **Safety** | Safety Hub — guidelines, resources, trust & safety |
| 6 | **Support** | Help Center — ticket submissions, FAQs |
| 7 | **Blog** | Company blog — updates, patch notes, announcements |
| 8 | **Careers** | Jobs / open positions at Discord Inc. |

#### Right — Action Button
| Element | Style | Label |
|---------|-------|-------|
| **Login Button** | Filled, Blurple `#5865F2`, rounded/pill-shaped | `Login` |

#### Styling Details
| Property | Value |
|----------|-------|
| **Position** | `fixed` / `sticky` — stays at top while scrolling |
| **Background** | Dark semi-transparent or solid `#1E1F22` / `#2B2D31` |
| **Text Color** | White `#F2F3F5` for all links |
| **Hover State** | Links slightly dim/underline on hover |
| **Logo Color** | White (SVG fill `#FFFFFF`) |
| **Login Btn Hover** | Darker blurple `#4752C4` on hover |

#### React Component Sketch
```jsx
// components/Navbar.jsx
const navLinks = [
  { label: 'Download',  href: '/download' },
  { label: 'Nitro',     href: '/nitro' },
  { label: 'Discover',  href: '/servers' },
  { label: 'Quests',    href: '/quests' },
  { label: 'Safety',    href: '/safety' },
  { label: 'Support',   href: 'https://support.discord.com' },
  { label: 'Blog',      href: '/blog' },
  { label: 'Careers',   href: '/jobs' },
];

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-discord-darker flex items-center px-6 py-4">
      {/* Logo */}
      <a href="/" className="flex items-center gap-2 text-white font-bold text-xl">
        <DiscordIcon />
        Discord
      </a>

      {/* Nav Links */}
      <ul className="hidden md:flex gap-6 ml-10">
        {navLinks.map(link => (
          <li key={link.label}>
            <a href={link.href}
               className="text-discord-textNormal hover:text-white transition-colors text-sm font-medium">
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Login CTA */}
      <a href="/login"
         className="ml-auto bg-discord-accent hover:bg-[#4752C4] text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors">
        Login
      </a>
    </nav>
  );
}

---

### Section 2 — Hero Section

**Background:** Deep space blue/royal purple multi-stop gradient  
(`#1a2081` → deep blues → `#5865F2`)

**Text:**
- **Main Heading (H1):**
  > `GROUP CHAT THAT'S ALL FUN & GAMES`  
  *(uppercase, heavy bold, oversized — 72px+ on desktop)*

- **Subheading:**
  > "Discord is great for playing games and chilling with friends, or even building a worldwide community. Customize your own space to talk, play, and hang out in."

**CTA Buttons:**
| Button | Style | Label |
|--------|-------|-------|
| Primary | Filled white/light, pill-shaped | `Download for Windows` |
| Secondary | Ghost/outline or text-link style | `Open Discord in your browser` |

**Visuals:** Layered 3D UI mockups, floating Discord app windows, colorful character illustrations (Wumpus + friends), immersive depth effect.

---

### Section 3 — Feature Block 1: Servers

**Layout:** Asymmetric split — **text left, product screenshot/illustration right**  
**Background:** White or light-contrast background (contrast from hero's dark)

**Heading:**
> `Create an invite-only place where you belong`

**Body Copy:**
> "Discord servers are organized into topic-based channels where you can collaborate, share, and just talk about your day without clogging up a group chat."

**Visual:** Discord server/channel list UI mockup screenshot

---

### Section 4 — Feature Block 2: Voice & Video

**Layout:** Flipped split — **illustration left, text right**  
**Background:** Alternating light or subtle dark gradient

**Heading:**
> `Where hanging out is easy`

**Body Copy:**
> "Grab a seat in a voice channel when you're free. Friends in your server can see you're around and instantly pop in to talk without having to call."

**Visual:** Voice channel UI mockup with active users, avatars, speaking indicators

---

### Section 5 — Feature Block 3: Community & Moderation

**Layout:** Centered heading + multi-column grid or large feature card

**Heading:**
> `From a few to a fandom`

**Body Copy:**
> "Get any community running with moderation tools and custom member access. Give members special powers, set up private channels, and more."

**Visual:** Role/permission UI mockups, member lists, moderation dashboards

---

### Section 6 — Bottom Download CTA Banner

**Background:** Rich gradient (transitions back to deep purple/blue), decorated with Wumpus + character artwork

**Heading:**
> `Your place to talk` *(or similar seasonal/branded copy)*

**Sub-copy:** Encourages both desktop and mobile download

**CTA Buttons:**
| Button | Label |
|--------|-------|
| Primary | `Download for Windows` |
| Secondary | `Open Discord in your browser` |

---

### Section 7 — Footer

**Layout:** Multi-column grid with 4 content columns + social bar + bottom bar

#### Column 1 — Product
- Download
- Nitro
- Status
- App Directory

#### Column 2 — Company
- About
- Jobs
- Brand
- Newsroom

#### Column 3 — Resources
- Support
- Safety
- Blog
- Feedback
- Creators
- Community
- Developers
- Quests
- Official 3rd Party Merch

#### Column 4 — Policies
- Terms
- Privacy
- Cookie Settings
- Guidelines
- Acknowledgements
- Licenses
- Company Information

#### Additional Footer Elements
- **Logo:** Discord wordmark (top-left of footer)
- **Language Selector:** Dropdown (e.g., "English, US ▾")
- **Social Icons:** Twitter/X · Instagram · Facebook · YouTube · TikTok
- **Copyright:** `© 2024 Discord Inc.`
- **Bottom CTA:** `Open Discord` button (Blurple)

---

## 5. UI/UX Patterns

| Pattern | Description |
|---------|-------------|
| **Scroll Layout** | Long vertical single-page, section-by-section |
| **Z/Zig-Zag Layout** | Feature sections alternate image left/right |
| **Dual CTA** | Download + browser option always paired |
| **Responsive** | Adapts from wide desktop to mobile (stacks vertically) |
| **Hover States** | Buttons have subtle scale/color transitions |
| **Micro-animations** | Floating illustrations, subtle parallax effects |
| **OS Detection** | Primary CTA auto-detects OS (Windows/Mac/Linux) |
| **Localization** | Footer language selector for global audiences |

---

## 6. Assets & Imagery

| Asset | Description |
|-------|-------------|
| **Discord Logo (Clyde)** | Speech-bubble robot icon + "Discord" wordmark, white color |
| **Wumpus Mascot** | Lilac/purple blocky character with leaf sprout, used in hero + CTA sections |
| **UI Mockups** | Screenshots of Discord app: channel list, voice channels, member list |
| **3D Illustrations** | Floating characters, game controllers, community art |
| **Social Icons** | X (Twitter), Instagram, Facebook, YouTube, TikTok |

> [!NOTE]
> Official Discord CDN URLs: `assets-global.website-files.com` or `discord.com/assets`. For the clone, use custom-made SVG replicas or royalty-free alternatives for Wumpus.

---

## 7. CSS Variables — Ready to Use

```css
:root {
  /* Brand Colors */
  --blurple: #5865F2;
  --green: #57F287;
  --yellow: #FEE75C;
  --red: #ED4245;
  --fuchsia: #EB459E;
  --old-blurple: #7289DA;

  /* Backgrounds */
  --bg-primary: #313338;
  --bg-secondary: #2B2D31;
  --bg-tertiary: #1E1F22;
  --border: #3F4147;

  /* Text */
  --text-primary: #F2F3F5;
  --text-secondary: #B5BAC1;
  --text-muted: #6D6F78;

  /* Typography */
  --font: "gg sans", "Inter", "Noto Sans", "Helvetica Neue", Arial, sans-serif;

  /* Gradients */
  --hero-gradient: linear-gradient(135deg, #5865F2 0%, #7289DA 50%, #EB459E 100%);
  --dark-gradient: linear-gradient(to bottom, #1a2081, #2B2D31);
}
```

---

## 8. Page Structure Summary (HTML Skeleton)

```html
<body>
  <!-- 1. Navigation -->
  <nav class="navbar sticky">
    <div class="logo"><!-- Clyde + Discord wordmark --></div>
    <ul class="nav-links">
      <li>Download</li><li>Nitro</li><li>Discover</li>
      <li>Safety</li><li>Support</li><li>Blog</li><li>Careers</li>
    </ul>
    <button class="btn-login">Login</button>
  </nav>

  <!-- 2. Hero -->
  <section class="hero">
    <h1>GROUP CHAT THAT'S ALL FUN &amp; GAMES</h1>
    <p>Discord is great for playing games and chilling with friends...</p>
    <button class="btn-primary">Download for Windows</button>
    <a class="btn-secondary">Open Discord in your browser</a>
    <!-- 3D illustrations / mockup images -->
  </section>

  <!-- 3. Feature: Servers -->
  <section class="feature feature--servers">
    <div class="feature__text">
      <h2>Create an invite-only place where you belong</h2>
      <p>Discord servers are organized into topic-based channels...</p>
    </div>
    <div class="feature__image"><!-- UI mockup --></div>
  </section>

  <!-- 4. Feature: Voice -->
  <section class="feature feature--voice feature--reversed">
    <div class="feature__image"><!-- Voice channel mockup --></div>
    <div class="feature__text">
      <h2>Where hanging out is easy</h2>
      <p>Grab a seat in a voice channel when you're free...</p>
    </div>
  </section>

  <!-- 5. Feature: Community -->
  <section class="feature feature--community">
    <h2>From a few to a fandom</h2>
    <p>Get any community running with moderation tools...</p>
    <!-- Feature grid/cards -->
  </section>

  <!-- 6. CTA Banner -->
  <section class="cta-banner">
    <!-- Wumpus art + character illustrations -->
    <h2>Your place to talk</h2>
    <button class="btn-primary">Download for Windows</button>
    <a class="btn-secondary">Open Discord in your browser</a>
  </section>

  <!-- 7. Footer -->
  <footer>
    <div class="footer__logo"><!-- Discord logo --></div>
    <div class="footer__columns">
      <!-- Product | Company | Resources | Policies -->
    </div>
    <div class="footer__bottom">
      <select><!-- Language Selector --></select>
      <div class="footer__socials"><!-- X, IG, FB, YT, TikTok --></div>
    </div>
  </footer>
</body>
```

---

> [!NOTE]
> The current Discord site (2024–2025) uses the **"GROUP CHAT THAT'S ALL FUN & GAMES"** branding (the gaming-focused rebrand), not the older "Imagine a place..." copy.

---

---

# Tech Stack Blueprint — React + Node + Express + MongoDB

> [!IMPORTANT]
> This section covers the complete full-stack architecture for building a functional Discord clone — not just the landing page, but the full app (auth, messaging, servers, real-time chat).

---

## 9. Full-Stack Architecture Overview

```
┌────────────────────────────────────────────────────────────────┐
│                     CLIENT (React + Vite)                      │
│  Landing Page · Login · Register · App Shell · Chat View       │
└────────────────┬───────────────────────────┬───────────────────┘
                 │  HTTP REST (Axios)         │  WebSocket (Socket.IO)
                 ▼                           ▼
┌────────────────────────────────────────────────────────────────┐
│               SERVER (Node.js + Express)                       │
│   Auth · Servers · Channels · Messages · File Upload           │
└────────────────────────────┬───────────────────────────────────┘
                             │  Mongoose ODM
                             ▼
┌────────────────────────────────────────────────────────────────┐
│                   DATABASE (MongoDB)                           │
│   Users · Servers · Channels · Messages                        │
└────────────────────────────────────────────────────────────────┘
                             │
                             ▼  File / Image Uploads
┌────────────────────────────────────────────────────────────────┐
│                   CLOUDINARY (CDN)                             │
│   Avatars · Server Icons · Message Attachments                 │
└────────────────────────────────────────────────────────────────┘
```

**Rule of thumb:**
- **HTTP REST** → Stateless ops (login, fetch history, create server)
- **Socket.IO** → Real-time ops (live chat, typing, online status, voice signaling)

---

## 10. Frontend — React (Vite + Tailwind CSS)

### Tech Choices
| Tool | Purpose |
|------|---------|
| **Vite** | Fast dev server & bundler |
| **React 18** | UI library |
| **React Router v6** | Client-side routing |
| **Tailwind CSS** | Utility-first styling (matches Discord's dark theme perfectly) |
| **Socket.IO Client** | Real-time WebSocket connection |
| **Axios** | HTTP REST API calls |
| **Zustand** | Lightweight global state (auth, servers, messages) |
| **React Query (TanStack)** | Server-state caching & pagination |

### Project Folder Structure
```text
discord-clone/
├── public/                    # Favicon, static assets
├── src/
│   ├── assets/                # Logos, SVGs, images
│   ├── components/
│   │   ├── common/            # Button, Avatar, Tooltip, Dropdown
│   │   ├── modals/            # CreateServer, UserSettings, Invite modals
│   │   └── ui/                # Tailwind primitive wrappers
│   ├── features/
│   │   ├── chat/              # ChatArea, MessageItem, MessageInput
│   │   ├── servers/           # ServerList, ServerIcon
│   │   ├── channels/          # ChannelList, VoiceChannel
│   │   └── members/           # MemberList, MemberItem
│   ├── hooks/
│   │   ├── useAuth.js         # Authentication state
│   │   ├── useChat.js         # Message sending/receiving
│   │   └── useSocket.js       # Socket.IO connection hook
│   ├── layouts/
│   │   └── AppLayout.jsx      # Master 4-panel Discord grid
│   ├── pages/
│   │   ├── LandingPage.jsx    # The marketing homepage (clone target)
│   │   ├── LoginPage.jsx      # Auth screen
│   │   ├── RegisterPage.jsx   # Signup screen
│   │   ├── ServerPage.jsx     # Main Discord app view
│   │   └── NotFoundPage.jsx   # 404 fallback
│   ├── services/
│   │   ├── api.js             # Axios instance + interceptors
│   │   └── socket.js          # Socket.IO setup & export
│   ├── store/
│   │   ├── useAuthStore.js    # Zustand auth store
│   │   └── useServerStore.js  # Zustand server/channel store
│   ├── utils/
│   │   └── cn.js              # Tailwind clsx + tailwind-merge helper
│   ├── App.jsx                # Router + provider tree
│   ├── main.jsx               # Vite entry point
│   └── index.css              # Tailwind directives
├── .env                       # VITE_API_URL, VITE_SOCKET_URL
├── tailwind.config.js         # Discord color palette extension
├── postcss.config.js
├── vite.config.js
└── package.json
```

### Tailwind Config — Discord Colors
```javascript
// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        discord: {
          darker:    '#1E1F22',  // Server list sidebar
          dark:      '#2B2D31',  // Channel list sidebar
          normal:    '#313338',  // Chat area
          accent:    '#5865F2',  // Blurple — buttons, active states
          fuchsia:   '#EB459E',  // Gradient accent
          green:     '#23A55A',  // Online status dot
          yellow:    '#F0B232',  // Idle status
          red:       '#ED4245',  // DND / error
          textNormal: '#DBDEE1',
          textMuted:  '#949BA4',
        }
      },
      fontFamily: {
        discord: ['"gg sans"', 'Inter', 'Noto Sans', 'Helvetica Neue', 'Arial', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
```

### App Layout (4-Panel Grid)
```jsx
// src/layouts/AppLayout.jsx
export default function AppLayout() {
  return (
    <div className="flex h-screen w-screen overflow-hidden font-discord">
      <ServerList />    {/* bg-discord-darker w-[72px] */}
      <ChannelList />   {/* bg-discord-dark w-60 */}
      <main className="flex flex-1 flex-col bg-discord-normal">
        <Outlet />      {/* ChatArea or VoiceChannel */}
      </main>
      <MemberList />    {/* bg-discord-dark w-60 */}
    </div>
  );
}
```

### Socket Provider Pattern
```jsx
// src/hooks/useSocket.js
import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const newSocket = io(import.meta.env.VITE_SOCKET_URL, {
      auth: { token }
    });
    setSocket(newSocket);
    return () => newSocket.close();
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
```

---

## 11. Backend — Node.js + Express

### Tech Choices
| Package | Purpose |
|---------|---------|
| **express** | HTTP server & routing |
| **mongoose** | MongoDB ODM |
| **socket.io** | Real-time WebSocket server |
| **jsonwebtoken** | JWT auth tokens |
| **bcryptjs** | Password hashing |
| **cors** | Cross-origin requests |
| **dotenv** | Environment variables |
| **multer** | File upload handling |
| **cloudinary** + **multer-storage-cloudinary** | Cloud image/file storage |
| **helmet** | Security HTTP headers |
| **express-rate-limit** | Rate limiting (brute-force protection) |

### Backend Folder Structure
```text
discord-clone-api/
├── config/
│   └── cloudinary.js      # Cloudinary v2 setup
├── models/
│   ├── User.js
│   ├── Server.js
│   ├── Channel.js
│   └── Message.js
├── routes/
│   ├── auth.js            # /api/auth
│   ├── servers.js         # /api/servers
│   ├── channels.js        # /api/channels
│   └── messages.js        # /api/messages
├── middleware/
│   ├── auth.js            # JWT verifyToken middleware
│   └── upload.js          # Multer + Cloudinary storage
├── socket/
│   └── index.js           # All Socket.IO event handlers
├── .env
└── server.js              # Express + MongoDB + Socket.IO entry point
```

### Environment Variables (`.env`)
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/discord-clone
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=7d

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

CLIENT_URL=http://localhost:5173
```

---

## 12. MongoDB Schemas (Mongoose)

### User Schema
```javascript
// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username:  { type: String, required: true, unique: true, trim: true },
  email:     { type: String, required: true, unique: true, lowercase: true },
  password:  { type: String, required: true, select: false },
  avatar:    { type: String, default: '' },        // Cloudinary URL
  status:    { type: String, enum: ['online','idle','dnd','offline'], default: 'offline' },
  servers:   [{ type: mongoose.Schema.Types.ObjectId, ref: 'Server' }],
}, { timestamps: true });

// Hash password before save
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

module.exports = mongoose.model('User', userSchema);
```

### Server (Guild) Schema
```javascript
// models/Server.js
const serverSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  icon:     { type: String, default: '' },
  owner:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  members:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  channels: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Channel' }],
}, { timestamps: true });
```

### Channel Schema
```javascript
// models/Channel.js
const channelSchema = new mongoose.Schema({
  name:    { type: String, required: true },
  type:    { type: String, enum: ['text', 'voice'], default: 'text' },
  server:  { type: mongoose.Schema.Types.ObjectId, ref: 'Server', required: true },
}, { timestamps: true });
```

### Message Schema
```javascript
// models/Message.js
const messageSchema = new mongoose.Schema({
  content:    { type: String, default: '' },
  attachment: { type: String, default: '' },   // Cloudinary URL
  sender:     { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  channel:    { type: mongoose.Schema.Types.ObjectId, ref: 'Channel', required: true },
}, { timestamps: true });

// Compound index for fast paginated message fetching
messageSchema.index({ channel: 1, createdAt: -1 });
```

---

## 13. REST API Endpoints

### Auth — `/api/auth`
| Method | Endpoint | Body | Action |
|--------|----------|------|--------|
| `POST` | `/register` | `username, email, password, avatar?` | Hash password, save user, return JWT |
| `POST` | `/login` | `email, password` | Verify bcrypt hash, return JWT |
| `GET` | `/me` | *(JWT header)* | Return current logged-in user profile |

### Servers — `/api/servers` *(JWT protected)*
| Method | Endpoint | Body | Action |
|--------|----------|------|--------|
| `POST` | `/` | `name, icon?` | Create server, auto-create `#general` channel |
| `GET` | `/` | — | Get all servers the user belongs to |
| `GET` | `/:serverId` | — | Get single server + channels |
| `POST` | `/:serverId/join` | — | Add user to server members |
| `DELETE` | `/:serverId` | — | Delete server (owner only) |

### Channels — `/api/servers/:serverId/channels` *(JWT protected)*
| Method | Endpoint | Body | Action |
|--------|----------|------|--------|
| `POST` | `/` | `name, type` | Create new text/voice channel |
| `GET` | `/` | — | List all channels in a server |
| `DELETE` | `/:channelId` | — | Delete a channel |

### Messages — `/api/channels/:channelId/messages` *(JWT protected)*
| Method | Endpoint | Query/Body | Action |
|--------|----------|------------|--------|
| `GET` | `/` | `?page=1&limit=50` | Fetch paginated message history |
| `POST` | `/` | `content, attachment?` | Post a message (HTTP fallback) |
| `DELETE` | `/:messageId` | — | Delete own message |

---

## 14. JWT Auth Middleware
```javascript
// middleware/auth.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer '))
    return res.status(401).json({ error: 'No token provided' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(403).json({ error: 'Invalid or expired token' });
  }
};
```

---

## 15. Real-Time — Socket.IO Events

### Server-Side Socket Handlers
```javascript
// socket/index.js
const jwt = require('jsonwebtoken');
const Message = require('../models/Message');

module.exports = (io) => {
  // Auth middleware for every socket connection
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = payload.id;
      next();
    } catch {
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.userId}`);

    // Join a channel room
    socket.on('join_channel', (channelId) => {
      socket.join(channelId);
    });

    // Leave a channel room
    socket.on('leave_channel', (channelId) => {
      socket.leave(channelId);
    });

    // Send a message → save to DB → broadcast to room
    socket.on('send_message', async ({ channelId, content }) => {
      const message = await Message.create({
        content,
        sender: socket.userId,
        channel: channelId,
      });
      await message.populate('sender', 'username avatar');
      io.to(channelId).emit('new_message', message);
    });

    // Typing indicator
    socket.on('typing', ({ channelId, username }) => {
      socket.to(channelId).emit('user_typing', { username });
    });

    // User online status
    socket.on('disconnect', () => {
      io.emit('user_offline', { userId: socket.userId });
    });
  });
};
```

### Client-Side Socket Event Map
| Client Emits | Server Emits | Description |
|--------------|-------------|-------------|
| `join_channel` | — | Enter a text channel room |
| `leave_channel` | — | Exit a channel room |
| `send_message` | `new_message` | Send & receive chat messages |
| `typing` | `user_typing` | Typing indicator |
| — | `user_offline` | User disconnected |

---

## 16. Main Server Entry (`server.js`)
```javascript
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: { origin: process.env.CLIENT_URL, methods: ['GET', 'POST'] }
});

// Middleware
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());

// Routes
app.use('/api/auth',    require('./routes/auth'));
app.use('/api/servers', require('./routes/servers'));
app.use('/api/channels',require('./routes/channels'));
app.use('/api/messages',require('./routes/messages'));

// Socket.IO
require('./socket')(io);

// Connect DB + Start Server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    httpServer.listen(process.env.PORT || 5000, () =>
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`)
    );
  })
  .catch(err => console.error('MongoDB error:', err));
```

---

## 17. Important Extras & Best Practices

> [!CAUTION]
> Never store plain-text passwords. Always use `bcryptjs` with a salt round of 10–12.

> [!WARNING]
> Voice channels require **WebRTC** (peer-to-peer audio/video) — do NOT route audio through Node.js WebSockets. Use **LiveKit** or **Mediasoup** as a media server (SFU).

### Security Checklist
- [x] JWT for all protected routes
- [x] `bcryptjs` password hashing (salt rounds: 12)
- [x] `helmet` security headers on Express
- [x] `express-rate-limit` to prevent brute-force on `/api/auth`
- [x] CORS restricted to `CLIENT_URL` only
- [x] Socket.IO JWT middleware (reject unauthorized sockets)
- [x] MongoDB compound index on messages (`channel + createdAt`)
- [x] File type validation on Cloudinary uploads (jpg, png, gif only)

### npm Packages — Install Commands
```bash
# Frontend (React)
npm create vite@latest discord-clone -- --template react
cd discord-clone
npm install react-router-dom axios socket.io-client zustand @tanstack/react-query
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Backend (Node)
mkdir discord-clone-api && cd discord-clone-api
npm init -y
npm install express mongoose socket.io jsonwebtoken bcryptjs cors dotenv helmet express-rate-limit multer cloudinary multer-storage-cloudinary
npm install -D nodemon
```

### Deployment Map
| Layer | Recommended Service |
|-------|---------------------|
| **React Frontend** | Vercel / Netlify |
| **Node + Express API** | Railway / Render / Fly.io |
| **MongoDB** | MongoDB Atlas (free tier) |
| **File Storage** | Cloudinary (free tier) |
| **Redis (scaling)** | Upstash Redis (if scaling WebSockets) |

---

> [!TIP]
> For the **landing page** specifically: build it as `LandingPage.jsx` with no auth required. After clicking "Login" or "Open Discord in your browser", redirect to `/login` or `/app`. This keeps the marketing page fully static and fast.

