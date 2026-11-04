# Week 1 — Day-by-Day Plan
### React + Vite + Tailwind CSS (Frontend)

> [!IMPORTANT]
> Goal by end of Week 1: **Discord Navbar + Hero Section built as React components with Tailwind CSS, running in the browser.**

---

## Week Overview

| Day | Focus | End Goal |
|-----|-------|----------|
| **Day 1** | Dev Setup + Tools | All tools installed, React project created |
| **Day 2** | JSX & React Basics | Understand components, props, how React works |
| **Day 3** | Tailwind CSS Setup | Discord colors configured, utility classes working |
| **Day 4** | Navbar Component | Full sticky Discord navbar built in React |
| **Day 5** | Hero Component | Hero section with gradient + CTA buttons |
| **Day 6** | Page Assembly + Routing | All components wired in `App.jsx`, React Router added |
| **Day 7** | Clean Up + GitHub Push | Code clean, committed, pushed to GitHub |

---

## Day 1 — Dev Setup + Create React Project ⚙️
**Time needed: ~2–3 hours**

### Step 1 — Install Tools
```
1. VS Code          → https://code.visualstudio.com/
2. Node.js (LTS)   → https://nodejs.org/   ← install this first
3. Git             → https://git-scm.com/
4. Chrome          → browser for previewing
```

### Step 2 — VS Code Extensions
Press `Ctrl+Shift+X` → install these:
```
✅ ES7+ React/Redux/React-Native snippets   ← React shortcuts (rfce, useState etc.)
✅ Tailwind CSS IntelliSense                ← Autocomplete Tailwind classes
✅ Prettier - Code formatter                ← Auto-format on save
✅ ESLint                                   ← Catch JS errors
✅ Auto Rename Tag                          ← Rename opening/closing JSX tags together
✅ GitLens                                  ← Better Git inside VS Code
```

**Set Prettier as default formatter:**
`Ctrl+Shift+P` → "Format Document With" → Prettier → "Set as Default"

### Step 3 — Create Your React Project
Open your terminal and run:
```bash
# Create the React project using Vite
npm create vite@latest discord-clone -- --template react

# Move into the project
cd discord-clone

# Install dependencies
npm install

# Start the dev server
npm run dev
```

> Open your browser → `http://localhost:5173` → you should see the Vite + React default page. ✅

### Step 4 — Clean Up the Default Files
Vite gives you placeholder code. Delete the junk:

```
src/
  App.css         ← DELETE this file
  assets/         ← DELETE everything inside (keep the folder)
```

Replace `src/App.jsx` with this clean start:
```jsx
function App() {
  return (
    <div>
      <h1>Discord Clone</h1>
    </div>
  )
}

export default App
```

