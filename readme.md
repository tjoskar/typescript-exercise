# Exercice 1

Skapa en function som heter `add` i `util.ts`

Den ska ta två siffror som argument. Ange även att den ska returnera en siffra. Dvs. explicit typning. Du kan även låta typescript lista ut typen åt dig med implicit typning.

# Exercice 2

I `util.ts` finns följande funktion.

```ts
function padLeft(value: string, padding: any) {
  return Array(padding + 1).join(' ') + value
}
```

Detta är alltså en funktion som tar en sträng `value` och som sedan returnerar en ny sträng med mellanslag före (till väster om) strängen.

ex:

```js
padLeft('hej', 5) // '     hej'
```

Det är nu din uppgift att skriva om `padLeft` så att `padding` både kan vara en siffra och en sträng (och nej, det är inte tillåtet att ha kvar typen `any`).

Så att resultatet blir:

```js
padLeft('hej', 5) // '     hej'
padLeft('hej', 'då ') // 'då hej'
```

I `util.test.ts` finns det två test som kontrollerar just detta. Kör dessa med `npx jest`

Tips: Du kan använda `typeof` men testa att skapa en till funktion som heter `isString` och `isNumber` och använd `is`-keyword:et.

```ts
function isString(value: string | number): value is string {
```

# Exercice 3

Skriv om `padLeft` så att `padding` är optional. Och returnera `value` i så fall.

```ts
padLeft('hej') // 'hej'
```

Kom i håg att skriv ett test för det.

# Exercice 4

Låt oss skapa en kö (skapa en fil som heter `queue.ts` i `src`).

```ts
class Queue {
  data: any[] = []

  push(item) {
    this.data.push(item)
  }

  pop() {
    return this.data.shift()
  }
}

const queue = new Queue()

queue.push(0)
queue.push('1') // Oops a mistake

console.log(queue.pop().toPrecision(1))
console.log(queue.pop().toPrecision(1)) // 💥
```

Skriv om klassen så den enbart tar `number` som argument till push.

Glöm inte bort att skriva testfall

# Exercice 5

Men nu tar `Queue` enbart siffror. Det är inte bra. Skriv om den så den kan ta vilken datatyp som helst. Bara den är samma i klassen. Dvs. gör klassen generisk.

```ts
myNumberQueue.push(0)
myNumberQueue.push('1') // Type error

myStringQueue.push('0')
myStringQueue.push(1) // Type error

myNumberQueue instanceof Queue // true
myStringQueue instanceof Queue // true
```

# Exercice 6

Mycket bättre men vi kan fortfarande göra saker som `queue.data.reverse()`. Det är inget bra. Gör `data` private.

# Exercice 7

Som du märkte ovan behövde du ange typen vid initieringen. Det är för att typescript behöver veta på förhand vilken typ som du vill använda. Men i vissa fall kan typescript själv lista ut vilken typ som gäller.

Skapa an konstruktor till `Queue` som tar en array med den generiska typen som argument. Då behöver du inte lägre explicit ange typen på klassen.

```ts
const queue = new Queue([1, 2, 3])

queue.push(0)
queue.push('1') // Compile error
```

# Exercice 8

Man kan även göra funktioner generiska.

Låt oss säga att du har en array som du vill sortera, `[ 5, 2, 3, 1 ]`. Så du skapar en sorteringsfunktion som tar en array med `number` som argument.

```ts
function sort(arr: number[]): number[] {
  return arr.sort()
}
```

Men låt oss nu säga att du vill sortera `[ 'Oskar', 'Kjell', 'Karl', 'Emma', 'Stina', 'Måns' ]`. Det kommer du inte längre göra eftersom `sort` enbart accepterar siffror.

Skriv om `sort` så att den är generisk.

Kommentar:

Ibland vill man passera en funktion som argument, då kan man även typa denna så att argumenten blir typade. Låt mig visa ett exempel:

