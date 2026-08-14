(() => {
  const cities=[
    ['madrid','Madrid',['Argüelles','Centro – Malasaña','Chamberí','Ciudad Universitaria','La Latina','Lavapiés','Moncloa','Retiro','Salamanca','Tetuán','Vallecas','Vicálvaro','Otro barrio/zona']],
    ['barcelona','Barcelona',['Ciutat Vella','Eixample','Gràcia','Horta – Guinardó','Les Corts','Poblenou','Poble-sec','Sarrià – Sant Gervasi','Sants – Montjuïc','Sant Andreu','Sant Martí','Zona Universitària','Otro barrio/zona']],
    ['valencia','Valencia',['Algirós','Benimaclet','Benicalap','Campanar','Ciutat Vella','El Cabanyal','Extramurs','La Saïdia','L’Eixample','Malilla','Mestalla','Patraix','Quatre Carreres','Ruzafa','Otro barrio/zona']],
    ['sevilla','Sevilla',['Alameda','Bellavista','Cerro del Águila','El Porvenir','La Cartuja','Los Bermejales','Los Remedios','Macarena','Nervión','Prado de San Sebastián','San Bernardo','Santa Cruz','Triana','Otro barrio/zona']],
    ['granada','Granada',['Albaicín','Beiro','Camino de Ronda','Centro – Realejo','Cerrillo de Maracena','Chana','Fígares','La Cartuja','La Zubia','Pajaritos','Plaza de Toros','Ronda','Zaidín','Otro barrio/zona']],
    ['salamanca','Salamanca',['Centro Histórico','Garrido Norte','Garrido Sur','Pizarrales','San Bernardo','San José','San Vicente','Tejares','Van Dyck','Vidal','Zurguén','Otro barrio/zona']],
    ['zaragoza','Zaragoza',['Actur','Centro','Delicias','La Almozara','La Magdalena','Las Fuentes','Romareda','San José','Universidad','Valdespartera','Torrero','Casco Histórico','Otro barrio/zona']],
    ['bilbao','Bilbao',['Abando','Basurto','Begoña','Casco Viejo','Deusto','Indautxu','Irala','Rekalde','San Francisco','Santutxu','Uribarri','Otro barrio/zona']],
    ['malaga','Málaga',['Carretera de Cádiz','Centro Histórico','Cruz de Humilladero','El Ejido','El Palo','Huelin','La Malagueta','La Merced','Pedregalejo','Teatinos','Victoria','Otro barrio/zona']],
    ['alicante','Alicante',['Benalúa','Campoamor','Carolinas Altas','Carolinas Bajas','Centro','Ensanche – Diputación','Mercado','Playa de San Juan','San Blas','San Vicente del Raspeig','Vistahermosa','Otro barrio/zona']],
    ['murcia','Murcia',['Centro','El Carmen','Espinardo','Infante Juan Manuel','La Flota','La Fama','La Merced','San Andrés','San Antón','Santa Eulalia','Vistalegre','Otro barrio/zona']],
    ['santiago','Santiago de Compostela',['Campus Norte','Campus Sur','Casco Histórico','Conxo','Ensanche','Fontiñas','O Castiñeiriño','San Lázaro','Santa Marta','Vista Alegre','Otro barrio/zona']],
    ['valladolid','Valladolid',['Arturo Eyries','Centro','Covaresa','Delicias','Huerta del Rey','La Rondilla','Parquesol','Pilarica','Pinar de Jalón','San Juan','Universidad','Otro barrio/zona']],
    ['cordoba','Córdoba',['Centro','Ciudad Jardín','El Brillante','Fátima','Fuensanta','Huerta de la Reina','Levante','Noreña','Poniente','San Basilio','Santa Marina','Valdeolleros','Otro barrio/zona']]
  ];
  const types=['Habitación individual','Cama en habitación doble','Apartamento de un dormitorio'];
  const photos=['alloggio-1.webp','alloggio-2.webp','alloggio-3.webp'];
  const listings=[];
  cities.forEach(([slug,name,zones],ci)=>zones.slice(0,3).forEach((zone,i)=>{const price=[480,330,760][i]+(ci%5)*25;listings.push({
    id:`${slug.slice(0,3).toUpperCase()}-${i+1}-DEMO`,city:slug,cityName:name,zone,tag:['cerca de la universidad','fórmula para estudiantes','amueblado y luminoso'][i],type:types[i],
    arrangement:i===2?'Vivienda completa':'En piso compartido',price,expensesIncluded:i!==1,expenses:i===1?80:0,available:i===0?'1 de septiembre':i===1?'inmediata':'15 de septiembre',
    university:'Campus universitario',universityMinutes:5+i*4,centerMinutes:8+i*3,image:`assets/img/${photos[i]}`,gallery:[`assets/img/${photos[i]}`,'assets/img/cucina.webp','assets/img/bagno.webp','assets/img/corridoio.webp'],
    surface:[18,22,48][i],apartmentSurface:[95,110,48][i],roommates:[2,3,0][i],floor:i===0?'2.º con ascensor':i===1?'1.º':'Planta baja',heating:'Individual',airConditioning:i===2?'Sí':'No',wifi:'Sí – Fibra',pets:'A consultar',smokers:'No permitido',contract:'Alquiler temporal para estudiantes',deposit:price*2,minimumStay:'6 meses',notice:'3 meses',
    bills:i===1?['Gastos de comunidad','Internet Wi-Fi']:['Gastos de comunidad','Agua','Calefacción','Internet Wi-Fi'],description:`Anuncio de demostración para ${name}: ${types[i].toLowerCase()} en la zona de ${zone}. El alojamiento y los contactos son ficticios y sirven exclusivamente para mostrar el funcionamiento de StudentBnB.`,rules:['Respetar las zonas comunes','No se permiten fiestas','Limpieza periódica compartida'],nearby:['Universidad a pocos minutos','Supermercado cercano','Parada de transporte público'],publisher:i===2?'Agencia demo':'Particular demo',agencyFee:i===2?'Sin coste en la demostración':'',phone:'000 000 000',email:'demo@studentbnb.es',whatsapp:'',published:'anuncio de demostración',updated:'hoy',isDemo:true
  })}));
  window.STUDENTBNB_DATA={cities:cities.map(([slug,name,zones])=>({slug,name,zones,count:3,live:true})),listings};
})();
