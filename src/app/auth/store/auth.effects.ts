import { User } from './../models/user.model'
import { handleAuthSuccess, handleError } from './auth.helpers'
import { DbUser } from './../models/db-user.model'
import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore'
import { Router } from '@angular/router'
import { tap, map, catchError, switchMap } from 'rxjs/operators'
import { from, of } from 'rxjs'

import * as AuthActions from '@auth/store/auth.actions'
import { UserRole } from '../models/user.model'

@Injectable()
export class AuthEffects {
  usersCollection: AngularFirestoreCollection;

  constructor(private actions$: Actions, private fireAuth: AngularFireAuth, private fireStore: AngularFirestore, private router: Router){
    this.usersCollection = this.fireStore.collection<DbUser>('users');
  }

  authSignUp = createEffect(
    () => this.actions$.pipe(
      ofType(AuthActions.SIGNUP_START),
      switchMap((signUpAction: AuthActions.SignUpStart) => {
        return from(
          this.fireAuth.createUserWithEmailAndPassword(
            signUpAction.payload.email,
            signUpAction.payload.password
          )
        ).pipe(
          switchMap(userCred => {
            return from(this.usersCollection.add(
                {
                  id: userCred.user.uid,
                  role: UserRole.Client
                }
              )
            ).pipe(
              switchMap((dbUser) => {
                return from(
                  userCred.user.getIdTokenResult()
                ).pipe(
                  map(tokenRes => {
                    return handleAuthSuccess({
                      user: {
                        email: userCred.user.email,
                        userId: userCred.user.uid,
                        token: tokenRes.token,
                        role: UserRole.Client,
                        expirationDate: new Date(tokenRes.expirationTime)
                      },
                      redirectTo: '/profile/dashboard'
                    })
                  }),
                  catchError((error) => {
                    return handleError(error);
                  })
                )
              }),
              catchError((error) => {
                return handleError(error);
              })
            )
          }),
          catchError((error) => {
            return handleError(error);
          })
        )
      })
    )
  )

  authLogIn = createEffect(
    () => this.actions$.pipe(
      ofType(AuthActions.LOGIN_START),
      switchMap((logInAction: AuthActions.LoginStart) => {
        return from(
          this.fireAuth.signInWithEmailAndPassword(
            logInAction.payload.email,
            logInAction.payload.password
          )
        ).pipe(
          switchMap(userCred => {
            return this.usersCollection.get()
            .pipe(
              map(dbUsers => {
                return dbUsers.docs.find(dbUser => {
                  return dbUser.get('id') === userCred.user.uid;
                })
              }),
              switchMap((dbUser) => {
                return from(
                  userCred.user.getIdTokenResult()
                ).pipe(
                  map(tokenRes => {
                    const dbUserRole = dbUser ? dbUser.get('role') as UserRole : UserRole.Client;
                    
                    return handleAuthSuccess({
                      user: {
                        email: userCred.user.email,
                        userId: userCred.user.uid,
                        token: tokenRes.token,
                        role: dbUserRole,
                        expirationDate: new Date(tokenRes.expirationTime)
                      },
                      redirectTo: dbUserRole === UserRole.Admin ? '/admin' : '/profile/dashboard'
                    })
                  }),
                  catchError((error) => {
                    return handleError(error);
                  })
                )
              }),
              catchError((error) => {
                return handleError(error);
              })
            )
          }),
          catchError((error) => {
            return handleError(error);
          })
        )
      })
    )
  )

  authSuccess = createEffect(
    () => this.actions$.pipe(
      ofType(AuthActions.AUTH_SUCCESS),
      tap((authSuccessAction: AuthActions.AuthSuccess) => {
        if(authSuccessAction.payload.redirectTo){
          this.router.navigate([authSuccessAction.payload.redirectTo])
        }
      })
    ),
    {
      dispatch: false
    }
  )

  authAutoLogin = createEffect(
    () => this.actions$.pipe(
      ofType(AuthActions.AUTO_LOGIN),
      switchMap(() => {
        const savedUser = localStorage.getItem('loggedInUser');

        //Don't log in if no user
        if(!savedUser){
          return of(
            { type: 'DUMMY' }
          ).pipe(
            map(action => {
              return {type: 'DUMMY'}
            })
          )
        }

        const userData : {
          email: string,
          id: string,
          role: UserRole,
          _token: string,
          _tokenExpirationDate: Date
        } = JSON.parse(savedUser);

        const user = new User(
          userData.email,
          userData.id,
          userData.role,
          userData._token,
          userData._tokenExpirationDate
        )

        return this.usersCollection.get()
          .pipe(
            map(dbUsers => {
              return dbUsers.docs.find(dbUser => {
                return dbUser.get('id') === user.id;
              })
            }),
            map(
              dbUser => {
                //Protect from cheeky users editing localStorage to give themselves admin rights
                const dbUserRole = dbUser ? dbUser.get('role') as UserRole : UserRole.Client;
                    
                return handleAuthSuccess({
                  user: {
                    email: user.email,
                    userId: user.id,
                    token: user.token,
                    role: dbUserRole,
                    expirationDate: userData._tokenExpirationDate
                  },
                  redirectTo: null
                })
              }
            )
          )
      })
    )
  )
}