import { Component, OnInit, Input, Output, Injectable, EventEmitter } from '@angular/core';
import { PagerService } from '../../../app/Service/pager/pager.service';

declare var $: any;

@Component({
  selector: 'pager-item',
  providers: [PagerService],
  template: `<div>
        <div class="text-center">
            <!-- items being paged -->
            <!-- pager -->
            <ul *ngIf="pager.pages && pager.pages.length > 1" class="pagination">
                <li [ngClass]="{disabled:pager.currentPage === 1}">
                    <a (click)="setPage(pager.currentPage - 1)"><</a>
                </li>
                <li *ngFor="let page of pager.pages" [ngClass]="{active:pager.currentPage === page}">
                    <a (click)="setPage(page)">{{page}}</a>
                </li>
                <li [ngClass]="{disabled:pager.currentPage === pager.totalPages}">
                    <a (click)="setPage(pager.currentPage + 1)">></a>
                </li>
            </ul>
    </div>
  </div>`
})

@Injectable()
export class PagerItemComponent implements OnInit {
  @Input() pageSize;
  // array of all items to be paged
  @Input() totalItemCount;
  // paged items
  @Input() totalPageNumber;
  @Input() medias;

  @Output() mediaList = new EventEmitter();
  // pager object
  pager: any = {};
  public static page: string;
  // paged items
  pagedItems: any[];
  constructor(private pagerService: PagerService) {
  }

  ngOnInit() {
    // initialize to currentPage
    this.setPage(1);
  }

  ngOnChanges(...args: any[]) {
    if (args[0].pageSize != null && typeof (args[0].pageSize) != 'undefined' &&
      typeof (args[0].pageSize.previousValue) != 'object' && args[0].pageSize.currentValue != args[0].pageSize.previousVaue) {
      this.setPage(1);
    } else if (args[0].totalItemCount != null && args[0].totalItemCount != 'undefined') {

      this.setPage(1);
    }
  }



  //set page in pager
  setPage(page: number) {
    //calculate again not synchronous work
    var totalPageNumber = Math.floor((this.totalItemCount / parseInt(this.pageSize))) + 1;
    if (this.totalPageNumber != totalPageNumber) { this.totalPageNumber = totalPageNumber }

    if (page < 1 || page > this.totalPageNumber) {
      return;
    }
    // get pager object from service
    this.pager = this.pagerService.getPager(this.totalItemCount, page, this.pageSize, this.totalPageNumber);
    PagerItemComponent.page = this.pager;
    // get current page of items
    this.pagedItems = this.medias.slice(this.pager.startIndex, this.pager.endIndex + 1);
    if (this.totalPageNumber > 1) {
      this.mediaList.emit(page - 1);
    }
  }

}
