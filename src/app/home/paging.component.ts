import { Component, ViewChild, OnInit} from '@angular/core';
import { IgxGridComponent } from 'igniteui-angular';
import { athletesData } from '../data/athletesData';

@Component({
    selector: 'app-custom-grid-paging-style-sample',
    styleUrls: ['./paging.component.scss'],
    templateUrl: './paging.component.html'
})

export class PagingComponent implements OnInit{
    @ViewChild('grid1', { static: true }) public grid1: IgxGridComponent;
    public data: any[];

    public ngOnInit(): void {
        this.data = athletesData;
    }

    public removeRow(rowIndex) {
        const row = this.grid1.getRowByIndex(rowIndex);
        row.delete();
    }
}
