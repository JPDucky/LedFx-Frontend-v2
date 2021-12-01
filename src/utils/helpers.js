export const drawerWidth = 240;
export const frontendConfig = 4;


export const camelToSnake = (str) => str[0].toLowerCase()
  + str
    .slice(1, str.length)
    .replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

export const download = (content, fileName, contentType) => {
  const a = document.createElement('a');
  const file = new Blob([JSON.stringify(content, null, 4)], {
    type: contentType,
  });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
};


export const getOverlapping = (data) => {
  const tmp = {};
  data.forEach(([name, start, end]) => {
      if (!tmp[name]) {
          tmp[name] = {};
          data.forEach(y => {
              tmp[name].items = [];
              tmp[name].overlap = false;
              tmp[name].items.push([start, end]);
          });
      } else {
          tmp[name].items.push([start, end]);
      }
  });
  Object.keys(tmp).forEach(e =>
      tmp[e].items
          .sort(([startA], [startB]) => startA > startB)
          .forEach(([start, end], i) => {
              if (tmp[e].items[i + 1]) {
                  const [startNew, endNew] = tmp[e].items[i + 1];
                  if (startNew <= end && endNew >= start) {
                      tmp[e].overlap = true;
                  }
              }
          })
  );
  return tmp;
}

export const swap = (array, i, j) => [array[i], array[j]] = [array[j], array[i]];

export const deleteFrontendConfig = () => {
    window.localStorage.removeItem('undefined')
    window.localStorage.removeItem('ledfx-host')
    window.localStorage.removeItem('ledfx-hosts')
    window.localStorage.removeItem('ledfx-ws')
    window.localStorage.removeItem('ledfx-theme')
    window.localStorage.removeItem('ledfx-frontend')
}

export const initFrontendConfig = () => {
    if (window.localStorage.getItem('ledfx-frontend') >= frontendConfig) {
        return
    }
    deleteFrontendConfig()
    window.localStorage.setItem('ledfx-frontend', frontendConfig)
}