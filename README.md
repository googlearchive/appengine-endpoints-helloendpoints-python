## Hello Endpoints Python

A Python "Hello World" skeleton application for Google App Engine using
[Google Cloud Endpoints][1].

See our other [Google Cloud Platform github
repos](https://github.com/GoogleCloudPlatform) for sample applications and
scaffolding for other Python frameworks and use cases.

## Run Locally
1. Install the [App Engine Python SDK](https://developers.google.com/appengine/downloads).
See the README file for directions. You'll need Python 2.7 installed too.

1. Clone this repo with

   ```
   git clone https://github.com/GoogleCloudPlatform/appengine-endpoints-helloendpoints-python.git
   ```
1. Run the application locally with

   ```
   cd appengine-endpoints-helloendpoints-python
   dev_appserver.py .
   ```
1. Test your Endpoints by visiting the Google APIs Explorer (by default [http://localhost:8000/_ah/api/explorer](http://localhost:8000/_ah/api/explorer))

## Deploy
To deploy the application:

1. Use the [Admin Console](https://appengine.google.com) to create an app.
1. Replace `your-app-id` in `app.yaml` with the app id from the previous step.
 1. Optional step: These sub steps are not required but will enable the "Authenticated
 Greeting" functionality.
     1. Update the values in `helloworld_api.py` to
 reflect the respective client IDs you have registered in the [console][3].
     1. Update the value of `google.devrel.samples.helloendpoints.CLIENT_ID` in
 `static/js/base.js` to reflect the web client ID you have registered in the
 [console][3].
1. [Deploy the application](https://developers.google.com/appengine/docs/python/tools/uploadinganapp)
   with:

   ```
   appcfg.py --oauth2 update .
   ```
   or use the App Engine Launcher.
1. Congratulations! Your application is now live at `your-app-id`.appspot.com.
1. [Generate the Android client library][2] with:

   ```
   endpointscfg.py get_client_lib java -o . helloworld_api.HelloWorldApi
   ```
   
   or for Gradle projects:
   ```   
   endpointscfg.py get_client_lib java -bs gradle -o . helloworld_api.HelloWorldApi
   ```
   The library will connect to your deployed application. If you change your app ID, you must regenerate the client library.

## Next Steps
This skeleton includes TODO markers you can search for to determine some of the
basic areas you will want to customize.

### Consuming APIs
Building the backend is one part of Cloud Endpoints. See how you can consume
your APIs from [Android](https://developers.google.com/appengine/docs/python/endpoints/consume_android),
[iOS](https://developers.google.com/appengine/docs/python/endpoints/consume_ios), or the
[web](https://developers.google.com/appengine/docs/python/endpoints/consume_js) by reading the documentation.

### Installing Libraries
See the [third-party
libraries](https://developers.google.com/appengine/docs/python/tools/libraries27)
page for libraries that are already included in the SDK. To include SDK
libraries, add them in your app.yaml file. Other than libraries included in
the SDK, only pure python libraries may be added to an App Engine project.

### Feedback
Star this repo if you found it useful. Use the github issue tracker to give
feedback on this repo and to ask for scaffolds for other use cases.

## Contributing changes
See [CONTRIB.md](CONTRIB.md)

## Licensing
See [LICENSE](LICENSE)

[1]: https://developers.google.com/appengine/docs/python/endpoints/
[2]: https://developers.google.com/appengine/docs/python/endpoints/gen_clients
[3]: https://cloud.google.com/console
