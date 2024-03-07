import * as fs from 'fs';
import createError from 'http-errors';
import express from 'express';
import session from 'express-session';
import cors from 'cors'
import { join, dirname } from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { fileURLToPath, pathToFileURL } from 'url';

// import indexRouter from './routes/index.mjs';
// import usersRouter from './routes/users.mjs';
import eventRouter from './routes/event.mjs'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 引入.env檔
import 'dotenv/config.js'
const secretKey = process.env.SECRET_KEY;


const app = express();

// 可允許進入的網址
// cors設定，參數為必要，注意不要只寫`app.use(cors())`
app.use(
  cors({
    origin: [	'http://127.0.0.1:5500',
    'http://localhost:5500',
    'http://localhost:3005',
    'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
)

// session的設定
app.use(session({
  secret: secretKey,
  resave: false,
  saveUninitialized: true,
  cookie: {
    // Cookie的有效週期, 以毫秒為單位
    maxAge: 86400000,
  },
}))

// View engine setup
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/event', eventRouter);

// 載入routes中的各路由檔案，並套用api路由 START
const apiPath = '/api' // 預設路由
const routePath = join(__dirname, 'routes')
const filenames = await fs.promises.readdir(routePath)

for (const filename of filenames) {
  const item = await import(pathToFileURL(join(routePath, filename)))
  const slug = filename.split('.')[0]
  app.use(`${apiPath}/${slug === 'index' ? '' : slug}`, item.default)
}
// 載入routes中的各路由檔案，並套用api路由 END

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Error handler
app.use((err, req, res, _next) => {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
