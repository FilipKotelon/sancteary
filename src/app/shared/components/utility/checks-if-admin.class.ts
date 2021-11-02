import { NavigationEnd, Router } from '@angular/router'
import { Directive, OnInit } from "@angular/core";
import { filter } from 'rxjs/operators';

@Directive()
export abstract class ChecksIfAdmin implements OnInit {
  public inAdmin = false;

  constructor(protected router: Router){}

  ngOnInit() {
    if(this.router.url.includes('admin')){
      this.inAdmin = true;
    } else {
      this.inAdmin = false;
    }

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((e) => {
      if(e instanceof NavigationEnd){
        if(e.url.includes('admin')){
          this.inAdmin = true;
        } else {
          this.inAdmin = false;
        }
      }
    });
  }
}