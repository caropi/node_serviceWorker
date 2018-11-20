const publicVapidKey =
    "BPsVJMmM5EIpqEJ395ihO8oyg0mEqwlTu1qRWleaq03ddkOUU18KPqWkuLa-UVcVIikK-g5eTrSirayHL7qOHzk";

    // Check for service worker
    // navigator is basically the API for the browser itself
    if('serviceWorker' in navigator) {
        send().catch(err => console.error(err));
    }
    // this function will do 3 things: register service workers, register push (browsers push api), send push notification
    async function send() {
        // register service worker
        console.log('Registering service worker...');
        const register = await navigator.serviceWorker.register('/worker.js', {
            scope: '/'
        });
        console.log('Service worker registered...');
        // register push
    }