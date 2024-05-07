# SPELL KEEPER

## EQUIPO DE DESARROLLO
***Spell Keeper*** fue concebido el 2 de febrero por el estudio **Spells & Bytes Studios** formado por Gonzalo Bertolín Díez, Sandra Conde González, Pablo Folgueira Galán y Alfonso García-Carrasco Puerta.

## SINOPSIS
Red, el ser más poderoso de Fadaith, ha sido hechizado y despojado de todos sus objetos mágicos por su mayor enemigo, Orkodan, que se ha hecho con el control de su castillo, trayendo con él todo tipo de criaturas que intentarán sembrar el caos. Ahora, sin memoria, debe adentrarse en el para recuperar todo el poder que le arrebataron, y así mantener el mal lejos de Fadaith. En su camino se encontrará con los enemigos que han invadido su hogar, pero también con armas y objetos mágicos que le ayudarán a derrotarlos y a superar los peligros que deberá afrontar para derrotar a Orkodan.

## GÉNERO
Juego roguelike (basado en salas creadas proceduralmente con enemigos, cuyo objetivo es avanzar y sobrevivir, y donde la muerte implica la pérdida de los objetos obtenidos hasta el momento) con una vista top-down al estilo de ["The binding of Isaac"](https://youtu.be/uV-w-Zf-mc8?si=l2bC0diawGzIUS6-) y ["Enter the gungeon"](https://youtu.be/IEsSICRjPdM?si=V5AlARiZy6Nbnkn1), en los que nos hemos inspirado, entre otros.

## RANGO DE EDAD
Desde los 12 años en adelante.

## PEGI Info
PEGI 12 debido a la violencia gráfica hacia los personajes de fantasía y el lenguaje soez leve empleado.

## ALCANCE
Este juego está dirigido principalmente a un público adolescente/joven que busque un desafío, así como para un público más adulto, con mayor experiencia en videojuegos, que quiera poner a prueba sus habilidades.

## LORE
El juego tendrá lugar en la guarida de Red, que se encuentra en Fadaith, un mundo de fantasía en el que la magia es una parte fundamental de la vida de sus habitantes. En él, los magos son los seres más poderosos, capaces de cambiar la realidad a su antojo. Red es el más poderoso de todos ellos, y ha dedicado su vida a proteger Fadaith de las fuerzas del mal. Sin embargo, Orkodan ha decidido que es hora de que el mal gobierne, y ha hechizado a Red para hacerse con su poder e invadir su castillo con las criaturas más malignas del reino, desde esqueletos y fantasmas, hasta plantas carnívoras gigantes y dragones. 
Red deberá recuperar su poder y derrotar a Orkodan para devolver la paz a Fadaith.
El castillo de Red es un lugar mágico y misterioso, compuesto por 4 plantas distintas, cada una de ellas con numerosas salas, llenas de trampas y peligros, pero también de tesoros y objetos mágicos que le ayudarán en su aventura. La primera de ellas es la entrada, que servirá como tutorial, después encontramos **Los Jardines** (colores cálidos), **La Biblioteca** (colores oscuros y temática fantasmagórica o misteriosa), y por último, **La Sala del Trono** (colores grises y rojos, temática solemne). 
Además, el mercader tratará de ayudarle vendiéndole objetos mágicos y armas que le puedan ser de ayuda a lo largo de las diferentes salas.

## JUGADOR
### MECÁNICAS DEL JUGADOR
- **Moverse** en 8 direcciones, norte, sur, este, oeste, noreste, noroeste, sureste y suroeste con las teclas WASD.
- **Recoger** objetos pasando por encima de ellos.
- **Atacar** cuerpo a cuerpo y a distancia con el click izquierdo para el ataque cuerpo a cuerpo y con el click derecho para el ataque a distancia. Los ataques a distancia consumen un recurso/estadística del jugador, el mana, este se consume usando ataques a distancia.
- **Equiparse** armas usando las teclas Q y E para rotar a izquierda o derecha tus armas del tipo que estés atacando en ese momento, es decir, si estabas con un arma cuerpo a cuerpo y pulsas Q y E rotaras sobre las armas cuerpo a cuerpo y lo mismo para cuando uses ataques a distancia.
- **Interactuar** con ciertos objetos del entorno mediante la tecla F, en estos objetos verás un reborde blanco para poder interactuar con ellos (o no, jeje).
- **Escudarse** del daño presionando la tecla SHIFT, durante 3 segundos eres inmune a todo daño que te venga y cuando acaba esa duración el escudo entra en enfriamiento durante 10 segundos en los cuales no podrás usar esta mecánica.

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
### ESTADÍSTICAS DE LOS ENEMIGOS
- **Vida:** número que representa la vida del enemigo.
- **Ataque:** número que representa el daño que hace el enemigo.
- **Probabilidad de loot:** probabilidad de que el enemigo deje un objeto al morir.
- **Velocidad de movimiento:** velocidad a la que se mueve el enemigo.
- ### ARMERIA
    - Esqueleto arquero
    - Caballero
    - Goblin Venenoso
- ### JARDINES
    - Plantas Carnívoras
    - Sapos (DEPRECADO)
    - Arañas (DEPRECADO)
    - Insectos (DEPRECADO)
    - Minotauros (DEPRECADO)
    - Slime
    - Goblin Venenoso
    - Golem de lava
- ### BIBLIOTECA
    - Fantasmas (DEPRECADO)
    - Libros 
    - Candelabros (DEPRECADO)
    - Murciélagos (DEPRECADO)
    - Caballero
    - Esqueleto magico
    - Esqueleto
    - Esqueleto normal
- ### CASTILLO (DEPRECADO)
    - Caballeros
    - Dragones
    - Gárgolas
    - Diablo

### ESPECIFICACIÓN DE LOS ENEMIGOS
- **archerSkeleton:** enemigo que tiene __ de vida y __ de velocidad de movimiento, este enemigo persigue al jugador hasta que esta dentro de un rango donde empieza a disparar flechas que infligen 1 de daño cada 1000 milisegundos hacia donde se encuentra el jugador.
- **book:** enemigo que tiene __ de vida y __ de velocidad de movimiento, este enemigo se dirige al jugador hasta que esta al lado de el y le ataca, si puede atacar mas de una vez lo hace cada 2000 milisegundos.
- **carnivorousPlant:** enemigo que tiene __ de vida y 0 de velocidad de movimeinto por lo que no se mueve pero que cuando se encuentra dentro de un rango de ataque empieza a lazar proyectiles cada 1500 milisegundos con un daño de 1 por proyectil y si te acercas a una distancia todavia menor hace un ataque cuerpo a cuerpo cada 1500 milisegundos.
- **slime:** enemigo que tiene __ de vida y __ de velocidad de movimiento, este enemigo se acerca al jugador y cuando esta en rango cada 1500 milsegundos hace un ataque cuerpo a cuerpo infligiendo 1 de daño, cuando muere crea 3 hijos suyos los cuales tienen __ de vida y __ de velocidad de movimiento cada uno, tienen el mismo comportamiento que su padre.
- **knight:** enemigo que tiene __ de vida y __ de velocidad de movimiento, el enemigo se va acercano al jugador y cuando puede atacar desde cualquier ángulo aunque no te vea por ejemplo, si te encuentras abajo de el tambien te puede atacar infligiendo 1 de daño cada 1500 milisegundos.
- **lavaGolem:** enemigo que tiene __ de vida y __ de velocidad de movimiento, el enemigo se acerca al jugador y cuando puede atacar; ataca al jugador cada 1500 milisegundos haciendo 1 de daño por ataque. 
- **magicSkeleton:** enemigo que tiene __ de vida y __ de velocidad de movimiento, se mueve lentamente y ataca al jugador creando un proyectil desde donde este en direccion del jugador cada 1000 milisegundos donde si impacta hace 1 de daño.
- **poisonousGoblin:** enemigo con __ de vida y __ de velocidad de movimiento donde ataca al jugador lanzado flechas/proyectiles cada 900 milisegundos que si impactan en el jugador le hacen 1 de daño.
- **standardSkeleton:** enemigo con __ de vida y __ de velocidad de movimiento donde va persiguiendo al jugador y cuando puede atacar cada 1500 milisegundos ataca al jugador haciendole 1 de daño si impacta.

## ARMAS
### ESTADÍSTICAS DE LAS ARMAS
- **Daño:** daño que hace el arma.
- **Alcance:** distancia a la que el arma puede alcanzar al enemigo, basicamente cuanto ocupa el ataque, si es cuerpo a cuerpo, cuanto es el area de la hitbox y si es a distancia cuando ocupa su proyectil.

### CARACTERÍSTICAS DE LAS ARMAS
Las armas se dividen en dos subgrupos grandes: cuerpo a cuerpo y a distancia. Las armas cuerpo a cuerpo tienen distintas carácteristicas que las diferencias unas de otras mientras que las armas a distancia lo que las distingue es el proyectil que lanza.

### ESPECIFICACIÓN DE LAS ARMAS
ARMAS INICIALES
- **dagger**: arma inicial cuerpo a cuerpo la cual tiene la propiedad de _havePuncture_ basicamente hace que el ataque del arma arremeta hacía delante y no la blande de por si, tiene un daño de __, regenera 20 de mana por golpe y tiene un delay por ataque de 250 milisegundos.
- **fireStaff**: arma incial a distancia, simplemente lanza una bola de fuego cada 350 milisegundos, cada proyectil cuesta 5 de mana y hace __ de daño.

ARMAS CUERPO A CUERPO:
con propiedad _haveSlash_
- **chargeSword**: arma que hace 6 de daño y cada 4 ataques hace el cuadruple de daño que el daño original con un delay de 800 milisegundos por ataques y regenera 10 de mana por golpe.
- **drainSword**: arma que hace 4 de daño con la característica de que se cura la mitad del daño infligido a los enemigos con un delay de 500 milisegundos por ataque y no regenera mana.
- **ChofSword**: arma básica que no hace nada mas que hacer 1 de daño con un delay de 300 milisegundos y regenerando 45 de mana por golpe.
- **HOE**: el arma definitiva la cual, por ser el arma definitiva al equiparse tambien viene incluido un gorro de paja a juego con el arma, cada ataque hace INFINITY de daño pero un area muy reducida con un delay de 100 milisegundos entre ataques y si da el ataque regenera todo el mana del jugador.
- **lethalSword**: arma letal para tus enemigos ya que hace un daño 45 por ataque con un delay de 200 milisegundos, pero también es letal para ti porque si recibes daño de cualquier fuente del juego teniendo equipada este arma moriras instantaneamente, regenera 20 de mana por ataque.
- **magicSword**: arma que hace 15 de daño por ataque con un delay de 300 milisegundos entre ataques, con la característica de que si el jugador tiene toda la vida (no ha recibido daño) este arma lanza un proyectil adicional al ataque cuerpo a cuerpo que inflije un tercio del daño del ataque orginal, regenerado 12 de mana por golpe.
- **megaEspadaMortal**: el arma con el area de ataque más grande de todo el juego, haciendo 30 de daño por golpe con un delay de 1000 milisegundos entre ataques y regenerando 170 de mana por golpe.

con propiedad _havePuncture_
- **posionDagger**: arma que inflige 4 + 2 de daño en 2 segundos en el tiempo a los enemigos impactados con un delay de 250 milisegundos entre ataques y regenerando 20 de mana por golpe.
- **spear**: arma básica que hace 3 de daño con un delay de 250 milisegundos entre ataques, regenerando 15 de mana por golpe.

ARMAS A DISTANCIA:
- **iceStaff**: arma que lanza un proyectil de hielo infligiendo 10 de daño con un delay de 250 milisegundos entre proyectil, con un coste por ataque de 75 de mana. El proyectil tiene una caracteristica que es que cuando impacta con un enemigo este se fragmenta creando una zona en ese sitio que si pasan por encima les hace 4 de daño en el tiempo, esta zona tiene una duración de 5000 milisegundos.
- **magicKnife**: arma que lanza un total de 10 proyectiles por ataque con convergen en en el punto en el cual ha sido lanzado el ataque, cada proyectil hace 2 de daño y tiene un delay de 250 milisegundos entre ataques, costando cada ataque 50 de mana.
- **poisonStaff**: arma que dispara un proyectil donde ese proyectil hace 10 + 5  de daño en 2 segundos en el tiempo al enemigo impactado con un delay de 300 milisegundos entre ataques, costando 20 de mana cada ataque.
- **shotgun**: arma que dispara 15 proyectiles de la manera en la que se dispararian los perdigones de una escopeta (porque es una) haciendo 4 de daño por proyectil con un delay de 250 milisegundos entre ataques, costando cada ataque 35 de mana.
- **thompson**: arma que dispara proyectiles de manera muy rapida ya que tiene un delay de solo 50 milisegundos haciendo 5 de daño por proyectil, costando cada ataque 5 de mana.

## OBJETOS
Los objetos son, eso objetos, que no son armas y no puedes usarlos para atacar, tienen efectos pasivos y algunos los suelan los enemigos al morir otros estan en los cofres escondidos.
## Especificacion de los objetos
- **4-leafsClub:** objeto que incrementa la suerte del jugador en 10 puntos.
- **broom:** objeto que te multiplica tu velocidad de movimiento actual por 1.4 veces.
- **halfHeart:** objeto que al obtenerlo te cura 
por 1 unidad de vida.
- **heartAmulet:** objeto que incrementa tu vida maxima en 4 unidades de vida.
- **key:** objeto que sirve para poder abrir los cofres en el castillo, si ellas no se pueden abrir.
- **manaPotion:** objeto que al obtenerlo te regenera 50 de mana.
- **nowYouAreFat:** objeto que te disminuye la velocidad de movimiento en 30, y te aumenta la vida maxima en 4 y el mana maximo en 50.
- **shadowCloak:** objeto que te aumenta la velocidad de movimiento en 40.

## BOSSES
En el juego hay un jefe por zona a excepcion de la zona de la armeria por ser la introductoria, por lo tanto tenemos 2 bosses: **_Bellotini y Dahto_**.
### BELLOTINI, EL ARBOL MALVADO
Bellotini antes de nacer era un arbol milenario que protegia la vida de los jardines del castillo de nuestro protagonista, pero nació en el momento en el cual nuestro antagonista le lanzo un hechizo con el cual nació Bellotini listo para acabar con la vida de nuestro protagonista y amenazando la vida de los jardines que una vez protegio.
El boss cuenta con 3 ataques distintos, no se mueve y tiene 600 de vida.
Los ataques son estos: 
- Bellotini lanza sus bellotas contra el jugador haciendole daño de impacto si se da con ellas y destruyendose cuando impactan con el suelo y ademas estas bellotas tienen la probabilidad de tener un enemigo dentro de ellas asi que cuando se destruyen contra el suelo sale el enemigo que habia dentro de la bellota.
- Bellotini usa sus raices para sorprender al jugador atacandole con estas al jugador, emergiendo de la posicion en la que se encontraba el jugador para atacarle.
- Bellotini invoca con su poder una hilera de raices que se dirige hacia el jugador en varias oleadas.

### DAHTO, EL MAGO NEGRO
Nuestro antagonista, en un último intento de defender lo que había robado se corrompe usando su propia magia para ganar más poder, se convierte en Dahto; el mago negro.
El boss cuenta con 3 ataques distintos, se mueve y tiene 1000 de vida.
- En este ataque Dahto convoca el poder demoniaco para crear unos charcos de lava que te matan al contacto.
- Dahto carga energia demoniaca en el brazo izquierdo para embestir al jugador y mientras embiste libera la energia del brazo invocando a sus sudbitos.
- Dahto muestro su furia golpeando al suelo con sus puños y esos golpes crean pantallas de fuego que se mueven en distintas direcciones intentado dañar al jugador.

Estad atentos a los secretos, nunca se sabe que se puede ocultar a simple vista ;)



