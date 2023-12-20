async function loadData() {
  const url =
    "https://lf3-csp.bytetos.com/obj/ies-csp-resource/ies/helpcenter_web/common/vendor.76e67201.js";
  const response = await fetch(url);
  const reader = response.body.getReader();
  let utfBdecoder = new TextDecoder();
  for (;;) {
    const { value, done } = await reader.read();
    if (done) {
      break;
    }
    const text = utfBdecoder.decode(value);
    console.log(text);
  }
}
loadData();
