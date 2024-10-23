const noblox = require('noblox.js');

async function startApp() {
  try {
    // Vous DEVEZ appeler setCookie() avant d'utiliser toute méthode authentifiée [marquée par 🔐]
    // Remplacez le paramètre dans setCookie() par votre cookie .ROBLOSECURITY.
    const currentUser = await noblox.setCookie('_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_BC8AA1E5FFF3579829452968123527603A26E32EA9592CDA1D4539ECDD3D679054535068673D456F6594BEE6B7127E2701783E32FBC55636EB9A30D0296002E213AF82583790494ED0091680287ACDF8FC203AB9C524B20E849237297BB686F75252543A9098D2FB93023E50FD91EE1E43E129897015C5D1342957D45F40CB552898A1C7BF6645ABF2B8A0367197B1837797A2A7D7D74F950A4693477EA708D199DCB2E40EE1361F07EF982F910865142D76E59B3FAB62C01BC860E48F1C39A1DDFEB885F3AB3C8C47641343A2C0B2B808204F92AAD58182AA91D45C909F29F2A1350CB7474392632E127ED39EDDB4B6DA8C393E67203A5A04A55BFBE56CA4F06F678C5CFC0F80FC14A0C1BAA44D6B12EA3F4C944C40F0F31C23832CF356D28D14221C2F02BC322B2586D56F80CA3BAFBC4B45BB26B9A221D410AB60A1EFBEF5A1DF024DC880F5AE319EA7319AFFE3F6D9572776B095CA1EFCF0E0ADB4C30AD1E24B557D09501EB924B089BE2EEE031D7FB2EE8CEA00B3CED25A6A82E2B76965593E062D8EAECBACA8D56DEA6A0DD8ADD6E6FFF7F0BF00C09F1BEFB17C4B258646DEEE63856F045E6DBA9192C0FCDD687A222C523088777FD9CB7C964AFEFECDC83DD7BC7BCDDD4DB39BAD827E2DC1C9CA797BA20F67413E0187A172999E8D15FFD9194F');

    // Gère la reconnexion en cas d'erreur
    function handleReconnect(eventEmitter) {
      eventEmitter.on("error", function(err) {
        console.error("Erreur détectée : ", err);
        reconnect();
      });

      eventEmitter.on("close", function() {
        console.warn("Connexion fermée. Tentative de reconnexion...");
        reconnect();
      });
    }

    function reconnect() {
      console.log("Tentative de reconnexion...");
      startApp(); // Appelle la fonction pour recommencer tout le flux
    }

    const conversationEvent = noblox.onNewConversation();
    handleReconnect(conversationEvent);

    conversationEvent.on("data", function (data) {
      console.log("Nouvelle conversation ! ", data);
      noblox.sendChatMessage(data, "Hello player!");
      noblox.sendChatMessage(data, "Connecting to ezapi...");
      noblox.sendChatMessage(data, "Failed to connect: Ez api is currently down. Please contact the owner and report the error.");
    });

    const friendRequestEvent = noblox.onFriendRequest();
    handleReconnect(friendRequestEvent);

    friendRequestEvent.on("data", function (data) {
      console.log("Nouvelle demande d'ami ! ", data);
      noblox.acceptFriendRequest(data);
      console.log("Demande d'ami acceptée.");
    });

    const notification = noblox.onNotification();
    handleReconnect(notification);

    notification.on("data", function (data) {
      console.log("Nouvelle notification ! ", data);
    });

  } catch (err) {
    console.error("Erreur lors de l'initialisation : ", err);
    // Tenter une reconnexion après une erreur
    setTimeout(() => {
      console.log("Reconnexion suite à une erreur...");
      startApp();
    }, 5000); // Attendre 5 secondes avant de réessayer
  }
}

startApp();
