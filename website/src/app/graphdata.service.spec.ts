import { TestBed, inject } from '@angular/core/testing';

import { GraphdataService } from './graphdata.service';

describe('GraphdataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GraphdataService]
    });
  });

  it('should ...', inject([GraphdataService], (service: GraphdataService) => {
    expect(service).toBeTruthy();
  }));
});
