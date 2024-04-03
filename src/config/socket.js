import addMessageToBoxchat from "@/controller/socketmessage.js";

function socketHandler(socket, socketIo) {
  console.log("New client connected" + socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });

  socket.on("sendDataClient", async function (data) {
    await addMessageToBoxchat(data);
    socketIo.emit("sendDataServer", { data });
  });
}

export default socketHandler;
