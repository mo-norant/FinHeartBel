import { TestBed, inject } from '@angular/core/testing';

import { EcgtoolkitService } from './ecgtoolkit.service';

describe('EcgtoolkitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EcgtoolkitService]
    });
  });

  it('should ...', inject([EcgtoolkitService], (service: EcgtoolkitService) => {
    expect(service).toBeTruthy();
  }));
});
