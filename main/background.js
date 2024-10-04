import path from 'path';
import { app, ipcMain, BrowserWindow, net } from 'electron';
import serve from 'electron-serve';
import { createWindow } from './helpers';
import { getAccessToken } from './auth';
import axios from 'axios';
const Store = require('electron-store');

const store = new Store();
const isProd = process.env.NODE_ENV === 'production';

if (isProd) {
  serve({ directory: 'app' });
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`);
}

// Function to send data to Power Automate
async function sendDynamicArrayToPowerAutomate(dynamicData) {
  try {
    const response = await axios.post(
      'https://prod-13.centralindia.logic.azure.com/workflows/61a6e3343f8742918cc47fa25e3ab330/triggers/manual/paths/invoke',
      dynamicData,
      {
        params: {
          'api-version': '2016-06-01',
          sp: '/triggers/manual/run',
          sv: '1.0',
          sig: '90dopqCkZaavPjic6bc9o2X1-i2BVq00d456miQlmXg'
        },
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'User-Agent': 'axios/1.7.7'
        }
      }
    );
    return response.status === 200;
  } catch (error) {
    console.error('Error sending data, will retry later:', error);
    return false;
  }
}

// Check for unsent data and send it if internet is available
// Ensure store, sendDynamicArrayToPowerAutomate, and navigatorOnLine are defined

// Check for unsent data and send it if internet is available
async function checkAndSendUnsentData() {
  const unsentData = store.get('formData') || [];
  
  if (unsentData.length > 0) {
    console.log('Attempting to send unsent data...');
    const remainingData = [...unsentData]; // Copy unsentData to avoid mutation issues
    for (const data of unsentData) {
      const success = await sendDynamicArrayToPowerAutomate(data);
      if (success) {
        // If data is successfully sent, remove it from remaining data
        const index = remainingData.indexOf(data);
        if (index > -1) {
          remainingData.splice(index, 1);
        }
      }
    }
    store.set('formData', remainingData); // Update store with remaining data
  }
}

// Store data locally and attempt to send when online
async function storeAndSendData(dynamicData) {
  const isOnline = navigatorOnLine();

  if (isOnline) {
    const success = await sendDynamicArrayToPowerAutomate(dynamicData);
    if (!success) {
      queueDataForLater(dynamicData);
    }
  } else {
    queueDataForLater(dynamicData);
  }
}

// Store unsent data in Electron Store
function queueDataForLater(dynamicData) {
  const unsentData = store.get('unsentData') || [];
  unsentData.push(dynamicData);
  store.set('unsentData', unsentData);
}

// Check if the app is online
function navigatorOnLine() {
  return net.isOnline();
}

// Periodically check for internet connection and unsent data
function startPeriodicCheck() {
  setInterval(async () => {
    if (navigatorOnLine()) {
      console.log('Online, checking for unsent data...');
      await checkAndSendUnsentData();
    } else {
      console.log('Still offline, waiting to retry...');
    }
  }, 10000); // Check every 10 seconds (adjust as needed)
}

;(async () => {
  await app.whenReady();

  const mainWindow = createWindow('main', {
    width: 1000,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolated: false,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  if (isProd) {
    await mainWindow.loadURL('app://./home');
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    // mainWindow.webContents.openDevTools();
  }

  startPeriodicCheck(); // Start checking for unsent data and internet availability
})();

app.on('window-all-closed', () => {
  app.quit();
});

ipcMain.on('save-form-data', (event, data) => {
  let formData = store.get('formData'); // Get existing form data or initialize as an empty array
  if (!Array.isArray(formData)) {
    formData = [];
  }
  formData.push(data); // Add new form data to the array
  store.set('formData', formData); // Save the updated array
  event.reply('form-saved', 'Form data saved successfully!');
});

ipcMain.handle('get-form-data', () => {
  const formData = store.get('formData') || []; // Get existing form data or initialize as an empty array
  return formData; // Return the array of form data
});

ipcMain.on('send-data-to-power-automate', (event, dynamicData) => {
  storeAndSendData(dynamicData);
});