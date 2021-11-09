import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CursorService{
  private _isLarge = false;
  private _msg = '';
  changedSize = new Subject<boolean>();
  changedMsg = new Subject<string>();

  get isLarge() {
    return this._isLarge;
  }

  get msg() {
    return this._msg;
  }

  enlargeCursor = (msg: string) => {
    this._isLarge = true;
    this._msg = msg;

    this.changedMsg.next(this.msg);
    this.changedSize.next(this.isLarge);
  }

  normalizeCursor = () => {
    this._isLarge = false;
    this._msg = ''

    this.changedMsg.next(this.msg);
    this.changedSize.next(this.isLarge);
  }
}