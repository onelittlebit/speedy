var headers = {
  'Content-Type': 'text/plain'
};
var request = http.Request('POST', Uri.parse('localhost:3023/uri/rest/sample/tiger/employee'));
request.body = '''!{ name }!\nArmstrong Joe\n\n!{ version }!\n1''';
request.headers.addAll(headers);

http.StreamedResponse response = await request.send();

if (response.statusCode == 200) {
  print(await response.stream.bytesToString());
}
else {
  print(response.reasonPhrase);
}
