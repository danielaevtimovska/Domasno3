var vozaci=new Array(10);
var zavrsena=false;

function Vozac(ime, tim, brzina, vestina, gumi) {
    this.ime=ime;
    this.tim=tim;
    this.brzina=brzina;
    this.vestina=vestina;
    this.gumi=gumi;
    this.vkupnoVreme=0;
    this.vremeKrug=0;
    this.status="На старт";
    this.pitStop=false;
    this.pitKrug=3+Math.floor(Math.random()*5);
}

function start() {
    document.getElementById("startBtn").addEventListener("click", startuvajTrka, false);
    document.getElementById("novaBtn").addEventListener("click", novaTrka, false);
    novaTrka();
}

function novaTrka() {
    zavrsena=false;
    vozaci=new Array(10);

    vozaci[0] = new Vozac("Александар", "Ferrari", 1.12, 1.08, "побрзи");
    vozaci[1] = new Vozac("Марко", "Mercedes", 1.10, 1.06, "побавни");
    vozaci[2] = new Vozac("Петар", "Red Bull Racing", 1.09, 1.09, "побрзи");
    vozaci[3] = new Vozac("Никола", "McLaren", 1.07, 1.05, "побавни");
    vozaci[4] = new Vozac("Иван", "Aston Martin", 1.08, 1.04, "побрзи");
    vozaci[5] = new Vozac("Христијан", "Ferrari", 1.06, 1.07, "побавни");
    vozaci[6] = new Vozac("Лука", "Mercedes", 1.05, 1.03, "побрзи");
    vozaci[7] = new Vozac("Јован", "Red Bull Racing", 1.04, 1.06, "побавни");
    vozaci[8] = new Vozac("Стефан", "McLaren", 1.03, 1.02, "побрзи");
    vozaci[9] = new Vozac("Филип", "Aston Martin", 1.02, 1.04, "побавни");

    document.getElementById("rezultati").innerHTML="";
    document.getElementById("pobednik").innerHTML="";
    document.getElementById("poraka").innerHTML="Притисни Стартувај трка.";
    prikaziTabela("Почетна состојба", false);
}

function sporediVreme(a, b) {
    return a.vkupnoVreme - b.vkupnoVreme;
}

function prikaziTabela(naslov, kraj) {
    vozaci.sort(sporediVreme);
    var tekst = "<h2>" + naslov + "</h2>";
    tekst += "<table><thead><tr>" + "<th>Позиција</th>" +
    "<th>Возач</th>" + "<th>Тим</th>" + "<th>Брзина</th>" +
    "<th>Вештина</th>" + "<th>Гуми</th>" + "<th>Време во круг (сек)</th>" + "<th>Вкупно време (сек)</th>" + 
    "<th>Пит-стоп</th>" + "<th>Статус</th>" + "</tr></thead><tbody>";

    for (var i=0; i<vozaci.length; i++) {
        var v=vozaci[i];
        if (kraj==true && i==0) {
            tekst+="<tr class='pobednik'>";
        } 
        else {
            tekst+="<tr>";
        }

        tekst += "<td>" + (i + 1) + "</td>" + "<td>" + v.ime + "</td>" +
        "<td>" + v.tim + "</td>" + "<td>" + v.brzina + "</td>" + "<td>" + 
        v.vestina + "</td>" + "<td>" + v.gumi + "</td>" + "<td>" + 
        v.vremeKrug + "</td>" + "<td>" + v.vkupnoVreme + "</td>";

        if (v.pitStop==true) {
            tekst+="<td>Да</td>";
        } else {
            tekst+="<td>Не</td>";
        }
        tekst += "<td>" + v.status + "</td>" + "</tr>";
    }
    tekst+="</tbody></table>";
    document.getElementById("rezultati").innerHTML += tekst;
}

function startuvajTrka() {
    if (zavrsena==true) {
        return;
    }
    zavrsena=true;

    for (var krug=1; krug<=10; krug++) {
        var bezbednosno=false;
        if (Math.random()<0.2) {
            bezbednosno=true;
        }

        for (var i=0; i<vozaci.length; i++) {
            var v=vozaci[i];
            var vreme = 90/(v.brzina*v.vestina);
            if (v.gumi=="побрзи") {
                vreme*=0.97;
            } 
            else {
                vreme*=1.05;
            }
            vreme+=Math.random()*4;
            var status="";

            if (krug==v.pitKrug && v.pitStop==false) {
                vreme+=20+Math.random()*5;
                v.pitStop=true;
                if (v.gumi=="побрзи") {
                    v.gumi="побавни";
                } 
                else {
                    v.gumi="побрзи";
                }
                status += "Пит-стоп, нови гуми: " + v.gumi + ". ";
            }

            var sansa=Math.random();
            if (sansa<0.03) {
                vreme+=14;
                status+="Излетување. ";
            }
            else if (sansa>=0.03 && sansa<0.09) {
                vreme+=7;
                status+="Извртување. ";
            }

            if (bezbednosno==true) {
                vreme+=12;
                status+="Безбедносно возило. ";
            }

            if (status=="") {
                status="Нормално.";
            }

            v.vremeKrug=vreme;
            v.vkupnoVreme+=vreme;
            v.status=status;
        }
        prikaziTabela("Резултати по " + krug + " круг", krug==10);
    }

    vozaci.sort(sporediVreme);
    var pobednik=vozaci[0];
    document.getElementById("pobednik").innerHTML = "Победник: " + pobednik.ime +
    " (" + pobednik.tim + "), време: " + pobednik.vkupnoVreme + " секунди.";
    document.getElementById("poraka").innerHTML = "Трката заврши по 10 круга.";
}
window.addEventListener("load", start, false);