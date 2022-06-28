import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  searchText = "";

  onSearchEntered(text:any) {
    this.searchText = text;
    console.log(this.searchText)
  }
}
