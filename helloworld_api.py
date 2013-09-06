#!/usr/bin/python

# Copyright (C) 2010-2013 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.


"""Hello World API implemented using Google Cloud Endpoints.

Defined here are the ProtoRPC messages needed to define Schemas for methods
as well as those methods defined in an API.
"""


from google.appengine.ext import endpoints
from protorpc import messages
from protorpc import message_types
from protorpc import remote


CLIENT_ID = 'YOUR-CLIENT-ID'


package = 'Hello'


class Greeting(messages.Message):
    """Greeting that stores a message."""
    message = messages.StringField(1)


class GreetingCollection(messages.Message):
    """Collection of Greetings."""
    items = messages.MessageField(Greeting, 1, repeated=True)


STORED_GREETINGS = GreetingCollection(items=[
    Greeting(message='hello world!'),
    Greeting(message='goodbye world!'),
])


@endpoints.api(name='helloworld', version='v1',
               allowed_client_ids=[CLIENT_ID, endpoints.API_EXPLORER_CLIENT_ID])
class HelloWorldApi(remote.Service):
    """Helloworld API v1."""

    MULTIPLY_METHOD_RESOURCE = endpoints.ResourceContainer(
            Greeting,
            times=messages.IntegerField(2, variant=messages.Variant.INT32,
                                        required=True))

    @endpoints.method(MULTIPLY_METHOD_RESOURCE, Greeting,
                      path='hellogreeting/{times}', http_method='POST',
                      name='greetings.multiply')
    def greetings_multiply(self, request):
        return Greeting(message=request.message * request.times)

    @endpoints.method(message_types.VoidMessage, GreetingCollection,
                      path='hellogreeting', http_method='GET',
                      name='greetings.listGreeting')
    def greetings_list(self, unused_request):
        return STORED_GREETINGS

    ID_RESOURCE = endpoints.ResourceContainer(
            message_types.VoidMessage,
            id=messages.IntegerField(1, variant=messages.Variant.INT32))

    @endpoints.method(ID_RESOURCE, Greeting,
                      path='hellogreeting/{id}', http_method='GET',
                      name='greetings.getGreeting')
    def greeting_get(self, request):
        try:
            return STORED_GREETINGS.items[request.id]
        except (IndexError, TypeError):
            raise endpoints.NotFoundException('Greeting %s not found.' %
                                              (request.id,))

    @endpoints.method(message_types.VoidMessage, Greeting,
                      path='hellogreeting/authed', http_method='POST',
                      name='greetings.authed')
    def greeting_authed(self, request):
        current_user = endpoints.get_current_user()
        email = (current_user.email() if current_user is not None
                 else 'Anonymous')
        return Greeting(message='hello %s' % (email,))


APPLICATION = endpoints.api_server([HelloWorldApi],
                                   restricted=False)
