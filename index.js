class CountdownTimer {
  constructor(options) {
    this.selector = options.selector;
    this.targetDate = options.targetDate;
  }
  changeTime() {
    const refs = document.querySelector(`${this.selector}`);

    const daysRef = refs.querySelector('[data-value = "days"]');
    const hoursRef = refs.querySelector('[data-value = "hours"]');
    const minsRef = refs.querySelector('[data-value = "mins"]');
    const secsRef = refs.querySelector('[data-value = "secs"]');

    return { daysRef, hoursRef, minsRef, secsRef };
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

    const refs = this.changeTime();
    refs.daysRef.textContent = days;
    refs.hoursRef.textContent = hours;
    refs.minsRef.textContent = mins;
    refs.secsRef.textContent = secs;
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
    const refs = this.changeTime();
    refs.daysRef.textContent = "00";
    refs.hoursRef.textContent = "00";
    refs.minsRef.textContent = "00";
    refs.secsRef.textContent = "00";
  }
}
const timer = new CountdownTimer({
  selector: "#timer-1",
  // targetDate: new Date('Sep 11, 2021 13:35:00'),
  targetDate: new Date("Jan 01, 2022 00:00:00"),
});
timer.updateClockFace(timer.targetDate);
