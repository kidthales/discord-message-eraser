import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { cancel, onInvalidUrl, onUrl, start } from '@fabianlars/tauri-plugin-oauth';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-auth-page',
  imports: [MatButtonModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  standalone: true
})
export class AuthComponent implements OnInit, OnDestroy {
  discordUrl = environment.auth.discordUrl;

  private port!: number;

  ngOnInit(): void {
    start({ ports: environment.auth.redirectPorts }).then((port) => {
      console.log(`OAuth server started on port ${port}`);
      this.port = port;
      onUrl((url) => console.log('Received OAuth URL:', url));
      onInvalidUrl((error) => console.error('Received invalid OAuth URL:', error));
    });
  }

  ngOnDestroy(): void {
    cancel(this.port).then(() => console.log('OAuth server stopped'));
  }
}
