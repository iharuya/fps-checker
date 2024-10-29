class FPSMetric {
  constructor(metricId, updateFunction) {
    this.metricId = metricId
    this.counter = 0;
    this.times = [];
    const $row = document.getElementById(metricId);
    this.doms = {
      root: $row,
      fps: $row?.querySelector('.fps'),
      count: $row?.querySelector('.count'),  
    }
    if (!this.checkIfAllDomsArePresent()) {
      throw new Error('Some DOMs are not present');
    }

    // this.startTime = performance.now();
    // updateFunction(() => {
    //   this.counter++;
    //   this.doms.count.textContent = this.counter;
    //   const diff = performance.now() - this.startTime;
    //   const fps = this.counter / (diff / 1000);
    //   this.doms.fps.textContent = fps.toFixed(2);
    // })

    updateFunction(() => {
      const now = performance.now();
      while (this.times.length > 0 && this.times[0] <= now - 1000) {
        this.times.shift();
      }
      this.times.push(now);
      const fps = this.times.length;
      this.doms.fps.textContent = fps;
      this.counter++; 
      this.doms.count.textContent = this.counter;
    });
  } 

  checkIfAllDomsArePresent() {
    return Object.values(this.doms).every(Boolean);
  }

}

window.onload = () => {
  new FPSMetric('set-interval', setInterval);
  new FPSMetric('set-timeout', (callback) => {
    const loop = () => {
      callback();
      setTimeout(loop, 0); 
    }
    loop();
  });
  new FPSMetric('request-animation-frame', (callback) => {
    const loop = () => {
      callback();
      requestAnimationFrame(loop);
    }
    loop();
  });
}
