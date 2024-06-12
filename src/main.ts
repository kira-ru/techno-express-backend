import {sequelize} from '@/config/database';
import {errorMiddleware} from '@/middlewares/error.middleware';
import {setTableRelationships} from '@/models/utils/setTableRelationships';
import {routes} from '@/routes';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import fileUploader from 'express-fileupload';
import {resolve} from 'path';
import process from 'process';

const app = express();

app.use(function (req, res, next) {
    console.log('Запрос: ' + req.method + ' ' + req.url);
    next();
});
app.use(fileUploader({debug: true}));
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.static(resolve(__dirname, 'static')));
app.use(routes);

//middleware
app.use(errorMiddleware);

try {
    sequelize.authenticate()
        .then(() => {
            setTableRelationships();
            return sequelize.sync();
        })
        .then(() => {
            app.listen(process.env.PORT, () => {
                console.log(`Running on port ${process.env.PORT}`);
            });
        });
} catch (e) {
    console.error('Unable to connect to the database:', e);
}

// TODO: delete this line after rebase
// TODO: delete this line after rebase
// TODO: delete this line after rebase
// TODO: delete this line after rebase
// TODO: delete this line after rebase
// TODO: delete this line after rebase
