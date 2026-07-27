import postgres from 'postgres';
import fs from 'fs';

const projectRef = 'muhhvygrzcfuyyfkfwtb';
const password = '1obPOxhcbU1aHdhV';

// Try standard pooler host patterns
const regions = [
  'aws-0-eu-central-1',
  'aws-0-eu-west-1',
  'aws-0-us-east-1',
  'aws-0-us-west-1',
  'aws-0-sa-east-1'
];

async function run() {
  const schemaSql = fs.readFileSync('supabase-schema.sql', 'utf8');

  for (const region of regions) {
    const connStr = `postgresql://postgres.${projectRef}:${password}@${region}.pooler.supabase.com:6543/postgres`;
    console.log(`Trying connection via ${region}...`);
    try {
      const sql = postgres(connStr, { ssl: 'require', connect_timeout: 4 });
      await sql.unsafe(schemaSql);
      console.log(`✅ SUCCESS! Schema migrated via region: ${region}`);
      const categories = await sql`SELECT name, slug FROM public.categories;`;
      console.log('Categories created:', categories);
      await sql.end();
      process.exit(0);
    } catch (e) {
      console.log(`Failed ${region}:`, e.message);
    }
  }
  console.log('Could not connect via pooler automatically. Please paste SQL manually into Supabase SQL Editor.');
}

run();
