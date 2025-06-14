import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActionButtonComponent } from './action-button.component';
import { MaterialModule } from '../../material/material.module';

describe('ActionButtonComponent', () => {
  let component: ActionButtonComponent;
  let fixture: ComponentFixture<ActionButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionButtonComponent, MaterialModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ActionButtonComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the button text', () => {
    const buttonText = 'Test Button';
    component.text = buttonText;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    expect(button.textContent.trim()).toBe(buttonText);
  });

  it('should emit click event when button is clicked', () => {
    const buttonClickSpy = jest.spyOn(component.buttonClick, 'emit');
    const button = fixture.nativeElement.querySelector('button');
    
    button.click();
    
    expect(buttonClickSpy).toHaveBeenCalled();
  });

  it('should have default empty text', () => {
    expect(component.text).toBe('');
  });
}); 