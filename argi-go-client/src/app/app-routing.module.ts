import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/guess-kotoba/guess-kotoba.component').then(
        (m) => m.GuessKotobaComponent
      ),
  },
  {
    path: 'guess-words',
    loadComponent: () =>
      import('./components/guess-kotoba/guess-kotoba.component').then(
        (m) => m.GuessKotobaComponent
      ),
  },
  {
    path: 'doushi-creation',
    loadComponent: () =>
      import('./components/doushi/create-doushi/create-doushi.component').then(
        (m) => m.CreateDoushiComponent
      ),
  },
  {
    path: 'book-creation',
    loadComponent: () =>
      import('./components/books/create-book/create-book.component').then(
        (m) => m.CreateBookComponent
      ),
  },
  {
    path: 'chapter-creation',
    loadComponent: () =>
      import(
        './components/chapters/create-chapter/create-chapter.component'
      ).then((m) => m.CreateChapterComponent),
  },
  {
    path: 'exam-creation',
    loadComponent: () =>
      import('./components/exams/creaet-exam/create-exam.component').then(
        (m) => m.CreateExamComponent
      ),
  },
  {
    path: 'keiyoushi-creation',
    loadComponent: () =>
      import(
        './components/keiyoushi/create-keiyoushi/create-keiyoushi.component'
      ).then((m) => m.CreateKeiyoushiComponent),
  },
  {
    path: 'meishi-creation',
    loadComponent: () =>
      import('./components/meishi/create-meishi/create-meishi.component').then(
        (m) => m.CreateMeishiComponent
      ),
  },
  {
    path: 'fukushi-creation',
    loadComponent: () =>
      import(
        './components/fukushi/create-fukushi/create-fukushi.component'
      ).then((m) => m.CreateFukushiComponent),
  },
  {
    path: 'doushi-grid',
    loadComponent: () =>
      import('./components/doushi/doushi-grid/doushi-grid.component').then(
        (m) => m.DoushiGridComponent
      ),
  },
  {
    path: 'keiyoushi-grid',
    loadComponent: () =>
      import(
        './components/keiyoushi/keiyoushi-grid/keiyoushi-grid.component'
      ).then((m) => m.KeiyoushiGridComponent),
  },
  {
    path: 'meishi-grid',
    loadComponent: () =>
      import('./components/meishi/meishi-grid/meishi-grid.component').then(
        (m) => m.MeishiGridComponent
      ),
  },
  {
    path: 'fukushi-grid',
    loadComponent: () =>
      import('./components/fukushi/fukushi-grid/fukushi-grid.component').then(
        (m) => m.FukushiGridComponent
      ),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
