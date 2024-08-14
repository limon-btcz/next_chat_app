/*
// Title: App configuration file
// Description: Application configuration setup here.
// Author: Kiam Khan Limon
// Author email: mdlimon0175@gmail.com
// version: 1.0
// Date: 7/07/2024
*/

let app_url, api_url, api_base_url, app_env, production;

if(process.env.NEXT_PUBLIC_MODE == "development") {
  app_url = "http://localhost:4000/"
  api_url = "http://localhost:9000/";
  api_base_url = "http://localhost:9000";
} else if(process.env.NEXT_PUBLIC_MODE == "production") {
  // set your productions server
}

app_env = process.env.NEXT_PUBLIC_MODE;
production = app_env == "production" ? true : false;
export {app_url, api_url, api_base_url, app_env, production}