const noblox = require('noblox.js')
async function startApp () {
    // You MUST call setCookie() before using any authenticated methods [marked by 🔐]
    // Replace the parameter in setCookie() with your .ROBLOSECURITY cookie.
    const currentUser = await noblox.setCookie('_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_9E1CA2501EC1C96C46960ED40E4AC89EE0B3C6C10FACC6ED372FFC96B69F1D9AAE650368741FB1A40EB511979F643F68222FD8BDC30420554EAA9ADBC5B2E60FBF741EA5D59E7317011FC1F501EE41CAFE399BBC4FCE8E25A96A84D883EB3ECD547666A48BAE92B1EB8E35225A0A4CD029ECBABFB3D0BCE8EB77C0B868745C40C69A0A2641EECAD421050F0526DC7A9266DF8E7D02C56C53B5B5A55B8A22E734C17EAFD0E1548B820003240561DBE2EED243C72D2D5152F5CC129434738482CF05E83F4012645F6CE33444C16768C646E673B918D8009ABB5B46C97E3C0625C9648E12A0CC30C5266ED0F1A22F9A4AFB779D3EE4542C690241EE759B7C01495E9FE1B78C762697FBA6F71DA61D30A96827A5EA8B16FC5923F40F90249A997620B90581F6313F5CF73AD3AFF663A10643757746DDE35CD9190D8C0074CB070A42C7161E5BE7A20EA9A8F70769B0A65306D63E7CCF53662836002FA88B06A000110AD204F52A0602F7D96562D7FB4D2DB5497A4B8106435B2A128F9EC222DE6CC483B1CDD492EE15B6862FB3015CFA11D3042757FBFEB2A2257B687051C5F86BD3B61B3EF299DEEEFFBF341FB51802318770519F351F9718DBD4F6C4F9F0AE7679D422A75006907EF7403EBBCAA0EB4C9F6288E555DFD21B8A75E98FD19C2A1FAB5BE5A862FC18E4487D1BE7FEA728493B5FAB68F93357078AE13BFC4561B841993492D7F13139472649BF2CF7112F6F1A9351B605B1D10C95E37E3C2020DC55448CE0E942C5E31846BFAF1DAFA1B1C6A61D4CF6182435E3A265E614C6745E5D8034C41E123ECDCEF9249D50C0E175CE8E85BFAE221416AC2A97A3963D358A80F5266FFD2CD037BCA46C358EAE6D1689A442B074FAF091B0C49428A9012EBE4668C042443DE35CC6A43EF5B0727C0E2A41A91AAADCFB703870E44D9D6B9508ED66C0D564319AE7EF669CB82FF994CBB9A516B15A3F895105F02949CFBE5CB5282715C076353B0A715FCC31E31C1655422456E01707C20EAF47666F51786BEAFFDEA5B73A62EB7775FF7F366576CEA8B25ADBA4A6C87AD65841F884CCB3A1C7CA8E89EDDC553250402FE269A6CE236CEB5F216D07EF') 
    const conversationEvent = noblox.onNewConversation()
conversationEvent.on("data", function(data) {
 console.log("New conversation! ", data)
 noblox.sendChatMessage(data, "Hello player!")
 noblox.sendChatMessage(data, "Connecting to ezapi...")
 noblox.sendChatMessage(data, "Failed to connect: Ez api is currently down Please contact the owner and report the error")
})
conversationEvent.on("error", function(err) {
 console.error("Something went wrong: ", err)
})
const friendRequestEvent = noblox.onFriendRequest()
friendRequestEvent.on("data", function(data) {
    console.log("New friend request! ", data)
    noblox.acceptFriendRequest(data)
    console.log("accepted friend request")
   })
   const notification = noblox.onNotification()
   notification.on("data", function(data) {
    console.log("New notification! ", data)
   })
   notification.on("error", function(err) {
    console.error("Something went wrong: ", err)
    // Handle error as needed
   })
   const messageEvent = noblox.onNewMessage()
messageEvent.on("data", function(data) {
 console.log("New chat message! ", data)
 noblox.sendChatMessage(data, "sorry but i could not get a response by the ez service api!")
})
messageEvent.on("error", function(err) {
 console.error("Something went wrong: ", err)
 // Handle error as needed
})
}
startApp()
