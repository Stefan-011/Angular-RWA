import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, of } from 'rxjs';
import * as ShopAction from '../../app/store/shop.action';
import { AppState } from '../app.state';
import { Sponzor } from '../models/Sponzor';
import { SponzorService } from '../services/sponzor.service';

@Injectable()
export class ShopEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private SponzorService: SponzorService
  ) {}

  GetSponzorList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShopAction.GetSponzorList),
      mergeMap(() =>
        this.SponzorService.GetAll().pipe(
          map((SponzorList: Sponzor[]) => {
            return ShopAction.SetSponzorList({ SponzorList: SponzorList });
          }),
          catchError(() => {
            return of({ type: 'load error' });
          })
        )
      )
    )
  );
}