```ts
function myCoolFunction(fn: (a: number, b: string) => number): number {
  return fn(1, 'a')
}

function fn1(a: number, b: number) {
  return a + b
}

function fn2(a: number, b: string) {
  return a + b // This will return a string
}

function fn3(a: number, b: string) {
  return a + b.length
}

myCoolFunction(fn1) // Error
myCoolFunction(fn2) // Error
myCoolFunction(fn3) // OK

myCoolFunction((n, s) => {
  n.charCodeAt // Type error (`charCodeAt` finns inte på `number`)
  return n
})
```

# Exercice 9

Skapa en funktion som heter `generateProductName` som tar en produkt som argument:

```ts
function generateProductName(product) {
  return `${product.name} - ${product.category} - ${product.price} ${product.currency}`
}

const product = {
  name: 'Mjölk',
  category: 'mejeri',
  price: '10',
  currency: 'SEK',
  volym: '1l'
}

console.log(generateProductName(product))
```

Nice! Men vi har ingen typ på argumentet för `generateProductName` 😕

Vi kan börja med att skapa en temporär typ i funktionen:

```ts
generateProductName(product: { name: string, category: string, price: string, currency: string, volym: string }) {
```

Fast det är ju inte så snyggt 😕 kanske.

Testa att skapa ett interface istället:

```ts
interface Product {
```

Hur gick det?

Testa att skapa en type istället:

```ts
type Product = {
```

Bättre/sämre? – Ganska lika va?

Du kan även testa att skapa en typ ifrån ett statiskt object med hjälp av `typeof`

```ts
type Product = typeof product
```

Låt oss nu säga att vi vill skapa en till produkt:

```ts
const milk = {
  name: 'Mjölk',
  category: 'mejeri',
  price: '10',
  currency: 'SEK',
  volym: '1l'
}

const car = {
  name: 'Tesla 3',
  category: 'cars',
  price: '35000',
  currency: 'USD',
  electric: true
}

generateProductName(milk)
generateProductName(car)
```

Hum.. vi har nu både `milk` och `car` och båda ser väldigt snarlika ut, det är bara `volym` och `electric` som skiljer dem åt. Skapa ett bas interface som heter Product och sedan två sub interface som lägger till `volym` och `electric`.

Testa sedan att skapa en bas typ och sedan två under typer.

Om du undrar vad skillnaden mellan typer och interface är så kan jag rekommendera denna post: https://medium.com/@martin_hotell/interface-vs-type-alias-in-typescript-2-7-2a8f1777af4c

# Exercice 10

Låt oss kolla lite på enums.

```ts
enum Color {
  blue,
  red,
  yellow,
  black
}

console.log(Color.red)
```

Vad tror du att resultatet blir? Kolla!

# Exercice 11

Enums fungerar även som typer:

```ts
function paint(color: Color) {
  // code
}

paint(Color.blue) // 🎉
```

Dock finns ju inte `enum` i javascript så typescript måste ju kompilera ner detta till något annat eftersom enums kan användas i runtime. Vad kompileras det till? Tips, använd denna sida: https://www.typescriptlang.org/play/index.html

Vad händer som du skriver?

```ts
Color[Color.blue]
```

Och vilken av dessa anrop kompilerar och vilka gör det inte och varför? (tänk innan du testar)

```ts
paint(Color.blue)
paint(Color[Color.blue])
paint(Color)
paint('blue')
paint(1)
paint(10)
```

Kommentar: Ibland så vill man ett en property ska vara en stäng men kanske inte vilken stäng som helst. Ex.

```ts
type Product = {
  category: string
}

const product = {
  category: 'mejerisfdgfhgjhkjlk;l' // Ohno, typo... but it is okay by typescript
} as Product
```

Istället kan vi definiera vad `category` kan vara något:

