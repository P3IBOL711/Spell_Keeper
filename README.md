# SPELL KEEPER

## EQUIPO DE DESARROLLO
***Spell Keeper*** fue concebido el 2 de febrero por el estudio **Spells & Bytes Studios** formado por Gonzalo Bertolín Díez, Sandra Conde González, Pablo Folgueira Galán y Alfonso García-Carrasco Puerta.

## SINOPSIS
Onin, el ser más poderoso de Fadaith, ha sido hechizado y despojado de todos sus objetos mágicos por su mayor enemigo, Orkodan, que se ha hecho con el control de su castillo, trayendo con él todo tipo de criaturas que intentarán sembrar el caos. Ahora, sin memoria, debe adentrarse en el para recuperar todo el poder que le arrebataron, y así mantener el mal lejos de Fadaith. En su camino se encontrará con los enemigos que han invadido su hogar, pero también con armas y objetos mágicos que le ayudarán a derrotarlos y a superar los peligros que deberá afrontar para derrotar a Orkodan.

## GÉNERO
Juego roguelike (basado en salas creadas proceduralmente con enemigos, cuyo objetivo es avanzar y sobrevivir, y donde la muerte implica la pérdida de los objetos obtenidos hasta el momento) con una vista top-down al estilo de ["The binding of Isaac"](https://youtu.be/uV-w-Zf-mc8?si=l2bC0diawGzIUS6-) y ["Enter the gungeon"](https://youtu.be/IEsSICRjPdM?si=V5AlARiZy6Nbnkn1), en los que nos hemos inspirado, entre otros.

## RANGO DE EDAD
Desde los 12 años en adelante.

## PEGI Info
PEGI 12 debido a la violencia gráfica hacia los personajes de fantasía y el lenguaje soez leve empleado.

## ALCANCE
Este juego está dirigido principalmente a un público adolescente/joven que busque un desafío, así como para un público más adulto, con mayor experiencia en videojuegos, que quiera poner a prueba sus habilidades.

## LORE
El juego tendrá lugar en la guarida de Onin, que se encuentra en Fadaith, un mundo de fantasía en el que la magia es una parte fundamental de la vida de sus habitantes. En él, los magos son los seres más poderosos, capaces de cambiar la realidad a su antojo. Onin es el más poderoso de todos ellos, y ha dedicado su vida a proteger Fadaith de las fuerzas del mal. Sin embargo, Orkodan ha decidido que es hora de que el mal gobierne, y ha hechizado a Onin para hacerse con su poder e invadir su castillo con las criaturas más malignas del reino, desde esqueletos y fantasmas, hasta plantas carnívoras gigantes y dragones. Onin deberá recuperar su poder y derrotar a Orkodan para devolver la paz a Fadaith.
El castillo de Onin es un lugar mágico y misterioso, compuesto por 4 plantas distintas, cada una de ellas con numerosas salas, llenas de trampas y peligros, pero también de tesoros y objetos mágicos que le ayudarán en su aventura. La primera de ellas es la entrada, que servirá como tutorial, después encontramos **Los Jardines** (colores cálidos), **La Biblioteca** (colores oscuros y temática fantasmagórica o misteriosa), y por último, **La Sala del Trono** (colores grises y rojos, temática solemne). 
Además, el mercader tratará de ayudarle vendiéndole objetos mágicos y armas que le puedan ser de ayuda a lo largo de las diferentes salas.

## JUGADOR
### MECÁNICAS DEL JUGADOR
- **Moverse** en 8 direcciones, norte, sur, este, oeste, noreste, noroeste, sureste y suroeste con las teclas WASD.
- **Recoger** objetos pasando por encima de ellos.
- **Atacar** cuerpo a cuerpo y a distancia con el click izquierdo para el ataque cuerpo a cuerpo y con el click derecho para el ataque a distancia. Los ataques a distancia consumen un recurso/estadística del jugador, el mana, este se consume usando ataques a distancia.
- **Equiparse** armas usando las teclas Q y E para rotar a izquierda o derecha tus armas del tipo que estes atacando en ese momento, es decir, si estabas con un arma cuerpo a cuerpo y pulsas Q y E rotaras sobre las armas cuerpo a cuerpo y lo mismo para cuando ataques a distancia.
- **Interactuar** con ciertos objetos del entorno mediante la tecla F, estos objetos veras un reborde blanco para poder interactuar con ellos.
- **Escudarse** del daño presionando la tecla SHIFT, durante 3 segundos eres inmune a todo daño que te venga y cuando acaba esa duración el escudo entra en enfriamiento durante 10 segundo en los cuales no podrás usar esta mecánica.

DEPRECADO
- **Comprar** objetos en la tienda.
- **Robar** en la tienda.

### ESTADÍSTICAS Y RECURSOS DEL JUGADOR
- **Vida:** número que indica la cantidad de golpes que el jugador puede recbir antes de morir en el juego, este número esta capado inferiormente a 2 y superiormente a 20. La vida esta representada con sprites de corazones donde cada corazón representa dos unidades de vida, es decir, si tienes 6 de vida maxima, apareceran 3 corazones.
- **Maná:** número capado inferiormente a 10 y superiormente a 1000 que indica cuantos ataques a dsitancia puedes realizar segun con que arma, el mana se recupera con los ataques cuerpo a cuerpo. El maná está representado mediante una barra que representa la cantidad de maná y esta barra se va vaciando o rellenando segun lo que cueste/recupere el ataque realizado.
- **Velocidad de movimiento:** velocidad a la que se mueve el jugador mediante un movimiento rectilineo uniforme, es decir, un cambio a la velocidad es inmediato no va gradual y no hay aceleración. La velocidad de movimiento está capada inferiormente a 30 y superiormente a 200.
- **Suerte:** probabilidad que influirá en los objetos y armas que podrá conseguir el jugador. Mientras más alta mejores objetos y más botín.
- **"Inventario":** es un recursos donde le jugador tiene guardadas sus armas, en todo momento tienes todas las armas que has conseguido a tu disposición.


## ENEMIGOS
- ### JARDINES
    - Plantas Carnívoras
    - Sapos
    - Arañas
    - Insectos
    - Minotauros
- ### BIBLIOTECA
    - Fantasmas
    - Libros
    - Candelabros
    - Murciélagos
- ### CASTILLO
    - Caballeros
    - Dragones
    - Gárgolas
    - Diablo

### ESTADÍSTICAS DE LOS ENEMIGOS
- **Vida:** número que representa la vida del enemigo.
- **Ataque:** número que representa el daño que hace el enemigo.
- **Defensa:** número que representa la resistencia del enemigo.
- **Probabilidad de loot:** probabilidad de que el enemigo deje un objeto al morir.
- **Velocidad de movimiento:** velocidad a la que se mueve el enemigo.

## ARMAS
### ESTADÍSTICAS DE LAS ARMAS
- **Daño:** daño que hace el arma.
- **Alcance:** distancia a la que el arma puede alcanzar al enemigo, basicamente cuanto ocupa el ataque, si es cuerpo a cuerpo, cuanto es el area de la hitbox y si es a distancia cuando ocupa su proyectil.

### CARACTERÍSTICAS DE LAS ARMAS
Las armas se dividen en dos subgrupos grandes:cuerpo a cuerpo y a distancia. Las armas cuerpo a cuerpo tienen distintas carácteristicas que las diferencias unas de otras mientras que las armas a distancia lo que las distingue es el proyectil que lanza.

### ESPECIFICACIÓN DE LAS ARMAS
ARMAS INICIALES
- **dagger**: arma inicial cuerpo a cuerpo la cual tiene la propiedad de _havePuncture_ basicamente hace que el ataque del arma arremeta hacía delante y no la blande de por si, tiene un daño de __, regenera 20 de mana por golpe y tiene un delay por ataque de 250 milisegundos.
- **fireStaff**: arma incial a distancia, simplemente lanza una bola de fuego cada 350 milisegundos, cada proyectil cuesta 5 de mana y hace __ de daño.

ARMAS CUERPO A CUERPO:
con propiedad _haveSlash_
- **chargeSword**: arma que hace __ de daño y cada 4 ataques hace el triple de daño que el daño original con un delay de 500 milisegundos por ataques y regenera 2 de mana por golpe.
- **drainSword**: arma que hace __ de daño con la característica de que se cura la mitad del daño infligido a los enemigos con un delay de 500 milisegundos por ataque y no regenera mana.
- **ChofSword**: arma básica que no hace nada mas que hacer __ de daño con un delay de 300 milisegundos y regenerando 40 de mana por golpe.
- **HOE**: el arma definitiva la cual, por ser el arma definitiva al equiparse tambien viene incluido un gorro de paja a juego con el arma, cada ataque hace INFINITY de daño pero un area muy reducida con un delay de 100 milisegundos entre ataques y si da el ataque regenera todo el mana del jugador.
- **lethalSword**: arma letal para tus enemigos ya que hace un daño __ por ataque con un delay de 200 milisegundos, pero también es letal para ti porque si recibes daño de cualquier fuente del juego teniendo equipada este arma moriras instantaneamente, regenera 20 de mana por ataque.
- **magicSword**: arma que hace __ de daño por ataque con un delay de 300 milisegundos entre ataques, con la característica de que si el jugador tiene toda la vida (no ha recibido daño) este arma lanza un proyectil adicional al ataque cuerpo a cuerpo que inflije un tercio del daño del ataque orginal, regenerado 5 de mana por golpe.
- **megaEspadaMortal**: el arma con el area de ataque más grande de todo el juego, haciendo __ de daño por golpe con un delay de 1000 milisegundos entre ataques y regenerando 170 de mana por golpe.

con propiedad _havePuncture_
- **posionDagger**: arma que inflige 4 + X segundos de daño en el tiempo a los enemigos impactados con un delay de 250 milisegundos entre ataques y regenerando 20 de mana por golpe.
- **spear**: arma básica que hace __ de daño con un delay de 250 milisegundos entre ataques, regenerando 30 de mana por golpe.

ARMAS A DISTANCIA:
- **iceStaff**: arma que lanza un proyectil de hielo infligiendo __ de daño con un delay de 250 milisegundos entre proyectil, con un coste por ataque de 50 de mana. El proyectil tiene una caracteristica que es que cuando impacta con un enemigo este se fragmenta creando una zona en ese sitio que si pasan por encima les hace __ de daño en el tiempo, esta zona tiene una duración de 5000 milisegundos.
- **magicKnife**: arma que lanza un total de 10 proyectiles por ataque con convergen en en el punto en el cual ha sido lanzado el ataque, cada proyectil hace __ de daño y tiene un delay de 250 milisegundos entre ataques, costando cada ataque 50 de mana.
- **poisonStaff**: arma que dispara un proyectil donde ese proyectil hace 3 + X segundos de daño en el tiempo al enemigo impactado con un delay de 300 milisegundos entre ataques, costando 10 de mana cada ataque.
- **shotgun**: arma que dispara 15 proyectiles de la manera en la que se dispararian los perdigones de una escopeta (porque es una) haciendo __ de daño por proyectil con un delay de 250 milisegundos entre ataques, costando cada ataque 5 de mana.
- **thompson**: arma que dispara proyectiles de manera muy rapida ya que tiene un delay de solo 50 milisegundos haciendo __ de daño por proyectil, costando cada ataque 5 de mana.


