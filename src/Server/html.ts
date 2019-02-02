export const html = ({ body }: { body: string }) => `
<!DOCTYPE html>
<html>
  <head>
    <style>
    </style>
  </head>
  <body style="margin:0">
	<div id="app">${body}</div>
  </body>
  <script src="/bundle.js" defer></script>
</html>
`;
