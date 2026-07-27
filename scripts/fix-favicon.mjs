import { execSync } from 'child_process';

console.log('Cleaning transparent margins and regenerating favicons...');

execSync('npx sharp-cli -i public/logo.png -o public/favicon-32x32.png trim -- resize 32 32 --fit contain --background "rgba(0,0,0,0)"');
execSync('npx sharp-cli -i public/logo.png -o public/favicon-48x48.png trim -- resize 48 48 --fit contain --background "rgba(0,0,0,0)"');
execSync('npx sharp-cli -i public/logo.png -o public/apple-touch-icon.png trim -- resize 180 180 --fit contain --background "rgba(0,0,0,0)"');

console.log('✅ Clean favicons regenerated!');
