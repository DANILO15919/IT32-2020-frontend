import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BankaComponent } from './components/banka/banka.component';
import { FilijalaComponent } from './components/filijala/filijala.component';
import { KorisnikUslugeComponent } from './components/korisnik-usluge/korisnik-usluge.component';
import { UslugaComponent } from './components/usluga/usluga.component';
import { AboutComponent } from './components/utility/about/about.component';
import { AuthorComponent } from './components/utility/author/author.component';
import { HomeComponent } from './components/utility/home/home.component';

const routes: Routes = [ 
{ path: 'banka', component: BankaComponent },   
{ path: 'filijala', component: FilijalaComponent },
{ path: 'korisnik', component: KorisnikUslugeComponent},
{path: 'home', component: HomeComponent},
{path: 'about', component: AboutComponent},
{path: 'author', component: AuthorComponent},
{path: '', redirectTo:'/home', pathMatch: 'full'} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
