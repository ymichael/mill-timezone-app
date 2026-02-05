# Timezone Menubar

A macOS menu bar app built with Electron that displays the current time in different timezones.

## Features

- Shows current local time in the menu bar
- Click to see all configured timezones in a dropdown
- Preferences window to add/remove timezones
- Option to start on login
- Preferences stored locally in JSON

## Requirements

- Node.js 18 or later
- macOS (for full menu bar functionality)

## Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd timezone-menubar
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the app in development mode:
   ```bash
   npm start
   ```

## Build

To build a distributable macOS app:

```bash
npm run build
```

The built app will be in the `dist/` folder.

## Usage

1. After launching, the app appears in your menu bar showing the current local time
2. Click the menu bar icon to see times in all configured timezones
3. Click "Preferences..." to open the settings window
4. Add timezones by selecting from the dropdown and providing a label
5. Remove timezones by clicking the "Remove" button next to each one
6. Enable "Start on login" to have the app launch automatically

## Configuration

Preferences are stored in:
- macOS: `~/Library/Application Support/timezone-menubar/preferences.json`

Default timezones:
- New York (America/New_York)
- London (Europe/London)
- Tokyo (Asia/Tokyo)

## License

MIT
