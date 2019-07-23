import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  // Variable qui contient toutes les variables du formulaire
  AddQuizz : FormGroup;

  error_messages = {
    'theme': [
      { type: 'required', message: 'The theme is required.' }
    ],
    'type': [
      { type: 'required', message: 'The type is required.' }
    ],
    'difficulty': [
      { type: 'required', message: 'The difficulty is required.' }
    ],
    'image': [
      { type: 'required', message: 'Path of the image is required.' }
    ],
    'question': [
      { type: 'required', message: 'The question is required.' },
      { type: 'minLength', message: 'The minimal length of the question is 5.' },
      { type: 'maxLength', message: 'The maximal length of the question is 70.' }
    ],
    'answer': [
      { type: 'required', message: 'An answer is required.' },
      { type: 'maxLength', message: 'The maximal length of the answer is 40.' }
    ],
    'option_1': [
      { type: 'maxLength', message: 'The maximal length of the answer is 40.' }
    ],
    'option_2': [
      { type: 'maxLength', message: 'The maximal length of the answer is 40.' }
    ],
    'option_3': [
      { type: 'maxLength', message: 'The maximal length of the answer is 40.' }
    ],
    'option_4': [
      { type: 'maxLength', message: 'The maximal length of the answer is 40.' }
    ]
  }

  constructor(private formBuilder: FormBuilder, private db: DatabaseService) {
    this.AddQuizz = this.formBuilder.group({

      theme: new FormControl('', Validators.compose([
        Validators.required
      ])),

      type: new FormControl('', Validators.compose([
        Validators.required
      ])),

      difficulty: new FormControl('', Validators.compose([
        Validators.required
      ])),

      image: new FormControl('', Validators.compose([
        Validators.required
      ])),

      question: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(70)
      ])),

      answer: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(70)
      ])),

      option_1: new FormControl('', Validators.compose([
        Validators.maxLength(40)
      ])),

      option_2: new FormControl('', Validators.compose([
        Validators.maxLength(40)
      ])),

      option_3: new FormControl('', Validators.compose([
        Validators.maxLength(40)
      ])),

      option_4: new FormControl('', Validators.compose([
        Validators.maxLength(40)
      ])),

      status: new FormControl('', Validators.compose([
      ]))

    });
  }

  ngOnInit() {
  }

  SendQuizz() {

    this.db.addQuizzDB(
      this.AddQuizz.get('theme').value,
      this.AddQuizz.get('type').value,
      this.AddQuizz.get('difficulty').value,
      this.AddQuizz.get('image').value,
      this.AddQuizz.get('question').value,
      this.AddQuizz.get('answer').value,
      this.AddQuizz.get('option_1').value,
      this.AddQuizz.get('option_2').value,
      this.AddQuizz.get('option_3').value,
      this.AddQuizz.get('option_4').value,
      this.AddQuizz.get('status').value
    );

    this.AddQuizz.reset();

  }
  
  DestroyDatabase() {
    this.db.deleteDatabase();
  }
  
}
