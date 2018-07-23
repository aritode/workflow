chrome.tabs.onUpdated.addListener((tabId, changeObject) => {
  const { url } = changeObject;
  if (typeof url === 'string') {
    if (url.startsWith('http://localhost:9876')) {
      const params = new URL(url).searchParams;
      const data = params.get('data');

      const { redirect, appId } = JSON.parse(decodeURIComponent(data));

      console.log('creating socket');
      const socket = new WebSocket('ws://localhost:8080');

      socket.addEventListener('open', function(event) {
        console.log('socket opened');
        socket.send(
          JSON.stringify({
            type: 'register',
            appId: appId,
            processId: 'na',
          })
        );
      });

      console.log('redirect to', redirect);
      chrome.tabs.update(tabId, { url: redirect });

      socket.addEventListener('message', function(event) {
        const { url } = JSON.parse(event.data);

        console.log('open', url);
        chrome.tabs.update(tabId, { url });
      });
    }
  }
});

/*



*/
