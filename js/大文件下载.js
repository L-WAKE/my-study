async function loadData() {
  const url =
    "https://lf3-csp.bytetos.com/obj/ies-csp-resource/ies/helpcenter_web/common/vendor.76e67201.js";
  const response = await fetch(url);
  const reader = response.body.getReader();
}
