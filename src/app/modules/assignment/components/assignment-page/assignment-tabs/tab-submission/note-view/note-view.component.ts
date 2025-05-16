import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'note-view',
  standalone: false,
  templateUrl: './note-view.component.html',
  styleUrl: './note-view.component.scss',
})
export class NoteViewComponent implements OnInit, OnChanges {
  @Input() note: string = '';
  noteInput: string = '';

  ngOnInit(): void {
    this.noteInput = this.note;
  }

  ngOnChanges(): void {
    this.noteInput = this.note;
  }
}
