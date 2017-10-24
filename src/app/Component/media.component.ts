import { Component } from '@angular/core';
//Service
import { MediaService } from '../../app/Service/media/media.service';
import { PagerService } from '../../app/Service/pager/pager.service';

@Component({
  selector: 'app-media',
  providers: [MediaService],
  template: `
      <div class="container">
        <h1> List of Medias</h1>
        <search-item (searchText)="term = $event"></search-item>
        <!-- Searching - No Paging-->
        <div *ngIf="term != null && term != undefined && term.length > 0">
          <div  *ngFor="let media of medias | search : term" class="frame">
            <h4 >{{media.title}}</h4>
            <div><img  class="img-responsive" src="{{media.thumbnailUrl}}" alt="{{media.title}}"  ></div>
          </div>
        </div>
        <!-- No searching - Paging -->
        <div *ngIf=" term.length == 0">
          <div  *ngFor="let media of mediasByPagination | search : term" class="frame">
            <h4 >{{media.title}}</h4>
            <div><img  class="img-responsive" src="{{media.thumbnailUrl}}" alt="{{media.title}}"  ></div>
          </div>
        </div>
      </div>
      <div *ngIf="medias">
         <pager-item [pageSize]="pageSize" [totalItemCount]="numberOfElements" [totalPageNumber]="totalPageNumber" [medias]="medias" (mediaList)="getMediaByPage($event, pageSize)"> </pager-item>
      </div>
  `,
})
export class MediaComponent {
  private medias:any; // declare for showing all media data
  private mediasByPagination:any; // media data by pager 	principle
  private currentPage:any; // declare currentPage
  private pageSize: any;
  private totalPageNumber:any;
  private numberOfElements:any;
  private term: string;

  constructor(public mediaService: MediaService) {

    this.pageSize = 10; // every page  shown number of ten medias
    this.currentPage = 0; // initialize current page is 0
    this.getMediasWithDetail(); // get all mediaList from service
  }

  // Get all MediaList
  getMediasWithDetail() {
    this.mediaService.getMediaWithDetail()
      .subscribe(medias => {
        this.medias = medias; // all medialist data
        this.mediasByPagination = medias.slice(this.currentPage, this.pageSize); // set first 10 medias
        this.totalPageNumber = medias.length / this.pageSize - 1; //total page size
        this.numberOfElements = medias.length - 1; //total  number of media
      });
  }

  // Get Medai by depending on page
  getMediaByPage(currentPage, pageSize) {
    this.currentPage = currentPage;
    this.showMediasByPage(currentPage, pageSize);
  }

  // show media data by depending on currentPage and pageSize
  showMediasByPage(currentPage, pageSize) {
    //reset search terms when page changes
    if (this.term != null ) {
      this.term = '';
      (document.getElementById("searchValue") as HTMLTextAreaElement).value = '' ;
    }
    this.mediasByPagination = this.medias.slice(((pageSize * (currentPage + 1)) - pageSize), pageSize * (currentPage + 1));
  }

}
