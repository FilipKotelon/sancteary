import { take } from 'rxjs/operators'
import { User, UserRole } from './../../../auth/models/user.model'
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations'
import { MockStore, provideMockStore } from '@ngrx/store/testing'
import { NavFrameComponent } from './nav-frame.component'
import { ComponentFixture, TestBed } from '@angular/core/testing'

import * as AuthActions from '@auth/store/auth.actions'

describe('NavFrameComponent', () => {
  let fixture: ComponentFixture<NavFrameComponent>;
  let component: NavFrameComponent;
  let compiled: HTMLElement;
  let store: MockStore;

  let initialState = {
    auth: {
      user: null,
      loading: false
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        NoopAnimationsModule,
      ],
      declarations: [
        NavFrameComponent
      ],
      providers: [
        provideMockStore({ initialState })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NavFrameComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    store = TestBed.inject(MockStore);
  })

  it('should create a nav frame component', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  })

  it('should open full nav', () => {
    component.openFullNav();
    fixture.detectChanges();
    expect(component.fullNavOpen).toBeTrue();
  })

  it('should close full nav', () => {
    component.fullNavOpen = true;
    component.closeFullNav();
    fixture.detectChanges();
    expect(component.fullNavOpen).toBeFalse();
  })

  it('should have userLoggedIn property set to true when there is a user in the store', () => {
    component.ngOnInit();
    store.setState({
      auth: {
        user: new User('', '', UserRole.Client, '', new Date())
      }
    })
    fixture.detectChanges();
    expect(component.userLoggedIn).toBeTrue();
  })

  it('should have userLoggedIn property set to false when there is no user in the store', () => {
    component.ngOnInit();
    store.setState({
      auth: {
        user: null
      }
    })
    fixture.detectChanges();
    expect(component.userLoggedIn).toBeFalse();
  })

  it('should dispatch a Logout action on logOut', async () => {
    const storeSpy = spyOn(store, 'dispatch').and.callThrough();
    component.logOut();
    fixture.detectChanges();
    expect(storeSpy).toHaveBeenCalledOnceWith(
      new AuthActions.Logout()
    )
  })
})