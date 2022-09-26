import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TournamentRoutingModule } from './tournament-routing.module';
import { TournamentComponent } from './tournament.component';
import { DisplayComponent } from './pages/display/display.component';


import {TableModule} from 'primeng/table';
import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {DialogModule} from 'primeng/dialog';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import {InputTextModule} from 'primeng/inputtext';
import {ProgressBarModule} from 'primeng/progressbar';
import {DropdownModule} from 'primeng/dropdown';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ChipModule } from 'primeng/chip';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import {ConfirmPopupModule} from 'primeng/confirmpopup';


//PIPE
import { CategoryIDPipe } from 'src/app/pipes/category-id.pipe';
import { CategoryColorsPipe } from 'src/app/pipes/category-colors.pipe';
import { StatusIDPipe } from 'src/app/pipes/status-id.pipe';
import { StatusColorsPipe } from 'src/app/pipes/status-colors.pipe';
import { DetailsComponent } from './pages/details/details.component';


@NgModule({
  declarations: [
    TournamentComponent,
    DisplayComponent,
    CategoryIDPipe,
    CategoryColorsPipe,
    StatusIDPipe,
    StatusColorsPipe,
    DetailsComponent,
  ],
  imports: [
    CommonModule,
    TournamentRoutingModule,
    TableModule,
    CalendarModule,
		SliderModule,
		DialogModule,
		MultiSelectModule,
		ContextMenuModule,
		DropdownModule,
		ButtonModule,
		ToastModule,
    InputTextModule,
    ProgressBarModule,
    HttpClientModule,
    FormsModule,
    ChipModule,
    CardModule,
    DividerModule,
    ConfirmPopupModule,
  ]
})
export class TournamentModule { }
