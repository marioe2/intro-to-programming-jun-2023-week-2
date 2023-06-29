import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent {
  @Output() itemAdded = new EventEmitter<string>();

  form = new FormGroup({
    description: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ],
    }),
  });

  get description() {
    return this.form.controls.description;
  }

  addItem() {
    if (this.form.valid) {
      this.itemAdded.emit(this.description.value);
    } else {
      console.log(this.form.controls.description.errors);
    }
  }
}
