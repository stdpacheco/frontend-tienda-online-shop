import { closeAlert } from '@shared/alerts/alerts';
import { loadData } from './../alerts/alerts';
import { ACTIVE_FILTERS } from './../../@core/constants/filters';
import { ITableColumns } from '@core/interfaces/table-columns.interface';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DocumentNode } from 'graphql';
import { TablePaginationService } from './table-pagination.service';
import { IResultData, IInfoPage } from '@core/interfaces/result-data.interface';
import { map } from 'rxjs/internal/operators/map';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-table-pagination',
  templateUrl: './table-pagination.component.html',
  styleUrls: ['./table-pagination.component.scss']
})
export class TablePaginationComponent implements OnInit {
  @Input() query: DocumentNode;
  @Input() context: object;
  @Input() itemsPage = 20;
  @Input() include = true;
  @Input() resultData: IResultData;
  @Input() tableColumns: Array<ITableColumns> = undefined;
  @Input() filterActiveValues: ACTIVE_FILTERS = ACTIVE_FILTERS.ACTIVE;
  @Output() manageItem = new EventEmitter<Array<any>>();
  infoPage: IInfoPage;
  data$: Observable<any>;
  loading: boolean;
  constructor(private service: TablePaginationService) { }

  ngOnInit(): void {
    if (this.query === undefined) {
      throw new Error('Query is undefined, please add');
    }
    if (this.resultData === undefined) {
      throw new Error('ResultData is undefined, please add');
    }
    if (this.tableColumns === undefined) {
      throw new Error('Table Columns is undefined, please add');
    }
    this.infoPage = {
      page: 1,
      pages: 1,
      itemsPage: this.itemsPage,
      total: 1
    };
    this.loadData();
  }

  loadData() {
    this.loading = true;
    loadData('Cargando los datos', 'Espera un instante');
    const variables = {
      page: this.infoPage.page,
      itemsPage: this.infoPage.itemsPage,
      include: this.include,
      active: this.filterActiveValues
    };
    this.data$ = this.service.getCollectionData(this.query, variables , {}).pipe(
      map((result: any) => {
        const data = result[this.resultData.definitionKey];
        this.infoPage.pages = data.info.pages;
        this.infoPage.total = data.info.total;
        this.loading = false;
        closeAlert();
        return data[this.resultData.listKey];
      }
    ));
  }

  changePage() {
    this.loadData();
  }

  manageAction(action: string, data: any) {
    this.manageItem.emit([action, data]);
  }

}
