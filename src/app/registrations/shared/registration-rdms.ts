import {Registration} from './registration';

export class RegistrationRdms extends Registration {
  allCount: number;
  onCheckingCount: number;
  checkedDudCount: number;
  plan: number;
  toMake: number;
  toMakeUnchecked: number;
  isCompleted: boolean;
  mayBeCompleted: boolean;

  constructor() {
    super();
    this.allCount = 0;
    this.onCheckingCount = 0;
    this.checkedDudCount = 0;
    this.plan = 5;
    this.toMake = this.getToMake();
    this.toMakeUnchecked = this.getToMakeUnchecked();
    this.isCompleted = this.getIsCompleted();
    this.mayBeCompleted = this.getMayBeCompleted();
  }

  public getToMake(): number {
    return this.plan - this.checkedDudCount;
  }

  public getToMakeUnchecked(): number {
    return this.getToMake() - this.onCheckingCount;
  }

  public getIsCompleted(): boolean {
    return this.getToMake() <= 0;
  }

  public getMayBeCompleted(): boolean {
    return this.getToMakeUnchecked() <= 0;
  }
}
