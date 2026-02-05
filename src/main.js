const { app, Tray, Menu, BrowserWindow, ipcMain, nativeImage } = require('electron');
const path = require('path');
const fs = require('fs');

// Prevent multiple instances
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
}

let tray = null;
let preferencesWindow = null;

// Path for preferences file
const userDataPath = app.getPath('userData');
const prefsPath = path.join(userDataPath, 'preferences.json');

// Default preferences
const defaultPrefs = {
  timezones: [
    { id: 'America/New_York', label: 'New York' },
    { id: 'Europe/London', label: 'London' },
    { id: 'Asia/Tokyo', label: 'Tokyo' }
  ],
  startOnLogin: false
};

function loadPreferences() {
  try {
    if (fs.existsSync(prefsPath)) {
      const data = fs.readFileSync(prefsPath, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error loading preferences:', err);
  }
  return defaultPrefs;
}

function savePreferences(prefs) {
  try {
    fs.writeFileSync(prefsPath, JSON.stringify(prefs, null, 2));
  } catch (err) {
    console.error('Error saving preferences:', err);
  }
}

function formatTime(timezone) {
  try {
    return new Date().toLocaleTimeString('en-US', {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  } catch (err) {
    return 'Invalid TZ';
  }
}

function getLocalTime() {
  return new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
}

function buildContextMenu() {
  const prefs = loadPreferences();
  const menuItems = [];

  // Add each timezone
  prefs.timezones.forEach(tz => {
    menuItems.push({
      label: `${tz.label}: ${formatTime(tz.id)}`,
      enabled: false
    });
  });

  if (menuItems.length > 0) {
    menuItems.push({ type: 'separator' });
  }

  // Add preferences and quit options
  menuItems.push({
    label: 'Preferences...',
    click: () => openPreferences()
  });

  menuItems.push({ type: 'separator' });

  menuItems.push({
    label: 'Quit',
    click: () => app.quit()
  });

  return Menu.buildFromTemplate(menuItems);
}

function updateTray() {
  if (tray) {
    tray.setTitle(getLocalTime());
    tray.setContextMenu(buildContextMenu());
  }
}

function openPreferences() {
  if (preferencesWindow) {
    preferencesWindow.focus();
    return;
  }

  preferencesWindow = new BrowserWindow({
    width: 500,
    height: 400,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  preferencesWindow.loadFile(path.join(__dirname, 'preferences.html'));

  preferencesWindow.on('closed', () => {
    preferencesWindow = null;
  });
}

function createTray() {
  // Load the clock icon for the tray
  const iconPath = path.join(__dirname, 'assets', 'iconTemplate.png');
  const icon = nativeImage.createFromPath(iconPath);
  // Mark as template so it adapts to light/dark menu bar on macOS
  icon.setTemplateImage(true);
  tray = new Tray(icon);
  tray.setTitle(getLocalTime());
  tray.setToolTip('Timezone Menubar');
  tray.setContextMenu(buildContextMenu());

  // Update tray every minute
  setInterval(updateTray, 60000);
}

// IPC handlers for preferences window
ipcMain.handle('get-preferences', () => {
  return loadPreferences();
});

ipcMain.handle('save-preferences', (event, prefs) => {
  savePreferences(prefs);
  updateTray();

  // Update login item setting
  app.setLoginItemSettings({
    openAtLogin: prefs.startOnLogin
  });

  return true;
});

// App events
app.whenReady().then(() => {
  // Hide dock icon on macOS (menu bar app)
  if (process.platform === 'darwin') {
    app.dock.hide();
  }

  createTray();
});

app.on('window-all-closed', () => {
  // Don't quit when all windows are closed (menu bar app)
});
