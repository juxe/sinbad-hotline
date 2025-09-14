import express from 'express';
import type {Request, Response, NextFunction} from 'express';
import Database from 'better-sqlite3';

interface AppError extends Error {
    status?: number;
}

const db = new Database('/config/db.sqlite');

// init db
db.prepare('CREATE TABLE IF NOT EXISTS visitor_count (count integer);').run();

const app = express();

// host static files
app.use(express.static('static'));

// visitor counter
app.get('/api/counter', (req, res) => {
    const query = db.prepare('SELECT count FROM visitor_count;');
    const result = query.get() as {count: number} | undefined;
    if (result) {
        const newCount = result.count + 1;
        res.status(200).send(newCount);
        const update = db.prepare('UPDATE visitor_count SET count = ?;');
        update.run(newCount);
    } else {
        const newCount = 1;
        res.status(200).send(newCount);
        const insert = db.prepare('INSERT INTO visitor_count VALUES (?);');
        insert.run(newCount);
    }
});

// Global error handler (should be after routes)
app.use((
    err: AppError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error(err);
    res.status(err.status || 500).send(err.message || 'Internal Server Error');
});

// export default app;
app.listen(8666, () => {
    console.log(`Server running on port 8666`);
});
