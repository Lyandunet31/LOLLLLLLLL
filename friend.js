const noblox = require('noblox.js')
async function startApp () {
    // You MUST call setCookie() before using any authenticated methods [marked by 🔐]
    // Replace the parameter in setCookie() with your .ROBLOSECURITY cookie.
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
