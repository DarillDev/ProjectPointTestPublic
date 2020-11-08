import { Component, Input, OnInit } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ICompanyProfile } from '../../models';

enum EDataState {
  peinding,
  success,
  empty,
  error,
}

@Component({
  selector: 'app-test-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss']
})
export class CompanyProfileComponent implements OnInit {
  @Input() dataSource: Observable<ICompanyProfile>;
  dataState: EDataState = EDataState.peinding;
  profile: ICompanyProfile;
  sub: any;
  constructor() { }

  ngOnInit(): void {
    this.sub = this.dataSource.pipe(
      catchError(err => {
        this.dataState = EDataState.error;
        return EMPTY;
      })
    ).subscribe(data => {
      if (isEmpty(data)){
        this.dataState = EDataState.empty;
        return null;
      } else {
        this.dataState = EDataState.success;
        this.profile = data;
      }
    });
  }
}


function isEmpty(obj): boolean {
  for (const prop  in obj) {
    if (obj.hasOwnProperty(prop)) {
      return false;
    }
  }
  return JSON.stringify(obj) === JSON.stringify({});
}