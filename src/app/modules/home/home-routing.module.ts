import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/**TODO: Rutas que van aparecer dentro del home-page */
const routes: Routes = [
  {path:'tracks', loadChildren: ()=> import('@modules/tracks/tracks.module').then(m => m.TracksModule) },
  {path:'favorites', loadChildren: ()=> import('@modules/favorites/favorites.module').then(m => m.FavoritesModule) },
  {path:'history', loadChildren: ()=> import('@modules/history/history.module').then(m => m.HistoryModule) },
  { path: '**',//TODO: 404 cuando no existe la ruta redireccionamos a tracks
    redirectTo: '/tracks'
  }  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
