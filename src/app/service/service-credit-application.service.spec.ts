import { TestBed } from '@angular/core/testing';

import { ServiceCreditApplicationService } from './service-credit-application.service';

describe('ServiceCreditApplicationService', () => {
  let service: ServiceCreditApplicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceCreditApplicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
