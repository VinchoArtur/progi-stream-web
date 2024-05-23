import {Component, inject, Input, OnInit} from '@angular/core';
import {io} from 'socket.io-client';
import {ButtonComponent} from "@shared/elements/buttton/button.component";
import {Location, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {GeneralPageComponent} from "@app/modules/general/general-page/general-page.component";
import {ActivatedRoute} from "@angular/router";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
	selector: 'progi-video-calls',
	templateUrl: './video-calls.component.html',
	styleUrls: ['./video-calls.component.scss'],
	imports: [
		ButtonComponent,
		NgForOf,
		NgIf,
		FormsModule
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
	private socket = io('ws://165.232.131.67/calls');


	private readonly location = inject(Location);
	userId!: string;
	params!: {title: string, name: string, password: string} ;

	constructor(private readonly route: ActivatedRoute) {
	}

	ngOnInit(): void {
		this.route.params.pipe(untilDestroyed(this)).subscribe(params => {
			console.log(params);
			this.params = params as { title: string, name: string, password: string }
		});
	}

	startCall() {
		if (this.socket === null) {
			this.socket = io('ws://localhost:3001/calls');;
		}
		this.toggleVideo(`1`);;
	}

	endCall() {
		if (this.localStream) {
			this.localStream.getTracks().forEach(track => track.stop());
		}

		if (this.socket) {
			this.socket.disconnect();
		}
		this.localStream = null!;
		this.remoteStreams = [];
		this.socket = null!;
		this.videoEnabled = false;
	}

	toggleAudio(id: string) {
		this.audioEnabled = !this.audioEnabled;
		if (this.localStream) {
			this.localStream.getAudioTracks().forEach(track => {
				track.enabled = this.audioEnabled;
			});
		}
	}

	toggleVideo(id: string) {
		this.videoEnabled = !this.videoEnabled;
		if (this.localStream) {
			this.localStream.getVideoTracks().forEach(track => {
				track.enabled = this.videoEnabled;
				if (!this.videoEnabled) {
					track.stop();
				}
			});
		}
		if (this.videoEnabled) {
			navigator.mediaDevices.getUserMedia({video: true, audio: this.audioEnabled}).then(stream => {
				this.localStream = stream;
				const localVideo = document.getElementById(id) as HTMLVideoElement;
				localVideo.srcObject = stream;


				console.log(this.userId);
				const streamData = {
					userId: this.userId,
					streamId: stream.id,
					tracks: stream.getTracks().map(track => ({
						id: track.id,
						kind: track.kind,
						label: track.label,
						enabled: track.enabled
					}))
				};
				this.socket.emit('calls', streamData);
				this.socket.on('remoteStream', (data: { userId: string, streamId: string, tracks: any[] }) => {
					const remoteStream = new MediaStream();
					data.tracks.forEach(trackInfo => {
						navigator.mediaDevices.getUserMedia({ [trackInfo.kind]: true }).then(mediaStream => {
							const track = mediaStream.getTracks().find(t => t.kind === trackInfo.kind);
							if (track) {
								remoteStream.addTrack(track);
							}
						});
					});

					const remoteVideo = document.getElementById(`remoteVideo`) as HTMLVideoElement;
					remoteVideo.srcObject = remoteStream;
					remoteVideo.play();
				});
			}).catch(error => console.error('Error accessing media devices', error));
		}
	}

	goBack() {
		this.location.back();
	}

	addWindow() {
		this.consumerCounter += 1;
		this.consumers.push({id: this.consumerCounter, title: `${this.consumerCounter}`});
	}

	removeWindow() {
		this.consumers.splice(this.consumers.length - 1, 1);
		this.consumerCounter -= 1;
	}
}
