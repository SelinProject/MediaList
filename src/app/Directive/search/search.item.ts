import { Component ,Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'search-item',
  template:`<input type="text" class="form-control" placeholder="Start typing to search " style="color:black;" (input)="searchText.emit(input.value)" id="searchValue" #input>`

})
export class SearchItemComponent{
  @Output() searchText = new EventEmitter();

  ngOnInit(){
    this.searchText.emit('');
  }
}
