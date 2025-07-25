// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { AdminLoginComponent } from './admin-login.component';

// describe('AdminLoginComponent', () => {
//   let component: AdminLoginComponent;
//   let fixture: ComponentFixture<AdminLoginComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [AdminLoginComponent]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(AdminLoginComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminLoginComponent } from './admin-login.component';

describe('AdminLoginComponent', () => {
  let component: AdminLoginComponent;
  let fixture: ComponentFixture<AdminLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminLoginComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
