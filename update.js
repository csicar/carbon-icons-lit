import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { spawnSync } from 'child_process';

async function getCarbonVersion() {
  try {
    const response = await fetch('https://registry.npmjs.org/@carbon/icons/latest');
    const jsonData = await response.json();
    return jsonData.version;
  } catch (error) {
    console.error(`Error fetching package version: ${error.message}`);
    process.exit(2);
  }
}

async function getOwnVersion() {
    try {
        const response = await fetch('https://registry.npmjs.org/carbon-icons-lit/latest');
        const jsonData = await response.json();
        return jsonData.version;
      } catch (error) {
        console.error(`Error fetching package version: ${error.message}`);
        process.exit(2);
      }
}

async function updatePackageJson(carbonVersion, ownVersion) {
  try {
    const packageJsonPath = 'package.json';
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));


    if (null === carbonVersion) {
      console.log('Already up-to-date');
      process.exit(0);
    }

    packageJson.version = carbonVersion;
    packageJson.devDependencies['@carbon/icons'] = carbonVersion;

    mkdirSync('./dist', { recursive:true })

    writeFileSync('./dist/package.json', JSON.stringify(packageJson, null, 2));

    console.log('Updated package.json');

    // Run npm install
    const installProcess = spawnSync('npm', ['install'], { stdio: 'inherit' });
    if (installProcess.error) {
    throw new Error(`Error running npm install: ${installProcess.error.message}`);
    }

    // Run npm run build
    const buildProcess = spawnSync('npm', ['run', 'build'], { stdio: 'inherit' });
    if (buildProcess.error) {
    throw new Error(`Error running npm run build: ${buildProcess.error.message}`);
    }

    process.exit(0);
  } catch (error) {
    console.error(`Error updating package.json:`, error);
    process.exit(2);
  }
}

(async () => {
  const version = await getCarbonVersion();
  const ownVersion = await getOwnVersion();
  await updatePackageJson(version, ownVersion);
})();
