// Check for service worker
if ("serviceWorker" in navigator) {
  send().catch(err => console.error(err));
}

// Register SW, Register Push, Send Push
async function send() {
  // Register Service Worker
  console.log("Registering service worker...");
  const register = await navigator.serviceWorker.register("/worker.js", {
    scope: "/"
  }).then(async serviceWorker => {
    let subscription = await serviceWorker.pushManager.getSubscription();

    if (!subscription) {
      console.log("Subscription não encontrada. Realizar nova subscription:");
      const dataPK = await fetch('/notification/public_key'); // pega a public key do backend
      const { publicKey } = await dataPK.json();
      console.log(publicKey);

      subscription = await serviceWorker.pushManager.subscribe({
        applicationServerKey: publicKey,
        userVisibleOnly: true,
      });

      console.log("Registra subscription");
      await fetch('/notification/register', {
        method: 'POST',
        body: JSON.stringify({ subscription }),
        headers: { 'Content-Type': 'application/json' }
      })
    }

    console.log('Subscription:', subscription);

    console.log('Envia o pedido de notificação');
    await fetch('/notification/send', {
      method: 'POST',
      body: JSON.stringify({ subscription }),
      headers: { 'Content-Type': 'application/json' }
    })

  })
}

function localNotification() {
  console.log("Notificação do frontend");
  window.Notification.requestPermission(permission => {
    if (permission === 'granted') {
      new window.Notification('Previsio Testes Notif', {
        body: 'notificacacacaca',
      })
    }
  })
}