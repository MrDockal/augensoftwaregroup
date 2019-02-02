import { createHttpServer } from "./serverFactory/createHttpServer";
import { createFilesystemRepository } from "./repository/fileSystem/filesystemRepository";
import { createApplicationRouter } from "./routes/applicationRouter";
const parameters = require('../../configs/parameters');

console.log(parameters.paths.distPath);
const httpServer = createHttpServer({ports: {port: parameters.server.port}});

(async function() {
	const filesystemRepository = await createFilesystemRepository(parameters.paths.customerSampleDataPath);
	createApplicationRouter(httpServer.app, parameters.paths.distPath, filesystemRepository);
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
