// you will need to install via 'npm install jsonwebtoken' or in your package.json

var jwt = require("jsonwebtoken");

var METABASE_SITE_URL = "https://metabase.apps.k8s.vertechcon.lan";

//this is the key for all the dashboards. I assume we'll want to have different keys for different users
var METABASE_SECRET_KEY = "3a6f584f7a4e6a2c71ddab42ad6701f8c906f02532b4c41772064d428f84525a";

var payload = {
  resource: { dashboard: 2 },
  params: {},
  exp: Math.round(Date.now() / 1000) + (10 * 60) // 10 minute expiration
};
var token = jwt.sign(payload, METABASE_SECRET_KEY);

var iframeUrl = METABASE_SITE_URL + "/embed/dashboard/" + token + "#theme=night&bordered=true&titled=true";

//change the src of the iframe. In the example, this is done using various template languages. For simplicity I'm just doing it direct
$("metabaseTest").attr("src",iframeUrl);
