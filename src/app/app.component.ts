import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LandmarkComponent } from './landmark/landmark.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LandmarkComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'guideme_frontend';
}
