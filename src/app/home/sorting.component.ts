/* eslint-disable @typescript-eslint/naming-convention */
import { Component } from '@angular/core';


// eslint-disable-next-line no-shadow
enum TYPE {
    SINGLE = 'single',
    MULTI = 'multiple'
}
@Component({
    selector: 'app-grid-sorting-styling',
    styleUrls: ['./sorting.component.scss'],
    templateUrl: './sorting.component.html'
})

export class SortingComponent {}