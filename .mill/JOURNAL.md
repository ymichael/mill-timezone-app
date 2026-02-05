# Development Journal

## Run 1 - Bootstrap
- Created initial project structure
- Set up package.json with Electron 28 and electron-builder
- Implemented main.js with:
  - Tray/menu bar functionality
  - Context menu with timezone display
  - Preferences window launch
  - IPC handlers for saving/loading preferences
  - Login item support
- Created preferences.html with:
  - List of configured timezones with remove buttons
  - Add timezone form with dropdown of common timezones
  - Start on login checkbox
  - Save button
- Updated README.md with setup and build instructions
- All core features from PROJECT.md goals are implemented in skeleton form

### Notes for next run
- The app uses an empty icon for the tray (placeholder)
- Preferences are stored in Electron's userData folder as preferences.json
- Default timezones: New York, London, Tokyo
- Time updates every 60 seconds in the menu bar
