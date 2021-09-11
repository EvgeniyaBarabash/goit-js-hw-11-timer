import refs from './js/refs.js';
const { daysRef, hoursRef, minsRef, secsRef }=refs;
class CountdownTimer {
  constructor(options) {
    this.targetDate = options.targetDate;
  }
  updateClockFace(time) {
    this.updateTime(time);
    setInterval(() => {
      this.updateTime(time);
    }, 1000);
  }
  updateTime(time) {
    const currentTime = new Date();
    const deltaTime = time - currentTime;

    const days = pad(Math.floor(deltaTime / (1000 * 60 * 60 * 24)));
    const hours = pad(
      Math.floor((deltaTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    );
    const mins = pad(Math.floor((deltaTime % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = pad(Math.floor((deltaTime % (1000 * 60)) / 1000));

    daysRef.textContent = days;
    hoursRef.textContent = hours;
    minsRef.textContent = mins;
    secsRef.textContent = secs;
    function pad(value) {
      return String(value).padStart(2, "0");
    }
    if (deltaTime < 0) {
      this.finish();
    }
  }
  finish(time) {
    clearInterval(this.updateTime(time));
    this.clearClockFace();
  }
  clearClockFace(time) {
   daysRef.textContent = "00";
   hoursRef.textContent = "00";
   minsRef.textContent = "00";
   secsRef.textContent = "00";
  }
}
const timer = new CountdownTimer({
  selector: "#timer-1",
  // targetDate: new Date('Sep 11, 2021 13:35:00'),
  targetDate: new Date("Jan 01, 2022 00:00:00"),
});
timer.updateClockFace(timer.targetDate);
