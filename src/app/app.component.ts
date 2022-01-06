import { Component, OnInit, Type } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'decomposeur';

  // Variables
  decomposition: string = "";
  explication1: string[] = [];
  explication: string[] = [];

  ngOnInit(): void { }

  prime_factors(n: number): number[] {
    this.explication1 = [];
    this.explication1.push("Détermination des facteurs premiers");
    let d: number = 2;
    let prime: number[] = [];
    let tmp: number = n;

    while (d * d <= n) {
      while (n % d == 0) {
        prime.push(d);
        this.explication1.push(d.toString() + " est un facteur premier de " + tmp.toString());
        n = Math.floor(n / d);
      }
      d += 1;
    }

    if (n > 1) {
      prime.push(n);
      this.explication1.push(n.toString() + " est un facteur premier de " + tmp.toString());
    }
    return prime;
  }

  hashe(l: number[]): number[] {
    let a = new Set(l);
    const tmp: number[] = Array.from(a);
    this.explication1.push("Les facteurs premiers sont donc " + tmp.toString());

    return tmp;
  }

  power(n: number, l: number[]): number {
    let counts: number = 0;

    for (let i = 0; i < l.length; i++) {
      if (n == l[i]) {
        counts++;
      }

    }

    return counts;
  }

  final(n: number) {
    if (n > 1) {
      let p: number[] = this.prime_factors(n);
      let a: number[] = this.hashe(p);
      let x = "";
      let expo: number[] = [];

      for (let i = 0; i < a.length; i++) {
        x = x + (a[i].toString()) + '<sup>' + (this.power(a[i], p)).toString() + '</sup>';
        expo.push(this.power(a[i], p))
        if (i != a.length - 1) {
          x = x + ' x ';
        }
      }
      this.explication1.push("Les exposants sont respectivements " + expo.toString())
      this.explication1.push("D'où la décomposition en produit de facteurs premiers ci-contre ==>")

      return x;
    } else {
      if (n == 1) {
        this.explication1.push("1 est premiers")

        return "1";
      } else {
        return "";
      }
    }
  }

  onKey(event: KeyboardEvent) {
    let num: number = parseInt((<HTMLInputElement>event.target).value);
    this.decomposition = this.final(num);
    const el = document.getElementById('dec');
    el!.innerHTML = this.decomposition;

    this.explication = num ? this.explication1 : [];
  }

}
