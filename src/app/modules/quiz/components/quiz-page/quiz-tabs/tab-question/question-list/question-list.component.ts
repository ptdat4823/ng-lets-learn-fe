import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { Question } from '@shared/models/question';

@Component({
  selector: 'question-list',
  standalone: false,
  templateUrl: './question-list.component.html',
  styleUrl: './question-list.component.scss',
})
export class QuestionListComponent implements OnInit {
  @Input() questions: Question[] = [];

  questionIndexMap: { [key: string]: number } = {};
  isEditing: boolean = false;
  oldQuestions: Question[] = [];

  ngOnInit() {
    this.updateQuestionIndex(this.questions);
    this.oldQuestions = [...this.questions];
  }

  updateQuestionIndex(questions: Question[]) {
    questions.forEach((question, index) => {
      this.questionIndexMap[question.id] = index + 1;
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    this.isEditing = true;
    moveItemInArray(this.questions, event.previousIndex, event.currentIndex);
    this.updateQuestionIndex(this.questions);
  }

  onSave() {
    this.isEditing = false;
    // Save the new order of questions to the server or perform any other action
    console.log('New order of questions:', this.questions);
  }

  onCancel() {
    this.isEditing = false;
    this.questions = [...this.oldQuestions];
    this.updateQuestionIndex(this.questions);
  }
}
