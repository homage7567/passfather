import { NgModule } from '@angular/core';
import { provideRouter } from '@angular/router';
import { databaseLoaderRoutes } from './database-loader.routes';


@NgModule({
  providers: [provideRouter(databaseLoaderRoutes)],
})
export class DatabaseLoaderModule {}
