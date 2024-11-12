import { TestBed } from '@angular/core/testing';
import { BdService } from './bd.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

// Step 1: Define a mock class for SQLite
class SQLiteMock {
  create() {
    return Promise.resolve({
      executeSql: (query: string, params: any[]) => Promise.resolve({ rows: [] }) // Mock executeSql to return an empty result
    });
  }
}

describe('BdService', () => {
  let service: BdService;

  beforeEach(() => {
    // Step 2: Use the mock SQLite class in TestBed
    TestBed.configureTestingModule({
      providers: [
        BdService,
        { provide: SQLite, useClass: SQLiteMock } // Use SQLiteMock instead of the actual SQLite
      ]
    });
    service = TestBed.inject(BdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
