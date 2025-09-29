import { StreamChat } from "stream-chat";
import "dotenv/config";

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
  console.error("Stream API key or Secret is missing");
}

//creating same user in stream app
const streamClient = StreamChat.getInstance(apiKey, apiSecret);

export const upsertStreamUser = async(userData)=>{
    try {
        await streamClient.upsertUsers([userData]);
        return userData;
    } catch (error) {
        console.log("Error creating Stream user:", error);
    }
}

export const generateStreamToken = (userId)=>{
    try {
        //convert userID to string
        const userIdStr = userId.toString();
        return streamClient.createToken(userIdStr);
    } catch (error) {
        console.log("error generating stream token", error);
    }
};


