import { CursorService } from '@core/services/cursor.service'
import { CustomCursorComponent } from './custom-cursor.component'
import { ComponentFixture, TestBed } from '@angular/core/testing'

describe('CustomCursorComponent', () => {
  let fixture: ComponentFixture<CustomCursorComponent>;
  let component: CustomCursorComponent;
  let compiled: HTMLElement;
  let cursorSvc: CursorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CustomCursorComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomCursorComponent);
    component = fixture.componentInstance;
    cursorSvc = fixture.debugElement.injector.get(CursorService);
    compiled = fixture.debugElement.nativeElement;
  })

  it('should create a custom cursor component', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  })

  it('should display a message from the cursor service', () => {
    component.ngOnInit();
    cursorSvc.enlargeCursor('Explore');
    fixture.detectChanges();
    expect(
      compiled.querySelector('.custom-cursor__msg').textContent
    ).toContain(cursorSvc.msg);
  })

  it('should have a "large" css class when the isLarge property is true for the service', () => {
    component.ngOnInit();
    cursorSvc.enlargeCursor('Explore');
    fixture.detectChanges();
    expect(
      compiled.querySelector('.custom-cursor').classList
    ).toContain('large');
  })

  it('should change the cursorEl position to match the MouseEvent client coordinates', () => {
    component.followCursor(<MouseEvent>{clientY: 10, clientX: 10})
    fixture.detectChanges();

    expect((<HTMLElement>compiled.querySelector('.custom-cursor')).style.top)
      .toEqual('10px')
    expect((<HTMLElement>compiled.querySelector('.custom-cursor')).style.left)
      .toEqual('10px')
  })
})