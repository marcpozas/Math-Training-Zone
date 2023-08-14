import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { OperationDataset } from '../models/OperationDataset';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  public getSubdataset1(): Observable<OperationDataset[]> {
    return this.http.get<any[]>('/assets/datasets/final_operations_dataset.json').pipe(
      map(data => data.map(item => ({
        operation: item.raw,
        solution: item.solution,
        signs: item.signs,
        numbers: item.numbers,
        difficulty: item.normalized_score
      })))
    );
  }

  public getSubset(name: string): Observable<OperationDataset[]> {
    return this.http.get<any[]>(`/assets/datasets/${name}.json`).pipe(
      map(data => data.map(item => ({
        operation: item.raw,
        solution: item.solution,
        signs: item.signs,
        numbers: item.numbers,
        difficulty: item.normalized_score
      })))
    );
  }
}