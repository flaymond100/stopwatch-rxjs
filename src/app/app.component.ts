import { Component } from "@angular/core";
import { timer } from "rxjs";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  public resetBtn: boolean = false;
  public displayTimer;
  public isRunning: boolean = false;
  public startStop = "Start";
  public waitBtn = "Wait";
  public reset = "Reset";
  public time;
  public clickStream;
  public name = "Stopwatch Online";

  private clicks = 0;
  private clickTimeout = null;

  wait(event): void {
    this.clicks++;
    if (this.clickTimeout) {
      if (this.clicks <= 2) {
        this.setClickTimeout;
        this.waitButton();
      } else {
        this.setClickTimeout(() => {});
      }
    } else {
      this.setClickTimeout(() => {});
    }
  }

  setClickTimeout(cb) {
    clearTimeout(this.clickTimeout);
    this.clickTimeout = setTimeout(() => {
      this.clickTimeout = null;
      this.clicks = 0;
      cb();
    }, 300);
  }

  ngOnInit(): void {
    this.time = 0;
    const sub = this.stopwatch();
  }

  waitButton() {
    this.isRunning = !this.isRunning;
    this.resetBtn = !this.resetBtn;
  }

  toggleTimer() {
    if (!this.resetBtn) {
      this.isRunning = !this.isRunning;
      this.resetBtn = !!this.isRunning;
    } else {
      this.time = 0;
      this.isRunning = !this.isRunning;
    }
  }

  resetValue() {
    this.time = -1;
    this.isRunning = !!this.isRunning;
  }

  stopwatch() {
    timer(0, 1000).subscribe(ellapsedCycles => {
      if (this.isRunning) {
        this.time++;
        this.getDisplayTimer(this.time);
        this.startStop = "Stop";
      } else if (!!this.startStop) {
        this.getDisplayTimer(this.time);
        this.startStop = "Start";
      } else if (!this.isRunning) {
        console.log("it works");
      }
    });
  }

  getDisplayTimer(time: number) {
    var hours = "" + Math.floor(time / 3600);
    var minutes = "" + Math.floor((time % 3600) / 60);
    var seconds = "" + Math.floor((time % 3600) % 60);

    if (Number(hours) < 10) {
      hours = "0" + hours;
    } else {
      hours = "" + hours;
    }
    if (Number(minutes) < 10) {
      minutes = "0" + minutes;
    } else {
      minutes = "" + minutes;
    }
    if (Number(seconds) < 10) {
      seconds = "0" + seconds;
    } else {
      seconds = "" + seconds;
    }

    this.displayTimer = hours + ":" + minutes + ":" + seconds;
  }
}
