import { contextBridge, ipcRenderer } from 'electron'

// Expose ipcRenderer to the renderer process via contextBridge
contextBridge.exposeInMainWorld('electron', {
  sendFormData: (data) => ipcRenderer.send('save-form-data', data),
  onFormSaved: (callback) => ipcRenderer.on('form-saved', callback),
  getFormData: () => ipcRenderer.invoke('fetch-pending-data'),
  getLowestRatedTour: () => ipcRenderer.invoke('get-lowest-rated-tour'),
});


const handler = {
  send(channel, value) {
    ipcRenderer.send(channel, value)
  },
  on(channel, callback) {
    const subscription = (_event, ...args) => callback(...args)
    ipcRenderer.on(channel, subscription)

    return () => {
      ipcRenderer.removeListener(channel, subscription)
    }
  },
}

contextBridge.exposeInMainWorld('ipc', handler)
