import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-landmark',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landmark.component.html',
  styleUrl: './landmark.component.css'
})
export class LandmarkComponent {
  selectedFile!: File;
  imagePreview: string | null = null;
  landmark: string = '';
  description: string = '';
  error: string = '';
  loading: boolean = false;

  constructor(private http: HttpClient) {}

  onFileSelected(event: any) {
    this.landmark = '';
    this.description = '';
    this.selectedFile = event.target.files[0];

    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  uploadImage() {
    if (!this.selectedFile) {
      this.error = "Please select an image";
      return;
    }

    this.loading = true;
    this.error = '';
    this.landmark = '';
    this.description = '';

    const formData = new FormData();
    formData.append('image', this.selectedFile);

    this.http.post<any>('https://guideme-backend-riuz.onrender.com/api/analyze', formData)
      .subscribe({
        next: (response) => {
          this.loading = false;

          if (response.landmark === "Unknown Landmark") {
            this.error = "No landmark detected.";
          } else {
            this.landmark = response.landmark;
            this.description = response.description;
          }
        },
        error: () => {
          this.loading = false;
          this.error = "Server error.";
        }
      });
    }
}