```ts
type Category = 'mejeri' | 'cars' | 'some-other-category'

type Product = {
  category: Category
}

const product = {
  category: 'mejerisfdgfhgjhkjlk;l' // Type error
} as Product
```

# Exercice 12

Låt oss kolla på `typeof`.

Låt oss skapa ett databas-config-object:

```ts
const dbConfig = {
  database: 'mysql',
  user: 'my-user',
  password: 'my-password'
}
```

och låt oss nu skapa en funktion som tar databas-config som argument.

```ts
function connectToDb(config) {
  ...
}

connectToDb({ database: 'mysql', password: 'my-password' }) // Runtime error: user is missing
```

Det är inte bra, vi borde ha en typ på argumentet. Ett sätt är att skapa en type:

```ts
type DbConfig = {
  database: string
  user: string
  password: string
}

const dbConfig = {
  database: 'mysql',
  user: 'my-user',
  password: 'my-password',
} as DbConfig

function connectToDb(config: DbConfig) {
  ...
}

connectToDb({ database: 'mysql', password: 'my-password' }) // Compile error: user is missing 🙌
```

Detta fungerar fint men vad händer om vi vill lägga till en prop till på config. Då måste man ju även uppdatera typen 😔

Det finns dock glada nyheter! Vi kan använda `typeof`.

```ts
type DbConfig = typeof dbConfig

const dbConfig = {
  database: 'mysql',
  user: 'my-user',
  password: 'my-password',
}

function connectToDb(config: DbConfig) {
  ...
}

connectToDb({ database: 'mysql', password: 'my-password' }) // Compile error: user is missing 🙌
```

Mycket bättre! `typeof` är alltså väldigt användbar om du har ett statiskt object/funktion som du vill skapa en typ ifrån och det är vanligare än vad man kanske först tror.

Lek gärna runt lite med `typeof` för att se hur det fungerar. Testa att använda `typeof` för en funktion exempelvis.

Låt oss nu kolla på `keyof`. Detta keyword ger oss alla nycklar för en typ.

Låt oss säga att du vill skapa en function som tar en sträng som argument, men inte vilken sträng som helst. Utan du vill att funktionen enbart ska acceptera nycklarna från ett object. Låt mig visa ett exempel:

```ts
const config = {
  database: 'mysql',
  developMode: false,
  domain: 'something.io',
  logPath: '/dev/null'
}

function getConfigByKey(key: string) {
  return config[key]
}

getConfigByKey('database') // 'mysql'
getConfigByKey('developmode') // undefined 😱
```

Detta är inte bra. Det är enkelt att råka skriva fel och vi kan inte heller få någon hjälp av kompilatorn.

Här kan vi använda `keyof`.

```ts
type Config = typeof config
type ConfigKeys = keyof Config

// or
type ConfigKeys = keyof typeof config
```

Detta ger oss en typ som innehåller alla strängar som motsvarar alla nycklar i objektet `config`, dvs: `'database' | 'developMode' | 'domain' | 'logPath'`. Detta gör att vi kan skriva om vår kod ovan till:

```ts
const config = {
  database: 'mysql',
  developMode: false,
  domain: 'something.io',
  logPath: '/dev/null'
}

type ConfigKeys = keyof typeof config

function getConfigByKey(key: ConfigKeys) {
  return config[key]
}

getConfigByKey('database') // 'mysql'
getConfigByKey('developmode') // compile error 🙌
```

Vi kan även använda `keyof` för att bygga upp typer:

```ts
type Readonly<T> = { readonly [P in keyof T]: T[P] }
```

Nu kanske du tänker: WTF?

Lugn, låt oss gå igenom det, steg för steg.

Först så säger vi att `Readonly` är generisk. Dvs, vi kan använda `Readonly` med en annan typ. Sedan så säger vi att `Readonly` är en typ som har properties som är samma sak som nyckeln på typen som du ger till `Readonly`. Ex.

