const noblox = require('noblox.js');

async function startApp() {
  try {
    // Vous DEVEZ appeler setCookie() avant d'utiliser toute méthode authentifiée [marquée par 🔐]
    // Remplacez le paramètre dans setCookie() par votre cookie .ROBLOSECURITY.
    const currentUser = await noblox.setCookie('_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_1A4C83859ED554319592B6C026A2ABECE9E79BBE5FF9382E0E5B965BDF3119BE5321C7DCA7B84411A1C3166AFABDAA0E86455634F00916CC304B1087713A27AD76173D01E118EF751F90611E183AB47CA41C67B007191290C4517D5DCC75A25BB93C42D2DC707A9527B933C746677937BCB6CD5BCCBB90D944F8A11BF017BA996D9A98F1E072D228C43F1BCA78C241770CCDCC04DE369FBDF6F9E031DFD3ADD511C7A59F12E939B7887BE78041186D1F10C906106C9D61358A3AD431D51CEB5D10B3B20A0EC24BE27DF1AEAEB10FFFD35C433608AA47A09B21248F800AD441F03F1ACB98BAF904A58EA8E13EF51F069E8D099C2DDF4755D4764BB5C284550717E3F7F1B62FC6FEA178B2EE42A6CA064CDAADED6A6D9BC18D3669F010645787A2C2A6000034B58D59DB3596875413C17D28CD7242AF4B386009C1692C175D1FAD9F76F87C1949CA589A449DFBEF649669D0F1B5B7D0277A4FDA7C69D4D625BADE976EE9C34053A05B2C237927ED16A63C97A9DB234A4BB95EE661B87055C6C25FBDF0EC635AE002095F60DACB23AE6880ED2224F35242096A3C57D8F2FC680825C91B73D4178FE3A010C94770E2CC830D41E6879ED4119D633AC9CFB23FC72DE72065294708ECA7295A4AFECC12A93F7AC0284CDD7ED8444FA70B1210C40303FC351D5DF76D7BED0DD7D457BEC2E72C2B1CBD566B827FD3D4850CF39DE6E77FBE21BD75D5ADE810CF9F02D6918F6D7D5F46C497AF0CE53FB03E4DD1D12A030AB9B2860691F067EF2A9180F78304A367C23279C3DBBF1C872308447680C7D2C860D155D8DBD672A0DA3B5C869444AB62AAF1F772EBC566CDCA4BF557DCCF83C1ACCCDE3BE53972F569D53D1E83D1A632AE47560E74FA91EDEB435EE089C8D9A6A6AE9F47B31CD10F4179FC942A411F4255AD14944553AA60354DD00B4E9BED4CEF5E83617A6EBAC5B5087D40436AC4FC4DFF08C9C76CB900B8A51553A512537EE5A813B2182C52174140ACDDB58EEC09C4BC92A9D9D39F9A89734062CDFAC6861C8ACAE9F2A29AFC7D36021D926FBAB4E4A37110B51CEED63967D3682ED6A89E11A945861CEDC5D15F9A5AF8FC1610A5003B71D242');

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
