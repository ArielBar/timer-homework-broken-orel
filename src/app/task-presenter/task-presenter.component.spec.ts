import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TaskPresenterComponent } from './task-presenter.component';
import { Pipe, PipeTransform } from '@angular/core';
import { of } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

describe('TaskPresenterComponent', () => {
  let component: TaskPresenterComponent;
  let fixture: ComponentFixture<TaskPresenterComponent>;
  @Pipe({ name: 'minuteSeconds' })
  class MockPipe implements PipeTransform {
    transform(value: number): number {
      return value;
    }
  }
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TaskPresenterComponent, MockPipe],
      imports: [MatIconModule, MatCardModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskPresenterComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should render task', () => {
    // Arrange
    component.task = {
      id: 1,
      name: 'some name',
      buttonText: 'pause',
      timer: of(10),
    };
    // Act
    fixture.detectChanges();

    // Assert
    expect(fixture.nativeElement).toMatchSnapshot();
  });

  it('should display name in uppercase', () => {
    const text = 'test1';
    component.task = { id: 1, name: text, buttonText: 'pause', timer: of(1) };
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.input-name');
    expect(element.textContent).toContain(text.toUpperCase());
  });

  it('should emit clicked event when button is clicked', () => {
    component.task = { id: 1, name: 'test', buttonText: 'pause', timer: of(1) };
    const emitSpy = jest.spyOn(component.clicked, 'emit');
    const buttonElement: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    buttonElement.click();
    expect(emitSpy).toHaveBeenCalled();
  });
});
