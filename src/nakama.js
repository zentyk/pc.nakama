import {Client, Session} from "@heroiclabs/nakama-js"
import Logger from "./logger"

export default class Nakama {
    constructor(clientHost,clientPort,useSSL, userId, username, uselogs) {
        this.loaded = false;
        
        this.userId = userId;
        this.username = username;
        this.useSSL=useSSL;

        this.socket;
        this.session;
        this.socketsession;
        this.match;
        this.oponents = [];

        this.logger = new Logger(uselogs);
        this.client =  new Client("defaultkey", clientHost, clientPort, useSSL);
    }

    initiate = async ()=> {
        await this.checkSessionAndAuthenticate()
        await this.establishSocketConnection()

        this.loaded=true;
        this.logger.log("pc.nakama has loaded! and logged In!", "✨");
    }

    checkSessionAndAuthenticate = async () => { 
        let nakamaAuthToken = localStorage.getItem("nakamaAuthToken");
        if (nakamaAuthToken && nakamaAuthToken != "") {
            this.logger.log("Session Found");

            this.session = Session.restore(nakamaAuthToken);
            let currentTimeInSec = new Date() / 1000;
    
            if (!this.session.isexpired(currentTimeInSec)) {
                // Session valid so restore it
                this.session = this.session;
                this.logger.log("Session Restored");
                
            } else {
                this.logger.warn("Session Expired");
                
                await this.createSession()
            }
        } else {
            await this.createSession()
        }

        if(this.uselogs) {
            this.logger.success("Authenticated Session");
        }
    }

    establishSocketConnection = async () => {
        // Create connection to the server via websockets
        const trace = false; // TODO: understand what this does
        this.socket = this.client.createSocket(this.useSSL, trace);
        await this.socket.connect(this.session);
        
        this.logger.success("Established Websocket Connection");
    };

    createSession = async () => {
        this.logger.log("Creating New Session...");
        let nakamaSession = await this.client.authenticateCustom(this.userId, true, this.username);
        localStorage.setItem("nakamaAuthToken", nakamaSession.token);
        this.session = nakamaSession;   
        return this.session
    }

    createMatch = async () => {
        this.match = await this.socket.createMatch();
        this.logger.success("Created match with ID: " + this.match.match_id);
        return this.match;
    }

    joinToMatch = async (id) => {
        this.match = await this.socket.joinMatch(id);

        this.oponents = this.match.presences.filter((presence) => {
            // Remove your own user from list.
            return presence.user_id != this.match.self.user_id;
        });

        this.oponents.forEach((opponent) => {
            this.logger.log("User id %o, username %o.", opponent.user_id, opponent.username);
        });
    }

    matchMake = async (matchId, token) => {
        this.match = await this.socket.joinMatch(matchId,token);
    }

    rpcFindMatch = async () => {

    }
}