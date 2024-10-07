import path from 'path';
import { app, ipcMain, BrowserWindow, net } from 'electron';
import serve from 'electron-serve';
import { createWindow } from './helpers';
const Store = require('electron-store');
require('dotenv').config(); // Load environment variables

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const store = new Store();
const isProd = process.env.NODE_ENV === 'production';

if (isProd) {
  serve({ directory: 'app' });
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`);
}

// Check if the app is online
function navigatorOnLine() {
  return net.isOnline();
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

// Save form data directly to pendingData
ipcMain.on('save-form-data', (event, data) => {
  let pendingData = store.get('pendingData') || []; // Initialize as an array if empty
  pendingData.push(data); // Add new form data to the array
  store.set('pendingData', pendingData); // Save to pendingData
  event.reply('form-saved', 'Form data saved for later submission!');
});

// Function to send data to Supabase
ipcMain.handle('send-data', async (event, newData) => {
  try {
    const { data, error } = await supabase
      .from('Responses')  // Replace with your table name
      .insert([newData]);

    if (error) {
      console.error('Error inserting data to Supabase:', error.message);
      return { error: error.message };
    }
    return { data };
  } catch (err) {
    console.error('Error in send-data:', err.message);
    return { error: err.message };
  }
});

// Retry sending pending data
ipcMain.handle('retry-pending-data', async () => {
  const pendingData = store.get('pendingData') || [];
  if (pendingData.length > 0) {
    for (const data of pendingData) {
      const result = await supabase
        .from('Responses')  // Replace with your table name
        .insert([data]);

      if (result.error) {
        console.error('Error sending pending data:', result.error.message);
        return { error: result.error.message };
      }
    }
    store.delete('pendingData'); // Clear pendingData after successful submission
    console.log('Pending data sent and cleared from local storage.');
  }
  return null;
});

// Fetch pending data to show in the front end
ipcMain.handle('fetch-pending-data', async () => {
  const pendingData = store.get('pendingData') || [];
  return pendingData;
});

// Periodically check for internet availability and retry sending pending data
function startPeriodicCheck() {
  setInterval(async () => {
    if (navigatorOnLine()) {
      console.log('Internet is available. Checking for pending data...');
      await retryPendingData(); // Retry sending any pending data
      await checkAndFetchLowestRatedTour(); // Fetch the lowest rated tour if conditions are met
    } else {
      console.log('No internet connection. Will try again later.');
    }
  }, 5000); // Check every 5 seconds (you can adjust this interval)
}

let lastUpdateTime = 0;
let lowestRatedTour = null;

async function checkAndFetchLowestRatedTour() {
  const currentTime = Date.now();
  if (navigatorOnLine() && (currentTime - lastUpdateTime > 3600000)) { // 1 hour in milliseconds
    console.log('Fetching lowest rated tour from Supabase...');
    lowestRatedTour = await fetchLowestRatedTour();
    lastUpdateTime = currentTime;
  }
}

async function fetchLowestRatedTourCall() { 
  lowestRatedTour = await fetchLowestRatedTour();
}

async function fetchLowestRatedTour() {
  const { data, error } = await supabase.rpc('get_lowest_rated_tour');
  console.log("Data:", data);

  if (error) {
    console.error('Error fetching lowest rated tour:', error);
    return null;
  }

  return data[0];
}

ipcMain.handle('get-lowest-rated-tour', async () => {
  return lowestRatedTour;
});

app.whenReady().then(fetchLowestRatedTourCall);

// Function to retry sending pending data
async function retryPendingData() {
  const pendingData = store.get('pendingData') || [];
  if (pendingData.length > 0) {
    for (const data of pendingData) {
      const { error } = await supabase
        .from('Responses')  // Replace with your table name
        .insert([data]);

      if (error) {
        console.error('Error sending pending data:', error.message);
        return { error: error.message };
      }
    }
    store.delete('pendingData'); // Clear pending data after successful submission
    console.log('All pending data sent to Supabase.');
  } else {
    console.log('No pending data to send.');
  }
}

function clearStore() {
  store.clear();
  console.log('Electron Store has been cleared.');
}

// Example usage: Clear the store when the app is ready
app.whenReady().then(clearStore);