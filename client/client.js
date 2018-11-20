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
        console.log('Registering push...');
        const subscription = await register.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
        });
        console.log('Push Registered...');

        // we want to now send push notification
        console.log('Sending Push...');
        await fetch('/subscribe', {
            method: 'POST',
            body: JSON.stringify(subscription),
            headers: {
                'content-type': 'application/json'
            }
        });
        console.log('Push sent...');
    }

    function urlBase64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/\-/g, '+')
            .replace(/_/g, '/');

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; i++) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }