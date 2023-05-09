import express, {Express, Request, Response, response} from 'express';
import cors from 'cors';
import { Pool } from 'pg';
import { PackageState } from './package_state';
import * as dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT as string),
});

app.use(express.json());
app.use(cors());

// POST request for reseting the package states in the database 
app.post('/reset_states', async (req: Request, res: Response) => {
    try {
        await pool.query('UPDATE packages SET state = $1', [PackageState.not_scanned]);
        res.status(200).send('States were reset');
    } catch (err) {
        res.status(500).send('Internal Server Error');
    }
});

// GET request that returns a json with the drivers id and names
app.get('/drivers', async (req: Request, res: Response) => {
    try {
        const { rows } = await pool.query('SELECT id, name from drivers');
        res.status(200).json({drivers: rows});
    } catch (err) {
        res.status(500).send('Internal Server Error');
    }
});


// GET request that returns a json with all
// the packages that are assigned to a driver
app.get('/driver_packages/:id', async (req: Request, res: Response) => {
    try {
        const driver_id: number = parseInt(req.params.id);

        const { rows: packages } = await pool.query('SELECT * FROM packages \
                                           WHERE postcode LIKE \
                                           (SELECT postcode || \'%\' FROM drivers \
                                            JOIN clusters ON drivers.cluster = clusters.name \
                                            WHERE drivers.id = $1)', [driver_id]);
                                            
        res.status(200).send({packages: packages});
    } catch (err) {
        res.status(500).send('Internal Server Error');
    }
});

// POST request that changes the state of a package to scanned
app.post('/scan_package', async (req: Request, res: Response) => {
    try {
        const { voucher } = req.body;
        const { rowCount } = await pool.query('UPDATE packages SET state = $1 WHERE voucher = $2', [PackageState.scanned, voucher]);

        if (rowCount == 1) {
            res.status(200).send('Package scanned');
        }
        else {
            res.status(404).send('Voucher not found');
        }
    }
    catch(err) {
        res.status(500).send('Internal Server Error');
    }
});


app.listen(port, () => {
    console.log(`[Server]: Running at https://localhost:${port}`);
});