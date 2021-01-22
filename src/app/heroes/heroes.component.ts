import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MatPaginator } from '@angular/material/paginator';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {
  heroes: Hero[];
  displayedColumns: string[] = ['id', 'name', 'actions'];
  isShowTable = false;
  dataSource;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(private heroService: HeroService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }

  getHeroesWithPaginator(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => {
        this.heroes = heroes;
        this.dataSource = new MatTableDataSource<Hero>(heroes);
        this.dataSource.paginator = this.paginator;

      }
      );
  }

  changeToList(): void {
    if (this.isShowTable) {
      this.isShowTable = false;
    }
  }

  changeToTable(): void {
    if (!this.isShowTable) {
      this.getHeroesWithPaginator();
      this.isShowTable = true;
    }
  }

  detailHero(id) {
    this.router.navigate(['../detail', id], { relativeTo: this.activatedRoute });
  }

  notdelete(){
    window.alert('not implemented');
  }
}
