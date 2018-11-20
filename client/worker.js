console.log('Service Worker Loaded');

self.addEventListener('push', e => {
    const data = e.data.json();
    console.log('Push Received...');
    self.registration.showNotification(data.title, {
      body: "Notified by Caroline :)",
      icon:
        "https://atomsmashermusicblog.files.wordpress.com/2018/04/31170342_10155983919060081_5011954331641970688_n.jpg?w=471&h=471"
    });
});