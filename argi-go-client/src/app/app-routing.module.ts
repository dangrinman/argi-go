import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateBookComponent } from './components/books/create-book/create-book.component';
import { CreateChapterComponent } from './components/chapters/create-chapter/create-chapter.component';
import { CreateDoushiComponent } from './components/doushi/create-doushi/create-doushi.component';
import { CreateExamComponent } from './components/exams/creaet-exam/create-exam.component';
import { CreateFukushiComponent } from './components/fukushi/create-fukushi/create-fukushi.component';
import { GuessKotobaComponent } from './components/guess-kotoba/guess-kotoba.component';
import { CreateKeiyoushiComponent } from './components/keiyoushi/create-keiyoushi/create-keiyoushi.component';
import { CreateMeishiComponent } from './components/meishi/create-meishi/create-meishi.component';

const routes: Routes = [
  {
    path: 'guess-words',
    component: GuessKotobaComponent,
    pathMatch: 'full',
  },
  {
    path: 'doushi-creation',
    component: CreateDoushiComponent,
    pathMatch: 'full',
  },
  {
    path: 'book-creation',
    component: CreateBookComponent,
    pathMatch: 'full',
  },
  {
    path: 'chapter-creation',
    component: CreateChapterComponent,
    pathMatch: 'full',
  },
  {
    path: 'exam-creation',
    component: CreateExamComponent,
    pathMatch: 'full',
  },
  {
    path: 'keiyoushi-creation',
    component: CreateKeiyoushiComponent,
    pathMatch: 'full',
  },
  {
    path: 'meishi-creation',
    component: CreateMeishiComponent,
    pathMatch: 'full',
  },
  {
    path: 'fukushi-creation',
    component: CreateFukushiComponent,
    pathMatch: 'full',
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
