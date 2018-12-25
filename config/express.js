module.exports = (app, logger, express, cookieParser, path, cors) => {
  // app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({
    extended: false
  }));
  app.use(cookieParser());
  app.use(express.static("../public"));
  app.use(cors());
}
