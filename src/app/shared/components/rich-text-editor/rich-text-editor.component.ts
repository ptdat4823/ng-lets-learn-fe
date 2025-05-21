import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EditorComponent, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { debounceTime, Subject } from 'rxjs';
import { Editor } from 'tinymce';
import { SharedComponentsModule } from '../shared-components.module';

@Component({
  selector: 'app-rich-text-editor',
  templateUrl: './rich-text-editor.component.html',
  styleUrls: ['./rich-text-editor.component.scss'],
  imports: [EditorComponent, SharedComponentsModule],
  standalone: true,
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' },
  ],
})
export class RichTextEditorComponent implements OnInit {
  @Input() form: FormGroup = new FormGroup({});
  @Input() controlName: string = '';
  @Input() validationMessages: Record<string, string> | null = null;
  @Input() editorId: string =
    'tiny-editor-' + Math.random().toString(36).substring(2, 9);
  @Input() initialValue: string = '';
  @Input() placeholder: string = 'Enter text here...';
  @Input() height: number = 200;
  @Input() menubar: boolean = true;
  @Input() plugins: string[] = [
    'advlist',
    'autolink',
    'lists',
    'link',
    'image',
    'charmap',
    'preview',
    'anchor',
    'searchreplace',
    'visualblocks',
    'code',
    'fullscreen',
    'insertdatetime',
    'media',
    'table',
    'help',
    'wordcount',
  ];
  @Input() toolbar: string =
    'undo redo | blocks | fontfamily fontsize | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help';
  init: EditorComponent['init'] = {};

  @Output() editorInit = new EventEmitter<Editor>();
  @Output() contentChange = new EventEmitter<string>();

  private contentChange$ = new Subject<string>();
  private onChange: (value: string) => void = () => {};

  constructor() {}

  ngOnInit(): void {
    this.contentChange$.pipe(debounceTime(300)).subscribe((content) => {
      this.onChange(content);
      this.contentChange.emit(content);
      this.form.get(this.controlName)?.setValue(content);
    });
    this.initTinyMCE();
  }

  // Initialize TinyMCE
  private initTinyMCE(): void {
    console.log('init tinymce');
    this.init = {
      selector: `#${this.editorId}`,
      plugins: this.plugins,
      toolbar: this.toolbar,
      menubar: this.menubar,
      height: this.height,
      placeholder: this.placeholder,
      promotion: false,
      branding: false,
      font_family_formats:
        'Arial=arial,helvetica,sans-serif; Courier New=courier new,courier,monospace; Georgia=georgia,times new roman,times,serif; Tahoma=tahoma,arial,helvetica,sans-serif; Times New Roman=times new roman,times,serif; Verdana=verdana,arial,helvetica,sans-serif',
      font_size_formats: '8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt 48pt',
      content_style:
        'body { font-family: Arial, sans-serif; font-size: 12pt; }',
      setup: (editor: Editor) => {
        editor.on('init', () => {
          editor.setContent(this.initialValue);
          this.editorInit.emit(editor);
        });
        editor.on('change keyup blur', () => {
          const content = editor.getContent();
          this.contentChange$.next(content);
        });
      },
    };
  }
}
