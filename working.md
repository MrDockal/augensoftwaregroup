## Brief
- Application is completely written in JavaScript. Both on server and client. Initial DOM rendering is done by server.
- I have decided to use styled-components library for styling, because of ease of use. The library also supports cross-browser prefixes.
- The server components are written in abstract way, so the database connection can be established later.
- At first I knew that the table pagination has to be done at server side. It significantly improves user experience, since the client application should not work with large datasets.
- Later I stood in front of the other decision, how should I archive full-text seach the best way. I could use [elasticlunr](http://elasticlunr.com/), which suppose to be full-text seach engine for JS. However, I decided to compare directly the row contents from a *.cvs* file. This could be nice addditional feature
- Pagination on server works with limit of 20 records per one page, adding select box logic to front-end app would not take much time (30 minutes logic + 15 coding)
- Frontend loads all fields but displays only *First_name, Last_name, Email, Phone1* - table might have additional filter for selecting which columns to display and filter
- I would like to write some unit tests for the server, it might take me extra 1 hour

## Time summary
- 1h - Preparing project files & thinking about architecture
- 1h - Implementation of server logic
- 1h - Frontend table styling
- 30min - Implementing frontend provider that communicates with server via RestAPI
- 45min - Fulltext search on server
- 3h - Implement table pagination (server & client)
- 20min - Finalizing, writing this file and README.md
**Total 7 hours, 35 minutes**
