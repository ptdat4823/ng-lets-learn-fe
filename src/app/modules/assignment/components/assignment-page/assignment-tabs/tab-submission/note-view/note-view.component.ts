import { Component, Input, OnChanges, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'note-view',
  standalone: false,
  templateUrl: './note-view.component.html',
  styleUrl: './note-view.component.scss',
})
export class NoteViewComponent implements OnInit, OnChanges {
  @Input() note: string = '';
  noteInput: string = '';

  @Output() saveNote = new EventEmitter<string>();
  @Output() clearNote = new EventEmitter<void>();

  ngOnInit(): void {
    this.noteInput = this.note;
  }

  ngOnChanges(): void {
    this.noteInput = this.note;
  }

  onClearNote(): void {
    this.noteInput = '';
    this.clearNote.emit();
  }

  onSaveNote(): void {
    this.saveNote.emit(this.noteInput);
  }
}
