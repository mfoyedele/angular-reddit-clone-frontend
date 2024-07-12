import { Component, OnInit } from '@angular/core';
import { DATA } from '../data/nwindData';

@Component({
  selector: 'app-grid-filtering-style',
  styleUrls: ['./filtering.component.scss'],
  templateUrl: './filtering.component.html'
})
export class FilteringComponent implements OnInit {
    public data: any[];

    constructor() {
    }
    public ngOnInit(): void {
        this.data = DATA;
    }

    public formatDate(val: Date) {
        return new Intl.DateTimeFormat('en-US').format(val);
    }

    public formatCurrency(val: string) {
        return parseInt(val, 10).toFixed(2);
    }
}
