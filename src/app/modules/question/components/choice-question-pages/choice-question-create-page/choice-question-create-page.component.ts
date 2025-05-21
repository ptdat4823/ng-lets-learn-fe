import { Component } from '@angular/core';
import { CollapsibleListService } from '@shared/components/collapsible-list/collapsible-list.service';

@Component({
  selector: 'choice-question-create-page',
  standalone: false,
  templateUrl: './choice-question-create-page.component.html',
  styleUrl: './choice-question-create-page.component.scss',
  providers: [CollapsibleListService],
})
export class ChoiceQuestionCreatePageComponent {}
