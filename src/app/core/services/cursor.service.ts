import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CursorService{
  private isLarge = false;
  private msg = '';
  changedSize = new Subject<boolean>();
  changedMsg = new Subject<string>();

  enlargeCursor = (msg: string) => {
    this.isLarge = true;
    this.msg = msg;

    this.changedMsg.next(this.msg);
    this.changedSize.next(this.isLarge);
  }

  normalizeCursor = () => {
    this.isLarge = false;
    this.msg = ''

    this.changedMsg.next(this.msg);
    this.changedSize.next(this.isLarge);
  }
}