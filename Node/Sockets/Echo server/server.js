const { Server } = require("net");

const END = "END";

const connections = new Map();

const host = "0.0.0.0";

const error = (message) => {
	console.log(message);
	process.exit(1);
};

const sendMessage = (message, origin) => {
	// enviar message a todos menos a origin
};

const listen = (port) => {
	const server = new Server();
	server.on("connection", (socket) => {
		const remoteSocket = `${socket.remoteAddress}:${socket.remotePort}`;

		console.log(`New connection from ${remoteSocket}`);

		socket.setEncoding("utf-8");

		socket.on("data", (message) => {
			if (!connections.has(socket)) {
				console.log(`Username ${message} set for connection ${remoteSocket}`);
				connections.set(socket, message);
			} else if (message === END) {
				socket.end();
			} else {
				// Enviar el mensaje al resto de los clientes
				console.log(`${remoteSocket} -> ${message}`);
			}
		});
		socket.on("close", () => {
			console.log(`Connection with ${remoteSocket} closed`);
		});

		socket.on("error", (err) => error(err.message));
	});

	server.listen({ port, host }, () => {
		console.log(`Listening on port 8000`);
	});

	server.on("error", (err) => error(err.message));
};

const main = () => {
	if (process.argv.length !== 3) {
		error(`Usage: node ${__filename} port`);
	}
	let port = process.argv[2];
	if (isNaN(port)) {
		error(`Invalid port ${port}`);
	}
	port = Number(port);
	listen(port);
};

if (require.main === module) {
	main();
}
