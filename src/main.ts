class Server {
  // public app!: ;
  private host!: string;
  private port!: number;
  private paths!: string;

  constructor(ip: string, port: number) {
    this.port = port;
  }
}