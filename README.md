# שעונים - Hebrew Clock Website

A comprehensive clock website built with Next.js, featuring multiple time-related tools with Hebrew RTL support.

[Here is the link to the website](https://eladmotzny.github.io/clocks/)

## Features / תכונות

### 🕐 Current Time / שעון נוכחי
- Real-time clock display based on user's timezone
- Hebrew date and time formatting
- Responsive design with modern UI

### ⏱️ Stopwatch / סטופר
- Start, stop, split, and reset functionality
- Lap timing with detailed history
- Millisecond precision display

### ⏰ Timer / טיימר
- Configurable countdown timer (up to 24 hours)
- Start, pause, and reset controls
- Audio and vibration alerts when finished

### 🔔 Alarm Clock / שעון מעורר
- Add multiple alarms with custom labels
- Enable/disable individual alarms
- Persistent storage using localStorage
- Audio and vibration notifications

### 🌍 World Time / זמן עולמי
- Pre-loaded with user's timezone + 3 popular destinations
- Add/remove timezone clocks
- Real-time updates for all displayed clocks
- Persistent custom timezone list

### 🔄 Time Converter / ממיר זמן
- Convert time between different timezones
- User-friendly datetime picker
- Instant conversion results

### 🍅 Pomodoro Timer / טיימר פומודורו
- Configurable focus and rest periods
- Multiple cycle support
- Audio cues for phase transitions
- Default: 25min focus, 5min rest, 4 cycles

## Tech Stack / טכנולוגיות

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Custom CSS (no Tailwind)
- **Font**: Heebo (Hebrew-optimized)
- **Features**: RTL support, accessibility, responsive design

## Getting Started / התחלה מהירה

### Prerequisites / דרישות מקדימות
- Node.js 18+ 
- npm or yarn

### Installation / התקנה

```bash
# Clone the repository
git clone <repository-url>
cd clocks

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

### Build for Production / בנייה לייצור

```bash
# Build the application
npm run build

# Start production server
npm start
```

