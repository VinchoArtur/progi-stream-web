import { Injectable } from "@angular/core";
import * as signalR from "@aspnet/signalr";

@Injectable({
    providedIn: 'root'
})
export class SignalRService {
    private hubConnection!: signalR.HubConnection;
    private testServer: string = 'http://localhost:3001';


    constructor(){
        this.startConnection();
    }

    private startConnection(){
        this.hubConnection = new signalR.HubConnectionBuilder().withUrl(this.testServer).build();

        this.hubConnection.start().then(() => console.log('Connection started')).catch(error => console.error(`Error while starting connection`, error));
    }

    sendMessage() {
        this.hubConnection.on('ReceiveMessage', (message) => {
            console.log('Receive message: ', message)
        })
    }
}
