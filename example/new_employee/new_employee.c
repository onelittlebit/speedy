CURL *curl;
CURLcode res;

curl = curl_easy_init();

if(curl) {
  curl_easy_setopt(curl, CURLOPT_CUSTOMREQUEST, "POST");
  curl_easy_setopt(curl, CURLOPT_URL, "localhost:3023/uri/rest/sample/tiger/employee");
  curl_easy_setopt(curl, CURLOPT_FOLLOWLOCATION, 1L);
  curl_easy_setopt(curl, CURLOPT_DEFAULT_PROTOCOL, "https");

  struct curl_slist *headers = NULL;
  headers = curl_slist_append(headers, "Content-Type: text/plain");

  curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
  const char *data = "!{ name }!\nArmstrong Joe\n\n!{ version }!\n1";
  
  curl_easy_setopt(curl, CURLOPT_POSTFIELDS, data);
  res = curl_easy_perform(curl);
}

curl_easy_cleanup(curl);
