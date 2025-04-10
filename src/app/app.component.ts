import { Component } from '@angular/core';

interface Trip {
  from: string;
  to: string;
}

interface TripRender {
  fromCode: string;
  toCode: string;
  level: number;
  isArrow: boolean;
  isRepeat: boolean;
} 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  trips: Trip[] = [];
  renderedTrips: TripRender[] = [];

  newTrip: Trip = { from: '', to: '' };

  addTrip() {
    if (this.newTrip.from && this.newTrip.to) {
      this.trips.push({ ...this.newTrip });
      this.renderedTrips = this.processTrips(this.trips);
      this.newTrip = { from: '', to: '' };
    }
  }

  private processTrips(trips: Trip[]): TripRender[] {
    const renderData: TripRender[] = [];

    for (let i = 0; i < trips.length; i++) {
      const current = trips[i];
      const prev = trips[i - 1];

      const fromCode = current.from.substring(0, 3).toUpperCase();
      const toCode = current.to.substring(0, 3).toUpperCase();

      let level = 1;
      let isArrow = false;
      let isRepeat = false;

      if (prev) {
        const prevFrom = prev.from.substring(0, 3).toUpperCase();
        const prevTo = prev.to.substring(0, 3).toUpperCase();

        if (prev.to === current.from) {
          isArrow = false;
          level = 1;
        } else if (prev.from === current.from && prev.to === current.to) {
          level = 2;
          isRepeat = true;
        } else {
          isArrow = true;
          level = 1;
        }
      }

      renderData.push({
        fromCode,
        toCode,
        level,
        isArrow,
        isRepeat,
      });
    }

    return renderData;
  }
}
