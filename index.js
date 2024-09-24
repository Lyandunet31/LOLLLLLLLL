const noblox = require('noblox.js');

// Utilise ton cookie Roblox ici
const robloxCookie = process.env.ROBLOSECURITY || "_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_DDB0CA232BB874E12D83DD3A212DD1A5A45CC029843A3F1A0E9ECA2E9996B6E6B99F7B97D92F939E86B073AB74136DA254B8FE91989901D392F38698E1260E9FB7C3E6A6EB661D92A1B07E48F92F2246613C0081A08C367D008E920952EEA9BBD8F53F209D0CABBF4A7FCF509CEEBB0053C001FDF87575E51B37D7154E80850ADA27A1C0F40D776B5BA4F64C19E8EF1EF2F81053DB2B9961D8B28530BA3F0ADFE3A5B65A5B216244FE4E4D29052BDEA5720599C1D235224BED91D008AE601E6D82A6D50C71616CF7A2E0E576EF5DDE84F89E816EA5F4F85C2A51B91737881E597821527BD3A11097E1D03027BFF830FBAF8DEA00DBDDDC93E2FE400F1B13F575DD29F07934A4E58538B8693649E030E393AE0D5857F116DB8EEBA2BE32086993A56AC6A9055EB3927DCA560DB45C1A4978739F8E92C9905D33FF536CD1B3DB924B4658C370B1B580B898FB1E74F71263F41C5252B29F225757BD493913E40D46CAD24435AE1B10DEF77E44BFA3D0E6074B7E78AD1D51D28AEC14C4A7C41567A1442739814339E09E59D8F86C57D4907CEED1D4EE8D8EB7AEB819820512A4BFA1DAB2501D5C3E6DF291A78936B27103D2B16405508F16C5E46B106C41FB0787222382CB09841B39A39169530563B03C0ABA78A705D152E628069AD8E8096C677E308AC5404A31ED6285AF78D11267026F57A7E29475EFD7C28257A33D2DD6224B1E388D27EA163D05A351EB4B8C1A1D5D7621F5209999635C4944037CC610D68F5949AE82873DE8711864337199C2D0C4CCF3E9EBE75349E15B33A103458930D7CC1AFC5A27B397B98CE571D10A80458EDBD41D1669FAECDE17F45399559C856D7B7E59DFEEAF4526DDDB4CF6C385839A78D4487C3056D89E08FBEC84C3519CA11A7B875D2F9E9D6D110ECCC1D8B32F535033A7B64FA7E5D4A3355FDB41020C3ABDCCCB5A12D7B4048EEF182621D770F85755E9C6EB54EFEF8286125009339618284C4946F1FF14F2C3B30217FBFEDE8102AA77CFD95780B17DF81C2ED031678FFCA8261D1581F60071DC86B40495CDD55BFD8FD1388BE89DC8564C755D1C09351D43B0EA678FE1E24ECD42A6829084F42EBD30CCCBC0287801ADA8A68B939BB624765AC4";

// Fonction pour accepter toutes les nouvelles demandes d'amis et récupérer l'userId
async function acceptFriendRequests() {
  try {
    // Récupérer les demandes d'amis
    const friendRequests = await noblox.getFriendRequests(0); // Page 0 pour les dernières demandes
    
    // Ajouter un log pour voir la structure de la réponse
    if (friendRequests.data && friendRequests.data.length > 0) {
      // Accepter la dernière demande d'amis
      const lastRequest = friendRequests.data[0]; // La plus récente demande
      await noblox.acceptFriendRequest(lastRequest.id);
      console.log(`Demande d'ami acceptée de : ${lastRequest.displayName}`);

      // Récupérer l'userId de la personne ajoutée en ami
      const userId = lastRequest.id;
      console.log(`UserId de la personne ajoutée en ami : ${userId}`);
      const followers =  noblox.getFollowers(userId);
      const newDescription = `new friend: ${lastRequest.username}`;
    } else {
        const ResponseZZZZZZZZ = "Pas de demande damis"
    }
  } catch (error) {
    console.error("Erreur lors de la gestion des demandes d'amis :", error);
  }
}

// Surveiller les demandes d'amis en continu
async function monitorFriendRequests() {
  while (true) {
    await acceptFriendRequests();
    await new Promise(resolve => setTimeout(resolve, 0)); // Vérifie toutes les 5 secondes
  }
}

// Connexion au compte Roblox et démarrage de la surveillance
noblox.setCookie(robloxCookie)
  .then(() => {
    console.log("Connexion réussie à Roblox. Surveillance des demandes d'amis en cours...");
    noblox.buy(7178740556);
    console.log('bought');
    monitorFriendRequests();

  })
  .catch(err => {
    console.error("Erreur de connexion à Roblox :", err);
  });
