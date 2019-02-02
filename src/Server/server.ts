import { createHttpServer } from "./serverFactory.ts/createHttpServer";
import { createStaticServer } from "./serverFactory.ts/createStaticServer";
const parameters = require('../../configs/parameters');

console.log(parameters.paths.distPath);
const httpServer = createHttpServer({ports: {port: parameters.server.port}});
createStaticServer(httpServer.app, parameters.paths.distPath);

(async function() {
	httpServer.listen();
})();

const stopServer = () => {
	console.info('Server is stopping');
	httpServer.close();
	process.exit(0);
};

process.on('SIGINT', stopServer);
process.on('SIGTERM', stopServer);
process.on('uncaughtException', (error: Error) => console.error(error));
process.on('unhandledRejection', (error: Error) => {
	throw error;
});
