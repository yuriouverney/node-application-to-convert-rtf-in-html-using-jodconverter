To install the necessary dependencies just run the following command:
"npm i" in the terminal;

to start the application you can:
1 -> directly run the rtf-to-html.service.js file;
or;
1 -> run "npm start" in the terminal;
2 -> GET request to localhost:3000


how does this application work?

It will read line by line from an XLSX file containing 2 columns:
1 - id;
2 - parecer; (the content of the parecer column will be in RTF);

As soon as the reading starts, an RTF file will be created with the column content and it will be sent in a POST request to the "jodconverter" library (https://github.com/jodconverter/docker-image-jodconverter-examples ) run locally.

then the result of the conversion from RTF to HTML will be saved in an array and the content will be transformed into a new xlsx file;