var cors_api_url = "https://cors-anywhere.herokuapp.com/";

module.exports.CORSReq = (options, printResult) => {
  var x = new XMLHttpRequest();
  x.open(options.method, cors_api_url + options.url);
  x.onload = x.onerror = function() {
    printResult(
      options.method +
        " " +
        options.url +
        "\n" +
        x.status +
        " " +
        x.statusText +
        "\n\n" +
        (x.responseText || "")
    );
  };
  x.send(options.data);
}
