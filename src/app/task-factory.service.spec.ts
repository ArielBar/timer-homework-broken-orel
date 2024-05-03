import { TestBed } from '@angular/core/testing';
import { TaskFactoryService } from './task-factory.service';

describe('TaskFactoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TaskFactoryService = TestBed.get(TaskFactoryService);
    expect(service).toBeTruthy();
  });

  it('should increment the counter by 1 while onIncrement function executed', () => {
    const service: TaskFactoryService = TestBed.get(TaskFactoryService);
    const initialValue = (service as any).counter;
    (service as any).incrementCounter();
    const updatedValue = (service as any).counter;
    expect(updatedValue).toBe(initialValue + 1);
  })

});
