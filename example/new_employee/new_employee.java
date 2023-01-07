// Snippet using Unirest
Unirest.setTimeouts(0, 0);
HttpResponse<String> response = Unirest.post("localhost:3023/uri/rest/sample/tiger/employee")
  .header("Content-Type", "text/plain")
  .body("!{ name }!\nArmstrong Joe\n\n!{ version }!\n1")
  .asString();


// Snippet using OkHttp
OkHttpClient client = new OkHttpClient().newBuilder()
  .build();
MediaType mediaType = MediaType.parse("text/plain");
RequestBody body = RequestBody.create(mediaType, "!{ name }!\nArmstrong Joe\n\n!{ version }!\n1");
Request request = new Request.Builder()
  .url("localhost:3023/uri/rest/sample/tiger/employee")
  .method("POST", body)
  .addHeader("Content-Type", "text/plain")
  .build();
Response response = client.newCall(request).execute();