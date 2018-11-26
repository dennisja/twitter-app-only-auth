# twitter-app-only-auth

Implements twitter [application only authentication](https://developer.twitter.com/en/docs/basics/authentication/overview/application-only) and exposes a method to get all resources an application has access to.

> Currently only works in environments without CORS e.g NodeJs, React Native e.t.c

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
    // do something with the data
    console.log(result.data);
  })
  .catch((err) => {
    // do something with the error
    if (err.response) {
      // do something with error due to response
    } else if (err.request) {
      // do something with error due to request
    } else {
      // check what went wromg
      console.log(err.message);
    }
  });
```

### Async Await

```js
// after creating client as shown above
async function getTweets() {
  try {
    const response = await twitter.get(
      'statuses/user_timeline.json?screen_name=dennisjjagwe&count=2',
    );
    // console.log(response.data)
  } catch (err) {
    // do something with the error
    if (err.response) {
      // do something with error due to response
    } else if (err.request) {
      // do something with error due to request
    } else {
      // check what went wromg
      console.log(err.message);
    }
  }
}
```

> This has been done to be used for something quickly.
> The implementation and api is subject to improve in future versions but there will be no breaking changes.
> Looking forward to doing better documentation, writing tests for the client e.t.c
