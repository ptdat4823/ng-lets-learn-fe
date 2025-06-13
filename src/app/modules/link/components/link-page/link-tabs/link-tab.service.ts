import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
    })
export class LinkTabService {
    private fileUrlSubject = new BehaviorSubject<string | null>(null);
    private fileNameSubject = new BehaviorSubject<string | null>(null);
  
  fileUrl$ = this.fileUrlSubject.asObservable();
  fileName$ = this.fileNameSubject.asObservable();
  
  updateFileInfo(url: string | null, name: string | null): void {
    this.fileUrlSubject.next(url);
    this.fileNameSubject.next(name);
  }
  
  clearFileInfo(): void {
    this.fileUrlSubject.next(null);
    this.fileNameSubject.next(null);
  }

  downloadFile(url: string, fileName: string): void {
    if (!url) {
      console.warn('No file URL provided for download');
      return;
    }

    try {
      // Create a temporary anchor element to trigger download
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      link.target = '_blank';
      
      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading file:', error);
      window.open(url, '_blank');
    }
  }
}