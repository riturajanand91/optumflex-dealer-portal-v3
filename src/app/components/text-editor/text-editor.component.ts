import { Component, OnDestroy, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Validators, Editor, Toolbar, NgxEditorModule } from 'ngx-editor';
import jsonDoc from './doc';
import { toHTML, toDoc } from 'ngx-editor';
import { debounceTime } from 'rxjs/operators'; // Import debounceTime

@Component({
  selector: 'app-text-editor',
  standalone: true,
  imports: [NgxEditorModule, FormsModule, ReactiveFormsModule],
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss']
})
export class TextEditorComponent implements OnInit, OnDestroy, OnChanges {
  @Output() contentChange = new EventEmitter<string>();
  @Input() initialContent: string | null = null; // New input property for initial content
  editordoc = jsonDoc;
  editor: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
    ['horizontal_rule', 'format_clear'],
    ['indent', 'outdent'],
    ['superscript', 'subscript'],
    ['undo', 'redo'],
  ];
  locals: Record<string, string> = {
    bold: 'Bold',
    italic: 'Italic',
    underline: 'Underline',
    strike: 'Strike',
    code: 'Code',
    blockquote: 'Blockquote',
    bullet_list: 'Bullet List',
    ordered_list: 'Ordered List',
    heading: 'Heading',
    h1: 'Header 1',
    h2: 'Header 2',
    h3: 'Header 3',
    h4: 'Header 4',
    h5: 'Header 5',
    h6: 'Header 6',
    align_left: 'Left Align',
    align_center: 'Center Align',
    align_right: 'Right Align',
    align_justify: 'Justify',
    text_color: 'Text Color',
    background_color: 'Background Color',
    horizontal_rule: 'Horizontal Rule',
    format_clear: 'Clear Formatting',
    insertLink: 'Insert Link',
    removeLink: 'Remove Link',
    insertImage: 'Insert Image',
    indent: 'Increase Indent',
    outdent: 'Decrease Indent',
    superscript: 'Superscript',
    subscript: 'Subscript',
    undo: 'Undo',
    redo: 'Redo',
    url: 'URL',
    text: 'Text',
    openInNewTab: 'Open in New Tab',
    insert: 'Insert',
    altText: 'Alt Text',
    title: 'Title',
    remove: 'Remove',
    enterValidUrl: 'Please enter a valid URL',
  };
  form = new FormGroup({
    editorContent: new FormControl(
      { value: jsonDoc, disabled: false }
    ),
  });

  get doc(): AbstractControl {
    return this.form.get('editorContent')!;
  }

  ngOnInit(): void {
    this.editor = new Editor();

    // Subscribe to value changes of the editor content with debounce
    this.doc.valueChanges.pipe(
      debounceTime(300) // Adjust the debounce time as needed (in milliseconds)
    ).subscribe(value => {
      this.emitContent(value);
    });

    // Set initial content if provided
    if (this.initialContent) {
      try {
        // Assuming initialContent is in HTML format, convert it to the expected format
        let convertedTojsonDoc = toDoc(this.initialContent);
        this.doc.setValue(convertedTojsonDoc);
      } catch (error) {
        console.error("Error setting initial content:", error);
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialContent'] && changes['initialContent'].currentValue) {
      try {
        this.doc.setValue(changes['initialContent'].currentValue);
      } catch (error) {
        console.error("Error updating content:", error);
      }
    }
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  // Emit the content in HTML format
  // Emit the content in HTML format
  emitContent(value: any): void {
    if (!value) {
        // Handle undefined or null values
        this.contentChange.emit('');
        return;
    }

    try {
        // Check if the value is already in HTML format
        const html = (typeof value === 'string' && value.trim().startsWith('<')) ? value : toHTML(value);
        this.contentChange.emit(html); // Emit the content
    } catch (error) {
        console.error("Error emitting content:", error);
    }
}
}