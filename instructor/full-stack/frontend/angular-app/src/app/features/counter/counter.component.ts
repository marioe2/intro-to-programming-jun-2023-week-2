import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectCounterCurrent } from './state';
import { CounterAction } from './state/counter.actions';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css'],
})
export class CounterComponent {
  current = this.store.selectSignal(selectCounterCurrent);

  constructor(private store: Store) {}

  increment() {
    this.store.dispatch(CounterAction.incremented());
  }

  decrement() {
    this.store.dispatch(CounterAction.decremented());
  }
}