```ts
type Stringify<T> = { [P in keyof T]: string }

type Config = {
  database: string
  developMode: boolean
}

type MyStringifyConfig = Stringify<Config>

// MyStringifyConfig is the same as

type MyStringifyConfig = {
  database: string
  developMode: string
}
```

Om vi använder `T[P]` så kan vi säga att alla properties ska behålla sin typ:

```ts
type KeepTheType<T> = { [P in keyof T]: T[P] }

type Config = {
  database: string
  developMode: boolean
}

type Config2 = KeepTheType<Config>

// Config2 is the same as Config
```

men om vi nu lägger till `readonly` så säger vi att alla props ska vara readonly men behålla sina typer:

```ts
type Readonly<T> = { readonly [P in keyof T]: T[P] }

type Config = {
  database: string
  developMode: boolean
}

const myConfig = {
  database: 'mysql',
  developMode: false
} as Readonly<Config>

myConfig.database = 'mongo' // Error

function connect(config: Readonly<Config>) {
  config.database = '' // Error
}
```

Eftersom `Readonly` är ganska användbar så finns den redan globalt så den behöver man inte återskapa. Samma sak gäller några andra typer, så som: `Partial`, `Record` och `Pick`

### Partial

```ts
type Config = {
  database: string
  developMode: boolean
}

type PartialConfig = Partial<Config>

const config = {
  database: ''
} as Config // Error: 'developMode' is missing

const config = {
  database: ''
} as PartialConfig // OK

// PartialConfig is the same as:

type PartialConfig = {
  database?: string
  developMode?: boolean
}
```

### Record

Record skapar ett enkel `Record` av key value

```ts
type Configs = Record<string, Config>

const configs = {
  develop: {
    database: 'mysql'
    host: 'localhost'
  },
  production: {
    database: 'mysql'
    host: 'some-remote-host.io'
  }
} as Configs
```

### Pick

```ts
type DatabaseConfig = Pick<Config, 'database'>

function connect(databaseConfig: DatabaseConfig) {
  databaseConfig.database // OK
  databaseConfig.host // Type error
}
```

Kolla på denna funktion (den finns i util.ts):

```ts
function value(obj, ...keys) {
  return keys.map(key => obj[key])
}
```

Den funktion tar ett object som argument och en lista med nycklar och sedan returnerar värdet baserat på dessa nycklar:

```ts
value({ a: 1, b: 2 }, 'a') // [ 1 ]
value({ a: 1, b: 2 }, 'a', 'b') // [ 1, 2 ]
value({ a: 1, b: 2 }, 'a', 'c') // [ 1, undefined ] 😕
```

Jag vill att du skapar en typ för funktionen `value`. Så att:

```ts
value({ a: 1, b: 2 }, 'a') // OK
value({ a: 1, b: 2 }, 'a', 'c') // Error
value({ a: 1, c: 2 }, 'a', 'c') // OK
```

# Exercice 13

Följande funktion finns i `util.js`

```ts
function mapObject(obj, fn) {
  const newObj = {}
  Object.entries(obj).map(([key, value]) => (newObj[key] = fn(value)))
  return newObj
}
```

Detta gör att man exempelvis kan:

```ts
mapObject({ a: 'Hej Hej', b: 'Katten musen' }, v => v.length) // { a: 7, b: 12 }
mapObject({ a: 5, b: 1 }, v => v.toExponential()) // { a: 5e+0, 1e+0 }
```

Skapa typer för `mapObject` så att följande resultat nås:

```ts
mapObject({ a: 'Hej Hej', b: 'Katten musen' }, v => v.length) // { a: 7, b: 12 }
mapObject({ a: 'Hej Hej', b: 'Katten musen' }, v => v.toExponential()) // Compilation error
mapObject({ a: 5, b: 1 }, v => v.toExponential()) // { a: 5e+0, 1e+0 }
mapObject({ a: 5, b: 1 }, v => v.length) // Compilation error
```