Replace `src/index.css` with just this (we'll replace it with Tailwind tomorrow):
```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

### Step 5 — Create GitHub Repo & Push
```bash
# Configure Git (first time only)
git config --global user.name "Your Name"
git config --global user.email "your@email.com"

# Initialize git (already done by Vite, just check)
git init
git add .
git commit -m "Day 1: React + Vite project setup"
```
- Go to **github.com** → New repository → name it `discord-clone` → Create
- Copy the remote URL and run:
```bash
git remote add origin https://github.com/YOUR_USERNAME/discord-clone.git
git branch -M main
git push -u origin main
```

### Daily Checklist
- [ ] VS Code + extensions installed
- [ ] Node.js installed (`node --version` shows v20+)
- [ ] `npm run dev` runs and browser shows Vite page
- [ ] Default files cleaned up
- [ ] Code pushed to GitHub ✅

---

## Day 2 — JSX & React Basics ⚛️
**Time needed: ~2–3 hours**

### What to Learn (1 hour)

Watch: **"React in 1 Hour" by Programming with Mosh** (YouTube)

#### The 5 Core Concepts of React

**1. Components** — Everything is a function that returns JSX
```jsx
// A React component = a JavaScript function that returns JSX
function Navbar() {
  return (
    <nav>
      <h1>Discord</h1>
    </nav>
  )
}
```

**2. JSX** — Looks like HTML but it's JavaScript
```jsx
// JSX Rules:
// ✅ Use className instead of class
// ✅ Self-close empty tags: <img /> <br /> <input />
// ✅ One root element (wrap in <> </> if needed)
// ✅ JavaScript inside curly braces { }

function Hero() {
  const title = "GROUP CHAT THAT'S ALL FUN & GAMES"

  return (
    <section>
      <h1>{title}</h1>           {/* JS variable */}
      <p>{2 + 2}</p>             {/* JS expression */}
      <button onClick={() => alert('clicked!')}>Click me</button>
    </section>
  )
}
```

**3. Props** — Pass data into components like HTML attributes
```jsx
// Define the component with props
function NavLink({ label, href }) {
  return <a href={href}>{label}</a>
}

// Use it and pass props
<NavLink label="Download" href="/download" />
<NavLink label="Nitro" href="/nitro" />
```

**4. .map() — Render lists**
```jsx
const links = ['Download', 'Nitro', 'Discover', 'Quests']

function NavLinks() {
  return (
    <ul>
      {links.map((link) => (
        <li key={link}>
          <a href="#">{link}</a>
        </li>
      ))}
    </ul>
  )
}
```
> [!IMPORTANT]
> Always add `key={something_unique}` when using `.map()` in React — it will warn you if you forget.

**5. Importing / Exporting Components**
```jsx
// src/components/Navbar.jsx
export default function Navbar() {   // named export
  return <nav>...</nav>
}

// src/App.jsx
import Navbar from './components/Navbar'  // import it

function App() {
  return (
    <div>
      <Navbar />     {/* use it like an HTML tag */}
    </div>
  )
}
```

### What to Build (1–1.5 hours)

Create the **folder structure** you'll use all week:
```
src/
  components/
    Navbar.jsx        ← create this
    HeroSection.jsx   ← create this (empty for now)
  pages/
    LandingPage.jsx   ← create this
  App.jsx
  main.jsx
  index.css
```

Write a basic `Navbar.jsx` using just JSX (no Tailwind yet — that's tomorrow):
```jsx
// src/components/Navbar.jsx

const navLinks = [
  { label: 'Download',  href: '#' },
  { label: 'Nitro',     href: '#' },
  { label: 'Discover',  href: '#' },
  { label: 'Quests',    href: '#' },
  { label: 'Safety',    href: '#' },
  { label: 'Support',   href: '#' },
  { label: 'Blog',      href: '#' },
  { label: 'Careers',   href: '#' },
]

export default function Navbar() {
  return (
    <nav>
      {/* Logo */}
      <div className="logo">
        <span>Discord</span>
      </div>

      {/* Nav Links — rendered with .map() */}
      <ul>
        {navLinks.map((link) => (
          <li key={link.label}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>

      {/* Login Button */}
      <button>Login</button>
    </nav>
  )
}
```

Wire it up in `App.jsx`:
```jsx
import Navbar from './components/Navbar'

function App() {
  return (
    <div>
      <Navbar />
    </div>
  )
}

export default App
```

**Check browser** → You should see: Discord + 8 links + Login button (unstyled is fine — Tailwind comes tomorrow)

### Daily Checklist
- [ ] Watched React basics tutorial (1 hour)
- [ ] Understand: component, JSX, props, `.map()`, import/export
- [ ] `src/components/` folder created
- [ ] `Navbar.jsx` renders 8 links using `.map()` over an array
- [ ] `App.jsx` imports and renders `<Navbar />`
- [ ] No red errors in the browser console

---

## Day 3 — Tailwind CSS Setup + Discord Theme 🎨
**Time needed: ~2–3 hours**

### Step 1 — Install Tailwind CSS
```bash
# Stop the dev server first (Ctrl+C), then:
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Step 2 — Configure `tailwind.config.js`
Replace the contents of `tailwind.config.js` with:
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",   // ← scan ALL React files
  ],
  theme: {
    extend: {
      colors: {
        // Discord's exact color palette
        discord: {
          darker:     '#1E1F22',   // server list sidebar
          dark:       '#2B2D31',   // channel list sidebar
          normal:     '#313338',   // chat area
          accent:     '#5865F2',   // blurple — buttons, active states
          'accent-hover': '#4752C4',
          fuchsia:    '#EB459E',   // gradient accent
          green:      '#23A55A',   // online status
          yellow:     '#F0B232',   // idle
          red:        '#ED4245',   // DND / error
          'text-normal': '#DBDEE1',
          'text-muted':  '#949BA4',
        }
      },
      fontFamily: {
        discord: ['"Inter"', '"Helvetica Neue"', 'Arial', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #1a2081 0%, #5865F2 50%, #7289DA 100%)',
      }
    },
  },
  plugins: [],
}
```

### Step 3 — Add Tailwind to `index.css`
Replace **everything** in `src/index.css` with:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Step 4 — Add Google Font (Inter)
Add this inside `<head>` in `index.html`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
```

### Step 5 — Test Tailwind Works
In `App.jsx`, add a test class:
```jsx
function App() {
  return (
    <div className="bg-discord-darker min-h-screen text-discord-text-normal font-discord">
      <Navbar />
    </div>
  )
}
```

**Restart dev server:**
```bash
npm run dev
```
> Browser should now show a **dark background** (`#1E1F22`). Tailwind is working! ✅

### How Tailwind Works — Quick Reference
```jsx
// Instead of writing CSS files, you apply classes directly in JSX:
<div className="flex items-center justify-between px-6 py-4 bg-discord-darker">

// Tailwind class → CSS it generates:
flex              → display: flex
items-center      → align-items: center
justify-between   → justify-content: space-between
px-6              → padding-left: 24px; padding-right: 24px
py-4              → padding-top: 16px; padding-bottom: 16px
bg-discord-darker → background-color: #1E1F22  (your custom color)
text-white        → color: white
font-bold         → font-weight: 700
rounded-full      → border-radius: 9999px
cursor-pointer    → cursor: pointer
transition-colors → transition: color, background-color...
hover:bg-discord-accent-hover  → applies on hover
```

### Daily Checklist
- [ ] Tailwind installed and configured
- [ ] `tailwind.config.js` has all Discord custom colors
- [ ] `index.css` has the 3 Tailwind directives
- [ ] Inter font loading from Google Fonts
- [ ] App background is dark (`bg-discord-darker`) — Tailwind is working
- [ ] Dev server running with no errors

---

## Day 4 — Navbar Component with Tailwind 🧭
**Time needed: ~2–3 hours**

### What to Learn (30 min)
Watch: **"Tailwind CSS Crash Course" by Traversy Media** (YouTube) — first 30 min

### What to Build — Full Navbar
Rewrite `src/components/Navbar.jsx` with Tailwind classes:

```jsx
// src/components/Navbar.jsx

const navLinks = [
  { label: 'Download',  href: '#' },
  { label: 'Nitro',     href: '#' },
  { label: 'Discover',  href: '#' },
  { label: 'Quests',    href: '#' },
  { label: 'Safety',    href: '#' },
  { label: 'Support',   href: '#' },
  { label: 'Blog',      href: '#' },
  { label: 'Careers',   href: '#' },
]

export default function Navbar() {
  return (
    <nav className="
      sticky top-0 z-50
      flex items-center justify-between
      px-8 py-4
      bg-discord-darker
    ">

      {/* Logo */}
      <a href="/" className="flex items-center gap-2 text-white font-bold text-xl">
        {/* SVG Discord Icon Placeholder */}
        <div className="w-8 h-8 bg-discord-accent rounded-full flex items-center justify-center text-white text-xs font-black">
          D
        </div>
        Discord
      </a>

      {/* Nav Links */}
      <ul className="hidden md:flex items-center gap-6">
        {navLinks.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="text-discord-text-normal text-sm font-medium hover:text-white transition-colors duration-200"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Login Button */}
      <a
        href="/login"
        className="
          bg-discord-accent hover:bg-discord-accent-hover
          text-white text-sm font-semibold
          px-5 py-2.5 rounded-full
          transition-colors duration-200
          cursor-pointer
        "
      >
        Login
      </a>

    </nav>
  )
}
```

**Result in browser:**
- Dark `#1E1F22` background navbar
- Logo on left, 8 links in center, blurple Login button on right
- Hover effects on links + button
- Sticky at top while scrolling

### Daily Checklist
- [ ] Navbar uses Tailwind classes (no separate CSS file)
- [ ] `sticky top-0 z-50` makes it stay on screen
- [ ] 8 links rendered with `.map()` from the `navLinks` array
- [ ] Links hidden on mobile (`hidden md:flex`) — responsive!
- [ ] Login button is blurple with hover effect
- [ ] Looks similar to Discord's real navbar

---

## Day 5 — Hero Section Component 🌈
**Time needed: ~2–3 hours**

### What to Learn (30 min)
Read: **Tailwind CSS — Gradient docs** (tailwindcss.com/docs/gradient-color-stops)

### What to Build — Hero Section

Create `src/components/HeroSection.jsx`:
```jsx
// src/components/HeroSection.jsx

export default function HeroSection() {
  return (
    <section className="
      bg-hero-gradient
      min-h-[90vh]
      flex flex-col items-center justify-center
      text-center
      px-6 py-24
      text-white
    ">

      {/* Main Heading */}
      <h1 className="
        text-5xl md:text-7xl
        font-black uppercase
        leading-tight
        max-w-3xl
        mb-6
      ">
        Group Chat That's All Fun &amp; Games
      </h1>

      {/* Subheading */}
      <p className="
        text-base md:text-lg
        font-medium
        max-w-xl
        text-white/80
        leading-relaxed
        mb-10
      ">
        Discord is great for playing games and chilling with friends, or even
        building a worldwide community. Customize your own space to talk, play,
        and hang out in.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-wrap gap-4 items-center justify-center">

        {/* Primary Button */}
        <button className="
          bg-white text-indigo-900
          font-bold text-base
          px-7 py-3.5 rounded-full
          hover:bg-indigo-100
          hover:scale-105
          transition-all duration-200
          shadow-lg
        ">
          Download for Windows
        </button>

        {/* Secondary Link */}
        <a
          href="#"
          className="
            text-white font-medium text-sm
            underline underline-offset-4
            hover:text-white/70
            transition-colors duration-200
          "
        >
          Open Discord in your browser
        </a>

      </div>

    </section>
  )
}
```

Wire it into `App.jsx`:
```jsx
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'

function App() {
  return (
    <div className="min-h-screen font-discord">
      <Navbar />
      <HeroSection />
    </div>
  )
}

export default App
```

**Result:** A beautiful gradient hero section under the sticky navbar — just like Discord! ✅

### Daily Checklist
- [ ] `HeroSection.jsx` component created
- [ ] Hero has the gradient background (defined in tailwind.config.js)
- [ ] H1 heading is large, uppercase, bold
- [ ] Subheading paragraph below with correct Discord copy
- [ ] Two CTA buttons: white filled + underlined text link
- [ ] Both components visible on screen, no errors

---

## Day 6 — LandingPage + React Router 🗺️
**Time needed: ~2–3 hours**

### Install React Router
```bash
npm install react-router-dom
```

### What to Learn (30 min)
Watch: **"React Router v6 in 20 min" by Web Dev Simplified** (YouTube)

#### Core Router Concepts
```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Wraps everything — goes in main.jsx
<BrowserRouter>
  <Routes>
    <Route path="/"       element={<LandingPage />} />
    <Route path="/login"  element={<LoginPage />} />
    <Route path="*"       element={<NotFoundPage />} />
  </Routes>
</BrowserRouter>
```

### Create the Pages Folder Structure
```
src/
  pages/
    LandingPage.jsx    ← move Navbar + HeroSection here
    LoginPage.jsx      ← placeholder for now
    NotFoundPage.jsx   ← placeholder for now
  components/
    Navbar.jsx
    HeroSection.jsx
```

### `src/pages/LandingPage.jsx`
```jsx
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'

export default function LandingPage() {
  return (
    <div className="min-h-screen font-discord">
      <Navbar />
      <HeroSection />
      {/* More sections coming next week */}
    </div>
  )
}
```

### `src/pages/LoginPage.jsx` (placeholder)
```jsx
export default function LoginPage() {
  return (
    <div className="min-h-screen bg-discord-normal flex items-center justify-center text-white">
      <h1 className="text-3xl font-bold">Login Page — Coming Soon</h1>
    </div>
  )
}
```

### `src/pages/NotFoundPage.jsx` (placeholder)
```jsx
export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-discord-normal flex items-center justify-center text-white">
      <h1 className="text-3xl font-bold">404 — Page Not Found</h1>
    </div>
  )
}
```

### Update `src/main.jsx` with Router
```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
```

### Update `src/App.jsx` with Routes
```jsx
import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <Routes>
      <Route path="/"      element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*"      element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
```

**Test it:**
- `localhost:5173/` → shows Landing Page
- `localhost:5173/login` → shows Login placeholder
- `localhost:5173/anything` → shows 404 page

**Update the Login button** in `Navbar.jsx` to use React Router's `Link`:
```jsx
import { Link } from 'react-router-dom'

// Replace <a href="/login"> with:
<Link
  to="/login"
  className="bg-discord-accent hover:bg-discord-accent-hover text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors duration-200"
>
  Login
</Link>
```

### Daily Checklist
- [ ] React Router installed (`npm install react-router-dom`)
- [ ] `pages/` folder with LandingPage, LoginPage, NotFoundPage
- [ ] `main.jsx` wrapped with `<BrowserRouter>`
- [ ] `App.jsx` has `<Routes>` with 3 routes
- [ ] Navbar Login button uses `<Link to="/login">` from React Router
- [ ] All 3 routes work in the browser

---

## Day 7 — Code Clean Up + GitHub Push 🐙
**Time needed: ~1.5–2 hours**

### Morning — Code Review (45 min)

Go through every file and fix these:

#### ✅ Naming Conventions
```
Components   → PascalCase:  Navbar.jsx  HeroSection.jsx  ✅
Variables    → camelCase:   navLinks  heroTitle          ✅
CSS classes  → Tailwind only — no separate .css files    ✅
```

#### ✅ Check All Files
| File | Check |
|------|-------|
| `Navbar.jsx` | `navLinks` array has all 8 links with correct labels |
| `Navbar.jsx` | Login uses `<Link>` not `<a>` |
| `HeroSection.jsx` | Gradient shows, heading + subheading correct Discord copy |
| `tailwind.config.js` | All Discord colors defined |
| `App.jsx` | 3 routes set up |
| `main.jsx` | `<BrowserRouter>` wrapping everything |

#### ✅ Browser Console Check
Open Chrome DevTools (`F12`) → Console tab → **zero red errors** ✅

### Final Folder Structure Check
Your project should look like this:
```
discord-clone/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Navbar.jsx         ✅
│   │   └── HeroSection.jsx    ✅
│   ├── pages/
│   │   ├── LandingPage.jsx    ✅
│   │   ├── LoginPage.jsx      ✅
│   │   └── NotFoundPage.jsx   ✅
│   ├── App.jsx                ✅
│   ├── main.jsx               ✅
│   └── index.css              ✅ (Tailwind directives only)
├── tailwind.config.js         ✅ (Discord colors)
├── postcss.config.js          ✅
├── vite.config.js             ✅
├── package.json               ✅
└── index.html                 ✅ (Inter font link)
```

### Push to GitHub
```bash
git add .
git commit -m "Week 1: React + Vite + Tailwind setup, Navbar + Hero components, React Router"
git push
```

### Daily Checklist
- [ ] All file names use PascalCase for components
- [ ] Zero red errors in browser console
- [ ] `localhost:5173` shows the dark Discord navbar + gradient hero
- [ ] `localhost:5173/login` navigates without page reload (React Router!)
- [ ] Code pushed to GitHub ✅

---

## Week 1 Summary

```
Day 1 → React + Vite project created, GitHub connected, tools installed
Day 2 → JSX understood, Navbar skeleton with .map() over navLinks array
Day 3 → Tailwind CSS installed, Discord colors in tailwind.config.js
Day 4 → Full Navbar component — sticky, 8 links, blurple Login button
Day 5 → HeroSection component — gradient bg, big heading, two CTA buttons
Day 6 → React Router added, pages/ folder, 3 routes working
Day 7 → Code cleaned, committed, pushed to GitHub ✅
```

---

## Week 2 Preview — What's Coming Next

Next week you'll build the **rest of the Landing Page** sections:
- Feature Section 1 — "Create an invite-only place" (flex zig-zag layout)
- Feature Section 2 — "Where hanging out is easy" (flipped layout)
- Feature Section 3 — "From a few to a fandom"
- CTA Banner section
- Footer with 4-column grid + social icons
- Make everything **mobile responsive** with Tailwind breakpoints (`md:`, `lg:`)

> [!TIP]
> After Day 7, open `localhost:5173` and compare it side-by-side with `discord.com`. Note what's missing — that becomes your Week 2 checklist.
