import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Auth, GoogleAuthProvider, OAuthProvider, signInWithPopup } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  imports: [JsonPipe],
  template: `
    <h1>Angular Firebase Auth Demo</h1>
    <button (click)="googleSignIn()">Sign in with Google</button>
    <button (click)="microsoftSignIn()">Sign in with Microsoft</button>
    <button (click)="signOut()">Sign out</button>
    <hr>
    <h3>User Details</h3>
    <pre style="white-space: pre-wrap;">{{ userJson | json }}</pre>
    @if (error) {
      <h3>Error</h3>
      <pre style="white-space: pre-wrap;">{{ error | json }}</pre>
    }
  `,
  styles: [],
})
export class AppComponent {
  userJson?: {
    displayName?: string | null,
    email?: string | null,
    photoURL?: string | null,
    uid?: string | null,
    token?: string | null,
  } | null;

  error?: any;

  constructor(
    private _auth: Auth,
  ) {}

  signOut() {
    this._auth.signOut();
    this.userJson = null;
    this.error = null;
  }

  ngOnInit() {
    this._auth.onAuthStateChanged(async user => {
      console.log('User:', user);
      this.userJson = user ? {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
        token: await user.getIdToken(),
      } : null;
    });
  }

  googleSignIn() {
    this.signOut();
    signInWithPopup(this._auth, new GoogleAuthProvider());
  }

  microsoftSignIn() {
    this.signOut();
    const provider = new OAuthProvider('microsoft.com');
    signInWithPopup(this._auth, provider)
      .then((result) => {
        console.log('Microsoft sign in result:', result);
      })
      .catch((error) => {
        // Handle error.
        console.error('Microsoft sign in error:', error);
        this.error = error;
      });
  }
}
