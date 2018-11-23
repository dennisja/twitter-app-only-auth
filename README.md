# twitter-app-only-auth

Implements twitter [application only authentication](https://developer.twitter.com/en/docs/basics/authentication/overview/application-only) and exposes a method to get all resources an application has access to.

> Currently only works in environments without CORS e.g NodeJs, react Native e.t.c

## Sample Usage

### Promises

```js
const Twitter = require('twitter-app-only-auth');

const twitter = new Twitter(
  'Your Consumer Api Key',
  'Your Consumer Api Secret Key',
);

twitter
  .get('statuses/user_timeline.json?screen_name=dennisjjagwe&count=2')
  .then((result) => {
    if (result.error) {
      // do something with the error
      return;
    }

    // use the result here
    console.log(result);
  });
```

### Async Await

```js
// after creating client as shown above
const response = await twitter.get(
  'statuses/user_timeline.json?screen_name=dennisjjagwe&count=2',
);
```

> This has been done to be used for something quickly.
> The implementation and api is subject to change in future versions to support
> good error handling. Better documentation, writing tests for the client e.t.c
