# What is Speedy?
## Prelude
RESTful services are the right way of developing for the web. Most of the architectural patterns make use of them to decompose complex business problems into smaller API driven micro-services, which talk to each other over an HTTP/S API offered by them. This has given raise to what we call as “Design By Contract” or “Contract Based Design”, wherein the terms of the contract is an API, along with the data plus the format i.e. JSON, XML etc.

While this has solved the complex architectural issue, application developers are still left with other complex issues around development itself. To name a few, the whole boilerplate model of development, code generators, versioning issues, run-time garbage collection (if on Java), rolling new APIs, CI/CD etc. All of these issues stem from the same root ‘how we develop the API’ itself. Speedy is an attempt to fix most of these in a novel way.

## Array of RESTful services
Today, answering a question on ‘what is a RESTful service?’, is as complex as answering ‘what a browser is?’, as both of them do many things since the time they were invented. RESTful services today offer, function endpoints (like generate UUID as a service, nth prime, etc.), KV store aka Key-Value store for caching, database abstractions (most of the APIs do only this) to name few or a majority of it. Anything else could be build using these building blocks.

## Anatomy of RESTful API
Majority of the RESTful APIs provide CRUD (Create, Read, Update and Delete) operations over database tables in the form of APIs. Internally each of these APIs use one of the SQL statements to perform the operation. These database calls are either directly formed (a straight case like ‘select id, name, address from students where status = true;’) or wrapped with business logic written in the same language. Visually this could be depicted as below.
[![N|Solid](https://miro.medium.com/max/1400/1*wAwKgwcTLuShywetzGY1bg.png)](https://miro.medium.com/max/1400/1*wAwKgwcTLuShywetzGY1bg.png)
_Figure 1: RESTful service_

In most of the projects percentage of code which does database CRUD is almost 80% and remaining 20% is just business logic. This 80% code is identical to a greater degree logically, differing only in-terms of SQL. What-if we can take away all those abstractions away and associate SQL to an URI directly? Then we would have simplified the whole process of API development.
[![N|Solid](https://miro.medium.com/max/1400/1*253geHmO36W7FUq6vVbECw.png)](https://miro.medium.com/max/1400/1*253geHmO36W7FUq6vVbECw.png)
_Figure 1: Boilerplate code, bloating the Webserver_

This is exactly what Speedy offers! A developer can associate an SQL statement, or an JavaScript function to an URI, using its meta programming language. Don’t worry, you don’t have to learn a new language for this, it is a simple set of (< 15) keywords expressed in JSON format, that’s all. Let’s consider the previous example of SQL statement and what it takes to convert it into an URI using Speedy.
```
➜ ./speedy -s=tiger -u=scott -e=true
2022/10/23 21:55:14 speedy # Running in evaluation mode
2022/10/23 21:55:14 speedy # Speedy will accept 5 requests/minute
┌───────────────────────────────────────────────────────────────┐
│                                                               │
│                         Speedy v00.6.6                        │
│                                                               │
│            is reachable over  http://127.0.0.1:3023           │
│               (bound to localhost and port 3023)              │
│                                                               │
└───────────────────────────────────────────────────────────────┘
│                                                               │
│  Process ID (aka PID).................................  31258 │
│  License ID...........................................  trial │
│  Max nodes supported..................................      1 │
│  Max requests per minute..............................      5 │
│  Max connections to database..........................     30 │
│  Speedy listening on .................................   3023 │
│  Cache tenure time in seconds.........................     30 │
│  License start date...................... 2022-10-23 05.30.00 │
│  License end date........................ 2032-10-23 05.30.00 │
│                                                               │
└───────────────────────────────────────────────────────────────┘
```
Above terminal output shows a running instance of speedy and you should see a quite similar output on your computer/VM too. Now let’s create our RESTful service API/endpoint, by following the step below.
```
curl --location --request PUT 'localhost:3023/rest' \
   --header 'Content-Type: application/json' \
   --data-raw '{
      "uri" : "user/active",
      "do" : "SELECT * FROM tiger.user WHERE status = true;",
      "version" : "1",
      "method" : "get"
   }'
```
Above curl will define an URI http://localhost:3023/user/active of HTTP method type GET and associated version as 1. That’s it! that’s all it takes to define a RESTful API with Speedy. Now you can hit the URL using curl immediately to get your results; its going to be that fast too!
```
curl --location --request GET 'localhost:3023/uri/rest/user/active?version=1'
You will get the result immediately. On our sample database it looks like the following.
[
   {
      "passwd": "CF48E866D59E966FB98AAEF8635516FB",
      "rights": 3,
      "status": true,
      "uname": "scott"
   },
   {
      "passwd": "6F48E866D59E966FB98AAEF8635516FB",
      "rights": 2,
      "status": true,
      "uname": "mike"
   },
   {
      "passwd": "CF48E866D59E966FB98AAEF8635516FB",
      "rights": 2,
      "status": true,
      "uname": "john"
   }
]
```
To understand more about defining the endpoints using Speedy, read <> article. In this article all types of endpoints and their usage is described in detail.

## Scalable Platform
A single instance of Speedy is almost 100x more scalable in terms of load and performance, compared to traditional implementations. Just to get out of hair from plethora of discussions we don’t want to take any name here for the comparison. Our request to developers is to use one to experience it for themselves.
Inside Speedy all definitions are on disk at rest, nothing gets loaded to the memory until it is called upon. Speedy, smartly manages the hot vs cold definitions, by swapping them in/out of memory. In our tests we have literally put 100K definitions (aka URI) to Speedy, and it handles them all without a sweat.
All of this magic is happening in microseconds by the meta logic interpreter within Speedy.
## Performance & Benchmarking
Any new product meets with a fair amount of doubt w.r.t its stability and performance. We share the same sentiments too, to ease the mind here are few numbers that might help on the way.
Speedy was tested for 1.3 million API calls (aka endpoint calls) in a duration of six hours, roughly 3450 requests/minute or 115 req/sec. Our benchmarking script pumped 115 requests concurrently and slept for a second; thus 115 req/sec instead of ~58 req/sec. This was done in-order to not get capped by the rate-limiter of Speedy, as the license we used for this test had the upper cap of 3600 req/minute. In general, 115 req/sec concurrently represents a large setup of web-server in the industry. A much larger and broader benchmarking number will be published soon.
A single instance of Speedy was deployed on a Apple Mac M1 2020 model with 8GB RAM, running Mac OS Montrery 12.4. This machine had 4 Efficiency Cores and 4 Performance Cores. The setup had Postgres 14.4 running without any custom performance tuning done. Benchmarking consisted hitting KV cache, REST endpoints, and function execution done randomly (from an array of pre-defined ‘definitions’). Randomisation was done in-order not to cache anytime to memory from database point of view. Below are the performance number during the activity.

[![N|Solid](https://miro.medium.com/max/1400/1*29liGrSiVKNbD6kbmCBASw.png)](https://miro.medium.com/max/1400/1*29liGrSiVKNbD6kbmCBASw.png)

# More on Speedy
The following [Medium article](https://medium.com/@littbit.one/index-for-speedy-8f9e32c571ee) provides details on internals of Speedy, happy reading.  You can reach us at support@getspeedy.app for any questions you might have.

