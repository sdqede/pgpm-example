import { readFileSync } from 'node:fs';
import path from 'node:path';
import { getConnections, PgTestClient } from 'pgsql-test';

let db: PgTestClient;
let pg: PgTestClient;
let teardown: () => Promise<void>;

beforeAll(async () => {
  ({ pg, db, teardown } = await getConnections());
});

afterAll(async () => {
  await teardown();
});

beforeEach(async () => {
  await db.beforeEach();
});

afterEach(async () => {
  await db.afterEach();
});

describe('first test', () => {
  it('should pass', async () => {
    const sql = readFileSync(path.join(__dirname, 'watch.sql'), 'utf8');
    const result = await pg.query(sql);
    expect(result.rows[0].num).toBe(1);
  });
});
