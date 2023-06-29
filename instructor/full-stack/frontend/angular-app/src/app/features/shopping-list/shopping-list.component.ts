import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CreateComponent } from './components/create/create.component';
import { ListComponent } from './components/list/list.component';
import { ShoppingListItemModel } from './models';

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  imports: [CommonModule, RouterModule, CreateComponent, ListComponent],
})
export class ShoppingListComponent {
  shoppingList = signal([
    { id: '1', description: 'Shampoo', purchased: false },
    { id: '2', description: 'Lettuce', purchased: true },
  ]);

  onItemAdded(description: string) {
    // TODO - mutate our signal.
    console.log(`We got a new item ${description}`);
    const itemToAdd: ShoppingListItemModel = {
      id: crypto.randomUUID(),
      description: description,
      purchased: false,
    };

    this.shoppingList.mutate((list) => list.unshift(itemToAdd));
  }
}
