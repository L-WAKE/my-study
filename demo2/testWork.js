self.onmessage = function (event) {
    let data = event.data;
    let num = 0;
    for (let i = 0; i < data; i++) {
        num += i;
    }
    self.postMessage(num);
}
// testWork