import {Component, inject, OnInit} from '@angular/core';
import { io } from 'socket.io-client';
import { ButtonComponent } from "@shared/elements/buttton/button.component";
import {Location, NgForOf, NgIf} from "@angular/common";

@Component({
    selector: 'progi-video-calls',
    templateUrl: './video-calls.component.html',
    styleUrls: ['./video-calls.component.scss'],
  imports: [
    ButtonComponent,
    NgForOf,
    NgIf
  ],
    standalone: true
})
export class VideoCallsComponent implements OnInit {
    localStream!: MediaStream;
    audioEnabled: boolean = false;
    videoEnabled: boolean = false;
    remoteStreams: MediaStream[] = [];
    consumerCounter: number = 1;
    consumers: any [] = [{id: this.consumerCounter, title: `${this.consumerCounter}`}];

    private readonly location = inject(Location);

    constructor() { }

    ngOnInit(): void {
        // Не запрашиваем аудио и видео изначально
    }

    startCall() {
        // Подключаемся к серверу по WebSocket
        const socket = io('ws://localhost:3001');

        // Получаем доступ к устройствам
        navigator.mediaDevices.getUserMedia({ video: this.videoEnabled || true, audio: this.audioEnabled || true })
            .then(stream => {
                // Отправляем потоки видео и аудио на сервер
                socket.emit('call', stream);

                // Обработка полученных потоков от других клиентов
                socket.on('stream', (remoteStream: MediaStream) => {
                    // Отображаем видео удаленного пира
                    this.remoteStreams.push(remoteStream);
                });
            })
            .catch(error => console.error('Error accessing media devices:', error));
    }

    toggleAudio() {
        this.audioEnabled = !this.audioEnabled;
        if (this.localStream) {
            this.localStream.getAudioTracks().forEach(track => {
                track.enabled = this.audioEnabled;
            });
        }
    }

    toggleVideo() {
        this.videoEnabled = !this.videoEnabled;
        if (this.localStream) {
            this.localStream.getVideoTracks().forEach(track => {
                track.enabled = this.videoEnabled;
                if (!this.videoEnabled) {
                    // Если видео отключается, останавливаем поток видео
                    track.stop();
                }
            });
        }
        // Если видео снова включается, запрашиваем доступ к устройствам
        if (this.videoEnabled) {
            navigator.mediaDevices.getUserMedia({ video: true, audio: this.audioEnabled }).then(stream => {
                this.localStream = stream;
                const localVideo = document.getElementById('{{consumer.id}}') as HTMLVideoElement;
                localVideo.srcObject = stream;
                // Включаем аудио и видео после успешного получения потока
                this.audioEnabled = true;
            }).catch(error => console.error('Error accessing media devices', error));
        }
    }

    goBack(){
      this.location.back();
    }

    addWindow() {
      this.consumerCounter += 1;
      this.consumers.push({id: this.consumerCounter, title: `${this.consumerCounter}`});
      // let element = document.getElementsByClassName('.mainWindow');
      // let block = document.createElement('div.mainWindow');
      // element.appendChild(block);
    }

    removeWindow() {
      this.consumers.splice(this.consumers.length-1, 1);
      this.consumerCounter -= 1;
      // let element = document.getElementsByClassName('.mainWindow');
      // document.removeChild(element);
    }
}
