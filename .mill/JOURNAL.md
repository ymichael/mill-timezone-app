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

## Run 2 - Add menu bar icon
- Created an 18x18 PNG clock icon at src/assets/iconTemplate.png
- Updated main.js to load the icon and mark it as a template image (for macOS light/dark mode support)
- All PROJECT.md goals are now met:
  1. ✅ Menu bar icon shows current time (uses setTitle with clock icon)
  2. ✅ Clicking shows dropdown with all configured timezones
  3. ✅ Preferences window to add/remove timezones
  4. ✅ App starts on login option
  5. ✅ README with setup and build instructions

### Notes for next run
- All core goals are complete
- Consider disabling the workflow if no further improvements needed
- Nice-to-have improvements: tests, 24h format option, searchable timezone dropdown
