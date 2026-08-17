import CallWaffle from "./CallWaffle";
import "./Problem.css";

export default function Problem() {
  return (
    <section className="sec" id="problem" aria-labelledby="problem-title">
      <div className="wrap grid2">
        <div className="rail">
          <p className="eyebrow" aria-hidden="true">
            Problem
          </p>
        </div>
        <div>
          <h2 id="problem-title" className="h2">
            Poziv na koji se niko ne javi je klijent koji zove sledećeg.
          </h2>
          <p className="lead-note">
            Telefon zvoni dok radite, posle radnog vremena i vikendom.
            Istraživanja pokazuju koliko tih poziva nikada ne stigne do žive
            osobe.
          </p>

          <CallWaffle />

          <ul className="prob-list">
            <li>
              <h3>Zvoni dok radite</h3>
              <p>
                Ruke su vam pune, a telefon zvoni bez odgovora. Taj poziv se
                retko ponovi.
              </p>
            </li>
            <li>
              <h3>Zvoni posle radnog vremena</h3>
              <p>
                Večeri, vikendi, praznici. Ljudi traže uslugu kad im zatreba, ne
                kad vama odgovara.
              </p>
            </li>
            <li>
              <h3>Zvoni brže kod konkurencije</h3>
              <p>Ko se prvi javi, taj zakazuje. Ostali dobiju govornu poštu.</p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
