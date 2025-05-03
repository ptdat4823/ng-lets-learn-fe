import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class RouteService {
  constructor() {}

  getParam(route: ActivatedRoute, key: string): string {
    return route.snapshot.paramMap.get(key) || '';
  }
}
