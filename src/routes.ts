import fs from 'fs';
import path from 'path';
import { Express, Router } from 'express';


export default function loadRoutes(app: Express) {
  const baseDir = path.join(__dirname, 'api', 'v1');
  const versionPrefix = '/api/v1';

  const dirs = fs.readdirSync(baseDir);

  dirs.forEach((dir) => {
    const routePath = path.join(baseDir, dir, 'index.ts');
    const routeJsPath = path.join(baseDir, dir, 'index.js'); // setelah build

    if (fs.existsSync(routePath) || fs.existsSync(routeJsPath)) {
      const fullPath = fs.existsSync(routePath) ? routePath : routeJsPath;
      const route = require(fullPath);
      const router: Router = route.default || route;

      app.use(`${versionPrefix}/${dir}`, router);
      console.log(`Loaded route: ${versionPrefix}/${dir}`);
    }
  });
}
