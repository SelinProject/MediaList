import { Pipe } from '@angular/core';

@Pipe({
  name: "search",
  pure: false
})

export class SearchPipe {

  //get search term and the array of list and filter by search term
  transform(value, term: string) {
    if (value == null) {
      return null;
    }
    if (term == null) {
      term = '';
    }
    if (term !== undefined) {
      return value.filter((item) => item.title.toLowerCase().indexOf(term.toLowerCase()) !== -1);
    } else {
      return value;
    }
  }
}
