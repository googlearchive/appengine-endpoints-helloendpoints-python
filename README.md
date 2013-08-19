appengine-endpoints-helloendpoints-python
=============================================

A "Hello World" application for Google Cloud Endpoints in Python.

## Products
- [App Engine][1]

## Language
- [Python][2]

## APIs
- [Google Cloud Endpoints][3]

## Setup Instructions
1. Update the value of `application` in [`app.yaml`][4] from `your-app-id`
   to the app ID you have registered in the App Engine admin console and would
   like to use to host your instance of this sample.
1. Run the application, and ensure it's running by visiting your local server's
   admin console (by default [localhost:8080/_ah/admin][5].)
1. Test your Endpoints by visiting the Google APIs Explorer:
   [localhost:8080/_ah/api/explorer][6]
1. [Get the client library][7] with `endpointscfg.py`


[1]: https://developers.google.com/appengine
[2]: http://python.org/
[3]: https://developers.google.com/appengine/docs/python/endpoints/
[4]: https://github.com/GoogleCloudPlatform/appengine-endpoints-helloendpoints-python/blob/master/app.yaml
[5]: http://localhost:8080/_ah/admin
[6]: http://localhost:8080/_ah/api/explorer
[7]: https://developers.google.com/appengine/docs/python/endpoints/gen_clients
