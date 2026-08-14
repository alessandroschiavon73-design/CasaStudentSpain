
(() => {
  "use strict";
  const DATA = window.STUDENTBNB_DATA || {listings:[], cities:[]};

  const qs = (s, root=document) => root.querySelector(s);
  const qsa = (s, root=document) => [...root.querySelectorAll(s)];
  const money = n => new Intl.NumberFormat("es-ES", {style:"currency", currency:"EUR", maximumFractionDigits:0}).format(Number(n)||0);

  function translateStaticPage(){
    const pairs=[
      ["Trova la tua stanza. Vivi la tua città.","Encuentra tu habitación. Vive tu ciudad."],["Come funziona","Cómo funciona"],["Chi siamo","Quiénes somos"],["Contatti","Contacto"],["Pubblica annuncio gratis","Publicar anuncio gratis"],["Accedi","Acceder"],
      ["La piattaforma dedicata alla mobilità abitativa degli studenti: costi, condizioni e servizi confrontabili con chiarezza.","La plataforma de alojamiento para estudiantes: precios, condiciones y servicios comparables con claridad."],["Esplora","Explorar"],["Alloggi a Padova","Alojamiento en Madrid"],["Città universitarie","Ciudades universitarias"],["Pubblica annuncio","Publicar anuncio"],["Progetto","Proyecto"],["Domande frequenti","Preguntas frecuentes"],["Sicurezza","Seguridad"],["Privacy e condizioni","Privacidad y condiciones"],["Prevenzione truffe","Prevención de fraudes"],["Segnala un annuncio","Reportar un anuncio"],["Padova, Italia","España"],["© 2026 StudentBnB — Prototipo operativo","© 2026 StudentBnB — Prototipo operativo"],
      ["Chiudi","Cerrar"],["Accedi alla demo","Acceder a la demostración"],["Salva i preferiti e ritrova gli annunci pubblicati da questo dispositivo.","Guarda tus favoritos y recupera los anuncios publicados desde este dispositivo."],["Continua","Continuar"],
      ["Offerta chiara, contatti diretti","Oferta clara, contacto directo"],["Pubblica il tuo annuncio","Publica tu anuncio"],["Compila i campi che permettono allo studente di capire e confrontare realmente l’offerta commerciale.","Completa los campos para que el estudiante pueda entender y comparar realmente la oferta."],["Fasi del modulo","Pasos del formulario"],["Alloggio","Alojamiento"],["Costi","Precios"],["Condizioni","Condiciones"],
      ["Alloggio e posizione","Alojamiento y zona"],["Indica subito che cosa viene affittato e dove si trova.","Indica qué se alquila y en qué zona se encuentra."],["Città","Ciudad"],["Seleziona","Selecciona"],["Quartiere/zona","Barrio/zona"],["Prima seleziona la città","Primero selecciona la ciudad"],["Tipologia","Tipo"],["Stanza singola","Habitación individual"],["Posto letto in doppia","Cama en habitación doble"],["Bilocale","Apartamento de un dormitorio"],["Monolocale","Estudio"],["Appartamento (3 camere)","Piso de 3 habitaciones"],["Formula","Modalidad"],["In appartamento condiviso","En piso compartido"],["Appartamento intero","Vivienda completa"],["Residence per studenti","Residencia de estudiantes"],["Formula all inclusive","Todo incluido"],
      ["Superficie stanza (m²)","Superficie de la habitación (m²)"],["Superficie alloggio (m²)","Superficie de la vivienda (m²)"],["Numero coinquilini","Número de compañeros"],["Piano","Planta"],["Università/facoltà vicina","Universidad/facultad cercana"],["Distanza università (min)","Distancia a la universidad (min)"],["Distanza centro (min)","Distancia al centro (min)"],["Caratteristica sintetica","Característica destacada"],["Disponibile da","Disponible desde"],
      ["Fotografie dell’alloggio","Fotografías del alojamiento"],["Carica da 1 a 8 fotografie. La prima immagine sarà utilizzata come copertina dell’annuncio.","Carga de 1 a 8 fotografías. La primera se utilizará como portada del anuncio."],["Nessuna fotografia selezionata.","Ninguna fotografía seleccionada."],
      ["Costi realmente sostenuti","Costes reales"],["Il prezzo deve essere confrontabile: specifica cosa è incluso e cosa rimane fuori.","El precio debe ser comparable: especifica qué está incluido y qué no."],["Canone mensile (€)","Alquiler mensual (€)"],["Spese incluse?","¿Gastos incluidos?"],["Sì, incluse","Sí, incluidos"],["No, escluse","No, excluidos"],["Stima spese mensili (€)","Gastos mensuales estimados (€)"],["Deposito cauzionale (€)","Fianza (€)"],["Tipo inserzionista","Tipo de anunciante"],["Privato","Particular"],["Agenzia","Agencia"],["Residence/Gestore","Residencia/Gestor"],["Costo di agenzia","Honorarios de agencia"],["Quali costi sono compresi?","¿Qué gastos están incluidos?"],
      ["Spese condominiali","Gastos de comunidad"],["Riscaldamento","Calefacción"],["Acqua","Agua"],["Elettricità","Electricidad"],["Pulizie periodiche","Limpieza periódica"],["Manutenzione ordinaria","Mantenimiento ordinario"],
      ["Contratto, uscita e servizi","Contrato, salida y servicios"],["Durata minima e preavviso incidono sul rischio e sulla convenienza dell’offerta.","La estancia mínima y el preaviso influyen en la flexibilidad de la oferta."],["Tipo di contratto","Tipo de contrato"],["Permanenza minima","Estancia mínima"],["Preavviso per uscire","Preaviso para dejar la vivienda"],["Autonomo","Individual"],["Centralizzato","Centralizada"],["Pompa di calore","Bomba de calor"],["Non presente","No disponible"],["Aria condizionata","Aire acondicionado"],["Solo in alcune stanze","Solo en algunas habitaciones"],["Animali","Mascotas"],["Non ammessi","No permitidos"],["Ammessi","Permitidos"],["Da concordare","A consultar"],["Fumatori","Fumadores"],["Solo all'esterno","Solo en el exterior"],["Descrizione completa","Descripción completa"],["Regole della casa (una per riga)","Normas de la casa (una por línea)"],["Servizi nelle vicinanze (uno per riga)","Servicios cercanos (uno por línea)"],
      ["I contatti sono mostrati direttamente allo studente. Nella demo non vengono inviati a un server.","Los datos de contacto se muestran directamente al estudiante. En la demostración no se envían a ningún servidor."],["Telefono","Teléfono"],["Anteprima annuncio","Vista previa"],["Salva e pubblica nella demo","Guardar y publicar en la demostración"]
    ];
    const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let node;while(node=walker.nextNode()){for(const [a,b] of pairs)if(node.nodeValue.includes(a))node.nodeValue=node.nodeValue.replaceAll(a,b)}
    const placeholders={"Es. 2° con ascensore":"Ej. 2.º con ascensor","Es. Ingegneria":"Ej. Ingeniería","Es. vicina alla stazione":"Ej. cerca de la estación","Es. 1 settembre":"Ej. 1 de septiembre","Es. una mensilità + IVA":"Ej. una mensualidad + IVA","Es. transitorio studenti":"Ej. alquiler temporal para estudiantes","Es. 6 mesi":"Ej. 6 meses","Es. 3 mesi":"Ej. 3 meses","Descrivi alloggio, arredi, composizione, zona e collegamenti.":"Describe la vivienda, el mobiliario, la distribución, la zona y el transporte.","Rispetto degli spazi comuni\nNiente feste":"Respeto de las zonas comunes\nNo se permiten fiestas","Supermercato: 3 min\nFermata bus: 2 min":"Supermercado: 3 min\nParada de autobús: 2 min","nome@email.it":"nombre@email.es"};
    qsa("[placeholder]").forEach(el=>{if(placeholders[el.placeholder])el.placeholder=placeholders[el.placeholder]});
    document.documentElement.lang="es";
  }

  function getUserListings(){
    try { return JSON.parse(localStorage.getItem("studentbnb_user_listings") || "[]"); }
    catch { return []; }
  }
  function allListings(){ return [...getUserListings(), ...DATA.listings]; }
  function favorites(){
    try { return new Set(JSON.parse(localStorage.getItem("studentbnb_favorites") || "[]")); }
    catch { return new Set(); }
  }
  function saveFavorites(set){ localStorage.setItem("studentbnb_favorites", JSON.stringify([...set])); }

  function toast(message){
    let el = qs("#toast");
    if(!el){
      el = document.createElement("div");
      el.id = "toast";
      el.className = "toast";
      document.body.appendChild(el);
    }
    el.textContent = message;
    requestAnimationFrame(() => el.classList.add("show"));
    clearTimeout(window.__toastTimer);
    window.__toastTimer = setTimeout(() => el.classList.remove("show"), 2500);
  }

  function setupHeader(){
    const menu = qs(".menu-button");
    const nav = qs(".main-nav");
    if(menu && nav){
      menu.addEventListener("click", () => {
        const open = nav.classList.toggle("open");
        menu.setAttribute("aria-expanded", String(open));
      });
    }
    qsa("[data-login]").forEach(btn => btn.addEventListener("click", e => {
      e.preventDefault();
      qs("#login-modal")?.classList.add("active");
    }));
    qsa("[data-close-modal]").forEach(btn => btn.addEventListener("click", () => {
      btn.closest(".modal-backdrop")?.classList.remove("active");
    }));
    qsa(".modal-backdrop").forEach(backdrop => backdrop.addEventListener("click", e => {
      if(e.target === backdrop) backdrop.classList.remove("active");
    }));
    const loginForm = qs("#login-form");
    if(loginForm){
      loginForm.addEventListener("submit", e => {
        e.preventDefault();
        const email = new FormData(loginForm).get("email");
        localStorage.setItem("studentbnb_user", String(email));
        qs("#login-modal")?.classList.remove("active");
        updateAccountLabel();
        toast("Acceso de demostración completado");
      });
    }
    updateAccountLabel();
  }

  function updateAccountLabel(){
    const email = localStorage.getItem("studentbnb_user");
    qsa("[data-account-label]").forEach(el => {
      el.textContent = email ? email.split("@")[0] : "Acceder";
    });
  }

  function setupFavorites(){
    qsa("[data-favorite]").forEach(btn => {
      const id = btn.getAttribute("data-favorite");
      const favs = favorites();
      btn.classList.toggle("active", favs.has(id));
      btn.setAttribute("aria-pressed", String(favs.has(id)));
      btn.addEventListener("click", e => {
        e.preventDefault();
        e.stopPropagation();
        const set = favorites();
        if(set.has(id)){ set.delete(id); toast("Eliminado de favoritos"); }
        else { set.add(id); toast("Guardado en favoritos"); }
        saveFavorites(set);
        qsa(`[data-favorite="${CSS.escape(id)}"]`).forEach(x => {
          x.classList.toggle("active", set.has(id));
          x.setAttribute("aria-pressed", String(set.has(id)));
        });
      });
    });
  }

  function setupHome(){
    const form = qs("#home-search");
    if(form){
      form.addEventListener("submit", e => {
        e.preventDefault();
        const fd = new FormData(form);
        const city = fd.get("city");
        const type = fd.get("type");
        location.href = `ciudad.html?city=${encodeURIComponent(city || "madrid")}&type=${encodeURIComponent(type || "")}`;
      });
    }
    qsa("[data-city-coming]").forEach(el => el.addEventListener("click", e => {
      e.preventDefault();
      toast(`${el.getAttribute("data-city-coming")} estará disponible próximamente.`);
    }));
  }

  function listingCard(l){
    const expenseClass = l.expensesIncluded ? "included" : "excluded";
    const expenseText = l.expensesIncluded ? "● Gastos incluidos" : `● Gastos no incluidos${l.expenses ? ` (+${money(l.expenses)})` : ""}`;
    const priceClass = l.expensesIncluded ? "" : "expenses-out";
    return `
      <article class="listing-card" data-id="${escapeHtml(l.id)}">
        <a href="anuncio.html?id=${encodeURIComponent(l.id)}" aria-label="Abrir ${escapeHtml(l.zone)}">
          <img class="listing-image" src="${escapeHtml(l.image || "assets/img/alloggio-1.webp")}" alt="${escapeHtml(l.type)} en ${escapeHtml(l.zone)}">
        </a>
        <div class="listing-main">
          <div class="listing-title-row">
            <h3><a href="anuncio.html?id=${encodeURIComponent(l.id)}">${escapeHtml(l.zone)}</a></h3>
            <span class="pill">${escapeHtml(l.tag || "oferta transparente")}</span>
          </div>
          <div class="listing-meta"><span>♙ ${escapeHtml(l.type)}</span><span>${escapeHtml(l.arrangement || "")}</span></div>
          <div class="listing-submeta">
            <span>Disponible ${escapeHtml(l.available || "a consultar")}</span>
            <span>🚲 ${escapeHtml(l.university || "Universidad")}: ${escapeHtml(String(l.universityMinutes || "—"))} min</span>
            <span>🚌 Centro: ${escapeHtml(String(l.centerMinutes || "—"))} min</span>
          </div>
        </div>
        <div class="listing-price">
          <div class="price ${priceClass}">${money(l.price)}<small>/mes</small></div>
          <span class="expenses-badge ${expenseClass}">${expenseText}</span>
        </div>
        <div class="listing-actions">
          <button class="favorite-button" type="button" data-favorite="${escapeHtml(l.id)}" aria-label="Aggiungi ai preferiti">♡</button>
          <a href="anuncio.html?id=${encodeURIComponent(l.id)}" aria-label="Abrir anuncio">›</a>
        </div>
      </article>`;
  }

  function setupCityPage(){
    const list = qs("#listing-results");
    if(!list) return;
    const controls = {
      zone: qs("#filter-zone"),
      type: qs("#filter-type"),
      price: qs("#filter-price"),
      expenses: qs("#filter-expenses"),
      sort: qs("#filter-sort")
    };
    const params = new URLSearchParams(location.search);
    const citySlug = params.get("city") || "madrid";
    const city = DATA.cities.find(c => c.slug === citySlug) || DATA.cities.find(c => c.slug === "madrid");
    const cityListings = allListings().filter(l => (l.city || "padova") === city.slug);
    document.title = `Alojamiento para estudiantes en ${city.name} | StudentBnB`;
    const cityTitle=qs("#city-name"), cityCount=qs("#city-count"), cityDescription=qs("#city-description"), cityCrumb=qs("#city-breadcrumb");
    const cityHero=qs(".city-hero-bg");
    const cityHeroImages={madrid:"citta-madrid.webp",barcelona:"citta-barcelona.webp",valencia:"citta-valencia.webp",sevilla:"citta-sevilla.webp",granada:"citta-granada.webp",salamanca:"citta-salamanca.webp",zaragoza:"citta-zaragoza.webp",bilbao:"citta-bilbao.webp",malaga:"citta-malaga.webp",alicante:"citta-alicante.webp",murcia:"citta-murcia.webp",santiago:"citta-santiago.webp",valladolid:"citta-valladolid.webp",cordoba:"citta-cordoba.webp"};
    if(cityHero) cityHero.style.backgroundImage=`url("assets/img/${cityHeroImages[city.slug] || "citta-madrid.webp"}")`;
    if(cityTitle) cityTitle.textContent=city.name;
    if(cityCount) cityCount.textContent=`${cityListings.length} anuncios de demostración disponibles`;
    if(cityDescription) cityDescription.textContent=`Descubre alojamientos de demostración en las zonas universitarias de ${city.name}. Cada oferta muestra claramente precios, gastos y condiciones del contrato.`;
    if(cityCrumb) cityCrumb.textContent=city.name;
    if(controls.zone){
      const zones=[...new Set(cityListings.map(l=>l.zone))];
      controls.zone.innerHTML='<option value="">Tutte le zone</option>'+zones.map(z=>`<option>${escapeHtml(z)}</option>`).join('');
    }
    if(params.get("type") && controls.type){
      const requested = params.get("type");
      const option = [...controls.type.options].find(o => o.value.toLowerCase().includes(requested.toLowerCase()) || requested.toLowerCase().includes(o.value.toLowerCase()));
      if(option) controls.type.value = option.value;
    }
    function render(){
      let items = allListings().filter(l => {
        if((l.city || "padova") !== city.slug) return false;
        if(controls.zone?.value && l.zone !== controls.zone.value) return false;
        if(controls.type?.value && l.type !== controls.type.value) return false;
        if(controls.price?.value && Number(l.price) > Number(controls.price.value)) return false;
        if(controls.expenses?.value === "included" && !l.expensesIncluded) return false;
        if(controls.expenses?.value === "excluded" && l.expensesIncluded) return false;
        return true;
      });
      const sort = controls.sort?.value;
      if(sort === "price-asc") items.sort((a,b) => a.price-b.price);
      if(sort === "price-desc") items.sort((a,b) => b.price-a.price);
      if(sort === "zone") items.sort((a,b) => a.zone.localeCompare(b.zone,"it"));
      list.innerHTML = items.length ? items.map(listingCard).join("") : `<div class="empty-state"><h3>No hay anuncios con estos filtros</h3><p>Prueba a ampliar la zona, el precio o el tipo de alojamiento.</p></div>`;
      qs("#result-count").textContent = `${items.length} ${items.length === 1 ? "oferta de demostración encontrada" : "ofertas de demostración encontradas"} en ${city.name}`;
      setupFavorites();
    }
    Object.values(controls).filter(Boolean).forEach(c => c.addEventListener("change", render));
    render();
  }

  function getListingById(id){
    return allListings().find(x => String(x.id) === String(id)) || DATA.listings[0];
  }

  function setupDetail(){
    const root = qs("#detail-root");
    if(!root) return;
    const id = new URLSearchParams(location.search).get("id") || DATA.listings[0]?.id;
    const l = getListingById(id);
    document.title = `${l.type} en ${l.zone}, ${l.cityName || "Madrid"} | StudentBnB`;
    const detailCityLink=qs("#detail-city-link");
    if(detailCityLink){detailCityLink.textContent=l.cityName || "Madrid";detailCityLink.href=`ciudad.html?city=${encodeURIComponent(l.city || "madrid")}`;}
    const gallery = (l.gallery && l.gallery.length ? l.gallery : [l.image]).slice(0,4);
    while(gallery.length < 4) gallery.push(gallery[gallery.length-1] || "assets/img/alloggio-1.webp");
    root.innerHTML = detailTemplate(l, gallery);
    qsa(".thumb", root).forEach(btn => btn.addEventListener("click", () => {
      qs("#main-photo", root).src = btn.dataset.src;
    }));
    setupFavorites();
  }

  function detailTemplate(l, gallery){
    const billList = (l.bills || []).map(x=>`<li>${escapeHtml(x)}</li>`).join("");
    const rules = (l.rules || []).map(x=>`<li>${escapeHtml(x)}</li>`).join("");
    const nearby = (l.nearby || []).map(x=>`<li>${escapeHtml(x)}</li>`).join("");
    const email = encodeURIComponent(l.email || "info@studentbnb.it");
    const wa = (l.whatsapp || "").replace(/\D/g,"");
    const phone = (l.phone || "").replace(/\s/g,"");
    const expenseText = l.expensesIncluded ? "Gastos incluidos" : `Gastos no incluidos${l.expenses ? `: aprox. ${money(l.expenses)}/mes` : ""}`;
    const agency = l.publisher?.includes("Agencia") ? `<dt>Honorarios de agencia</dt><dd>${escapeHtml(l.agencyFee || "Por declarar")}</dd>` : "";
    return `
      <div class="detail-title-row">
        <div>
          <h1>${escapeHtml(l.type)} in ${escapeHtml(l.zone)} <span class="pill">${escapeHtml(l.tag || "")}</span></h1>
          <div class="top-meta"><span>♙ ${escapeHtml(l.type)}</span><span>⌂ ${escapeHtml(l.arrangement || "")}</span><span>▣ Disponible ${escapeHtml(l.available || "")}</span></div>
        </div>
        <div class="detail-price"><div class="price">${money(l.price)}<small>/mes</small></div><span class="expenses-badge ${l.expensesIncluded?"included":"excluded"}">${expenseText}</span></div>
        <button class="favorite-button" data-favorite="${escapeHtml(l.id)}" aria-label="Aggiungi ai preferiti">♡</button>
      </div>

      <div class="gallery-contact">
        <div class="gallery">
          <img id="main-photo" class="main-photo" src="${escapeHtml(gallery[0])}" alt="${escapeHtml(l.type)} a ${escapeHtml(l.zone)}">
          <div class="thumbs">
            ${gallery.slice(1).map((src,i)=>`<button class="thumb" data-src="${escapeHtml(src)}" aria-label="Abrir foto ${i+2}"><img src="${escapeHtml(src)}" alt=""></button>`).join("")}
          </div>
        </div>
        <aside class="contact-card">
          <h2>Contacta con ${l.publisher?.includes("Agencia") ? "la agencia" : "el anunciante"}</h2>
          <p>Pregunta por los gastos, el contrato y la disponibilidad antes de concertar una visita.</p>
          <div class="contact-stack">
            ${wa ? `<a class="btn btn-green btn-block" href="https://wa.me/${wa}?text=${encodeURIComponent("Hola, contacto por el anuncio StudentBnB "+l.id)}" target="_blank" rel="noopener">◉ Contactar por WhatsApp</a>` : ""}
            <a class="btn btn-blue btn-block" href="mailto:${email}?subject=${encodeURIComponent("Información sobre el anuncio "+l.id)}">✉ Enviar un correo</a>
            ${phone ? `<a class="btn btn-white btn-block" href="tel:${phone}">☎ Llamar: ${escapeHtml(l.phone)}</a>` : ""}
          </div>
          <div class="safety-box"><strong>Alquila con seguridad</strong><br>No envíes dinero antes de verificar el alojamiento, el contrato y la identidad del anunciante.</div>
        </aside>
      </div>

      <div class="distance-strip">
        <div class="distance-item"><b>🚲</b><span>Universidad ${escapeHtml(l.university || "")}<strong>${escapeHtml(String(l.universityMinutes || "—"))} min</strong></span></div>
        <div class="distance-item"><b>🚌</b><span>Centro de la ciudad<strong>${escapeHtml(String(l.centerMinutes || "—"))} min</strong></span></div>
        <div class="distance-item"><b>🚶</b><span>Estación de tren<strong>5 min</strong></span></div>
        <div class="distance-item"><b>🛒</b><span>Supermercado<strong>3 min</strong></span></div>
        <div class="distance-item"><b>🚏</b><span>Parada de autobús<strong>2 min</strong></span></div>
      </div>

      <div class="detail-grid">
        <section class="info-card">
          <h2>Detalles de la oferta</h2>
          <dl class="definition-list">
            <dt>Tipo</dt><dd>${escapeHtml(l.type)}</dd>
            <dt>Superficie de la habitación</dt><dd>${escapeHtml(String(l.surface || "—"))} m²</dd>
            <dt>Superficie de la vivienda</dt><dd>${escapeHtml(String(l.apartmentSurface || "—"))} m²</dd>
            <dt>Compañeros de piso</dt><dd>${escapeHtml(String(l.roommates ?? "—"))}</dd>
            <dt>Planta</dt><dd>${escapeHtml(l.floor || "—")}</dd>
            <dt>Calefacción</dt><dd>${escapeHtml(l.heating || "—")}</dd>
            <dt>Aire acondicionado</dt><dd>${escapeHtml(l.airConditioning || "—")}</dd>
            <dt>Wi‑Fi</dt><dd>${escapeHtml(l.wifi || "—")}</dd>
            <dt>Mascotas</dt><dd>${escapeHtml(l.pets || "—")}</dd>
            <dt>Fumadores</dt><dd>${escapeHtml(l.smokers || "—")}</dd>
            <dt>Contrato</dt><dd>${escapeHtml(l.contract || "—")}</dd>
            ${agency}
          </dl>
        </section>
        <section class="info-card"><h2>Qué está incluido</h2><ul class="check-list">${billList || "<li>Información pendiente de confirmar</li>"}</ul></section>
        <div>
          <section class="info-card cost-card"><h2>Alquiler</h2><div class="price">${money(l.price)}<small>/mes</small></div><strong>${expenseText}</strong></section>
          <section class="info-card cost-card" style="margin-top:16px"><h2>Fianza</h2><strong style="font-size:24px">${money(l.deposit)}</strong><br><span>${l.deposit && l.price ? (l.deposit/l.price).toFixed(0)+" mensualidades" : "Por definir"}</span></section>
        </div>
      </div>

      <div class="description-grid">
        <section class="info-card">
          <h2>Descripción</h2><p>${escapeHtml(l.description || "")}</p>
          <div class="description-columns">
            <div><h3>Normas de la casa</h3><ul class="bullet-list">${rules}</ul></div>
            <div><h3>Servicios cercanos</h3><ul class="bullet-list">${nearby}</ul></div>
          </div>
        </section>
        <section class="info-card map-card"><h2>Zona</h2><img src="assets/img/mappa-arcella.webp" alt="Representación orientativa de la zona"><strong>${escapeHtml(l.zone)}, ${escapeHtml(l.cityName || "Madrid")}</strong><p>La calle y el número se comunican directamente al contactar con el anunciante.</p></section>
      </div>

      <div class="detail-footer-grid">
        <section class="info-card"><h2>▣ Disponibilidad</h2><strong>Disponible ${escapeHtml(l.available || "")}</strong><br><span>Estancia mínima: ${escapeHtml(l.minimumStay || "a consultar")}</span><br><span>Preaviso: ${escapeHtml(l.notice || "a consultar")}</span></section>
        <section class="info-card"><h2>◎ Quién publica</h2><strong>${escapeHtml(l.publisher || "Particular")}</strong><br><span>Anuncio publicado: ${escapeHtml(l.published || "hoy")}</span><br><span>Última actualización: ${escapeHtml(l.updated || "hoy")}</span></section>
        <section class="info-card"><h2>◇ ID del anuncio</h2><strong>#${escapeHtml(l.id)}</strong><br><a href="mailto:reportes@studentbnb.es?subject=${encodeURIComponent("Reporte del anuncio "+l.id)}" style="color:#1565a8;text-decoration:underline">Reportar anuncio</a></section>
      </div>`;
  }

  function setupPublish(){
    const form = qs("#publish-form");
    if(!form) return;
    const expenseIncluded = qs("#expenses-included");
    const expenseAmountWrap = qs("#expense-amount-wrap");
    const agency = qs("#publisher-type");
    const agencyWrap = qs("#agency-fee-wrap");
    const citySelect=qs("#city"), zoneSelect=qs("#zone"), photosInput=qs("#photos");
    function syncZones(){
      if(!citySelect || !zoneSelect) return;
      const zones=DATA.cities.find(c=>c.slug===citySelect.value)?.zones || [];
      zoneSelect.innerHTML='<option value="">Selecciona barrio/zona</option>'+zones.map(z=>`<option>${escapeHtml(z)}</option>`).join('');
    }
    function syncConditional(){
      if(expenseAmountWrap) expenseAmountWrap.classList.toggle("hidden", expenseIncluded?.value !== "no");
      if(agencyWrap) agencyWrap.classList.toggle("hidden", agency?.value !== "Agencia");
    }
    expenseIncluded?.addEventListener("change",syncConditional);
    agency?.addEventListener("change",syncConditional);
    citySelect?.addEventListener("change",syncZones);
    photosInput?.addEventListener("change",()=>previewSelectedPhotos(photosInput));
    syncConditional();
    syncZones();

    qs("#preview-button")?.addEventListener("click", async () => {
      if(!form.reportValidity()) return;
      const gallery=await getProcessedPhotos(photosInput);if(!gallery.length)return;
      const l = formToListing(new FormData(form));
      l.gallery=gallery;l.image=gallery[0];
      const preview = qs("#publish-preview");
      preview.innerHTML = listingCard(l);
      preview.classList.add("active");
      setupFavorites();
      preview.scrollIntoView({behavior:"smooth",block:"center"});
    });

    form.addEventListener("submit", async e => {
      e.preventDefault();
      if(!form.reportValidity()) return;
      const gallery=await getProcessedPhotos(photosInput);if(!gallery.length)return;
      const l = formToListing(new FormData(form));
      l.gallery=gallery;l.image=gallery[0];
      const saved = getUserListings();
      saved.unshift(l);
      try{localStorage.setItem("studentbnb_user_listings", JSON.stringify(saved));}catch{toast("Las fotografías ocupan demasiado espacio. Prueba con menos imágenes.");return;}
      const msg = qs("#publish-success");
      msg.classList.add("active");
      msg.innerHTML = `<strong>Anuncio guardado en la demostración.</strong><br>Ya aparece en el listado de ${escapeHtml(l.cityName)} en este dispositivo. <a href="ciudad.html?city=${encodeURIComponent(l.city)}" style="text-decoration:underline">Abrir los anuncios</a>.`;
      msg.scrollIntoView({behavior:"smooth",block:"center"});
      form.reset();
      form._processedPhotos=null;qs("#photo-preview").innerHTML="";qs("#photo-status").textContent="Ninguna fotografía seleccionada.";qs("#photo-status").classList.remove("selected");
      syncConditional();
      syncZones();
    });
  }

  function previewSelectedPhotos(input){
    const files=[...(input?.files||[])];input.form._processedPhotos=null;
    if(files.length>8){input.value="";toast("Puedes cargar un máximo de 8 fotografías.");return previewSelectedPhotos(input);}
    const root=qs("#photo-preview"),status=qs("#photo-status");root.innerHTML="";
    files.forEach(file=>{const image=document.createElement("img");image.src=URL.createObjectURL(file);image.alt="Vista previa de la fotografía";image.onload=()=>URL.revokeObjectURL(image.src);root.appendChild(image)});
    status.textContent=files.length?`${files.length} ${files.length===1?'fotografía seleccionada':'fotografías seleccionadas'}. La primera será la portada.`:"Ninguna fotografía seleccionada.";status.classList.toggle("selected",files.length>0);
  }

  async function getProcessedPhotos(input){
    const files=[...(input?.files||[])].slice(0,8);if(!files.length){toast("Carga al menos una fotografía.");return []}
    if(input.form._processedPhotos)return input.form._processedPhotos;
    toast("Preparando las fotografías…");
    try{input.form._processedPhotos=await Promise.all(files.map(compressPhoto));return input.form._processedPhotos;}
    catch{toast("No se puede leer una de las fotografías. Prueba a sustituirla.");return []}
  }

  function compressPhoto(file){
    return new Promise((resolve,reject)=>{const image=new Image(),url=URL.createObjectURL(file);image.onload=()=>{const max=1200,scale=Math.min(1,max/Math.max(image.width,image.height)),canvas=document.createElement("canvas");canvas.width=Math.round(image.width*scale);canvas.height=Math.round(image.height*scale);canvas.getContext("2d").drawImage(image,0,0,canvas.width,canvas.height);URL.revokeObjectURL(url);resolve(canvas.toDataURL("image/webp",.72))};image.onerror=()=>{URL.revokeObjectURL(url);reject(new Error("Immagine non valida"))};image.src=url});
  }

  function formToListing(fd){
    const id = `PD-DEMO-${Date.now().toString().slice(-6)}`;
    const included = fd.get("expensesIncluded") === "yes";
    return {
      id, city:fd.get("city"), cityName:DATA.cities.find(c=>c.slug===fd.get("city"))?.name || "Madrid", zone:fd.get("zone"), tag:fd.get("tag") || "nuevo anuncio", type:fd.get("type"),
      arrangement:fd.get("arrangement"), price:Number(fd.get("price")), expensesIncluded:included,
      expenses:included ? 0 : Number(fd.get("expenses")||0), available:fd.get("available"),
      university:fd.get("university") || "Universidad", universityMinutes:Number(fd.get("universityMinutes")||0),
      centerMinutes:Number(fd.get("centerMinutes")||0), image:"assets/img/alloggio-1.webp",
      gallery:["assets/img/camera.webp","assets/img/cucina.webp","assets/img/bagno.webp","assets/img/corridoio.webp"],
      surface:Number(fd.get("surface")||0), apartmentSurface:Number(fd.get("apartmentSurface")||0),
      roommates:Number(fd.get("roommates")||0), floor:fd.get("floor"), heating:fd.get("heating"),
      airConditioning:fd.get("airConditioning"), wifi:fd.get("wifi"), pets:fd.get("pets"),
      smokers:fd.get("smokers"), contract:fd.get("contract"), deposit:Number(fd.get("deposit")||0),
      minimumStay:fd.get("minimumStay"), notice:fd.get("notice"),
      bills:fd.getAll("bills"), description:fd.get("description"),
      rules:(fd.get("rules")||"").split("\n").filter(Boolean),
      nearby:(fd.get("nearby")||"").split("\n").filter(Boolean),
      publisher:fd.get("publisherType"), agencyFee:fd.get("agencyFee"), phone:fd.get("phone"),
      email:fd.get("email"), whatsapp:(fd.get("whatsapp")||"").replace(/\D/g,""),
      published:"hoy", updated:"hoy"
    };
  }

  function escapeHtml(value){
    return String(value ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));
  }

  document.addEventListener("DOMContentLoaded", () => {
    translateStaticPage();
    setupHeader();
    setupHome();
    setupCityPage();
    setupDetail();
    setupPublish();
    setupFavorites();
  });
})();
