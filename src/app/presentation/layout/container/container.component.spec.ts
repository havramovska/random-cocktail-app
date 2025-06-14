import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ContainerComponent } from './container.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { MaterialModule } from '@app/presentation/shared/material/material.module';

describe('ContainerComponent', () => {
  let component: ContainerComponent;
  let fixture: ComponentFixture<ContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ContainerComponent,
        HeaderComponent,
        FooterComponent,
        MaterialModule,
        RouterTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the header component', () => {
    const header = fixture.nativeElement.querySelector('app-header');
    expect(header).toBeTruthy();
  });

  it('should render the footer component', () => {
    const footer = fixture.nativeElement.querySelector('app-footer');
    expect(footer).toBeTruthy();
  });

  it('should render the router outlet', () => {
    const routerOutlet = fixture.nativeElement.querySelector('router-outlet');
    expect(routerOutlet).toBeTruthy();
  });

  it('should have the correct layout structure', () => {
    const mainLayout = fixture.nativeElement.querySelector('.main-layout');
    const container = fixture.nativeElement.querySelector('.container');
    const mainContent = fixture.nativeElement.querySelector('.main-content');

    expect(mainLayout).toBeTruthy();
    expect(container).toBeTruthy();
    expect(mainContent).toBeTruthy();
  });
}); 