import { Location } from '@angular/common';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { CustomerDetailComponent } from '../customer-detail/customer-detail.component';
import { CustomerFormComponent } from '../customer-form/customer-form.component';
import { Customer } from '../shared/customer.model';
import { CustomerMockService } from '../shared/services/customer/customer-mock.service';
import { CustomerService } from '../shared/services/customer/customer.service';
import { CustomerListComponent } from './customer-list.component';

describe('CustomerListComponent', () => {
  let component: CustomerListComponent;
  let fixture: ComponentFixture<CustomerListComponent>;
  let mockCustomerService;
  const customers: Customer[] = [
    { id: 'Test1', name: 'Test1', description: 'Test1', avatar: 'Test1', createdAt: 'Test1' },
    { id: 'Test2', name: 'Test2', description: 'Test2', avatar: 'Test2', createdAt: 'Test2' }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'new', component: CustomerFormComponent }
        ]),
        FormsModule
      ],
      declarations: [
        CustomerListComponent, CustomerDetailComponent, CustomerFormComponent
      ],
      providers: [
        { provide: CustomerService, useClass: CustomerMockService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerListComponent);
    component = fixture.componentInstance;
    mockCustomerService = TestBed.get(CustomerService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.customers).toBeUndefined();
    expect(component.activeCustomer).toBeUndefined();
  });

  it('ngOnInit', () => {
    let expectedCustomers;
    mockCustomerService.getCustomers().subscribe(customerList => expectedCustomers = customerList);
    fixture.detectChanges();
    expect(component.customers).toBe(expectedCustomers);
  });

  it('New customer button click check router', async(inject([Location],
    (location: Location) => {
      fixture.detectChanges();
      const button = fixture.debugElement.query(By.css('button.btn.btn-success'));
      button.nativeElement.click();
      fixture.whenStable().then(() => {
        expect(location.path()).toBe('/new');
      });
    })
  ));

  it('should delete customer', () => {
    component.customers = customers;
    component.activeCustomer = customers[0];
    mockCustomerService.deleteCustomer().subscribe();

    component.deleteCustomer(component.customers[0].id);

    expect(component.customers.length).toBe(1);
    expect(component.activeCustomer).toBeUndefined();
  });
});
