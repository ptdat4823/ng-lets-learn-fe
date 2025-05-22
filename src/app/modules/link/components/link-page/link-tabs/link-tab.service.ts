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
}