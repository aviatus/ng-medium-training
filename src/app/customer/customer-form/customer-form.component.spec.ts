import { of } from 'rxjs';

import { Location } from '@angular/common';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { CustomerDetailComponent } from '../customer-detail/customer-detail.component';
import { CustomerListComponent } from '../customer-list/customer-list.component';
import { Customer } from '../shared/customer.model';
import { CustomerMockService } from '../shared/services/customer/customer-mock.service';
import { CustomerService } from '../shared/services/customer/customer.service';
import { CustomerFormComponent } from './customer-form.component';

describe('CustomerFormComponent', () => {

  let component: CustomerFormComponent;
  let fixture: ComponentFixture<CustomerFormComponent>;
  let mockCustomerService;
  const customer = new Customer();
  const id = 'Test1';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule.withRoutes([
          { path: '', component: CustomerListComponent }
        ]),
      ],
      declarations: [
        CustomerFormComponent,
        CustomerListComponent,
        CustomerDetailComponent
      ],
      providers: [
        { provide: CustomerService, useClass: CustomerMockService },
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({ id: id })
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerFormComponent);
    component = fixture.componentInstance;
    component.customer = customer;
    fixture.detectChanges();
    mockCustomerService = TestBed.get(CustomerService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit', () => {
    expect(component.id).toBe(id);
  });

  it('should get customer for id', () => {
    let expectedCustomer;
    mockCustomerService.getCustomer(component.id).subscribe(customer => expectedCustomer = customer);
    fixture.detectChanges();
    expect(component.customer).toBe(expectedCustomer);
  });

  it('should update customer', async(inject([Location],
    (location: Location) => {
      mockCustomerService.updateCustomer(component).subscribe();
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(location.path()).toBe('');
      });
    })
  ));

  it('should check cancel button click router', async(inject([Location],
      (location: Location) => {
        component.customer = customer;
        fixture.detectChanges();
        const button = fixture.debugElement.query(By.css('.btn-danger'));
        button.nativeElement.click();
        fixture.whenStable().then(() => {
          expect(location.path()).toBe('/');
        });
      })
    ));
});
