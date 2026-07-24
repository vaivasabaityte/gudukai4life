# Gudukai4Life V18.1

Skubus V18 pataisymas.

Problema:
- po sėkmingo RSVP JavaScript sustodavo dėl neegzistuojančio `rsvpSection` kintamojo;
- todėl mygtukas atrodydavo neveikiantis ir patvirtinimas nepasirodydavo.

Pataisyta:
- naudojamas realiai egzistuojantis `rsvpForm` elementas;
- visa V18 mobile viewport stabilizavimo logika palikta nepakeista.
