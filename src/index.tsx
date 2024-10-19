import  { html,Html } from "@elysiajs/html";
import { Elysia } from "elysia";

let counter = 0;

const CounterButtonComponent = ({url, target, icon}) => {
  return <button class={'p-5 rounded bg-gray-300'}
                  hx-target={target}
                  hx-swap={'outerHTML'}
                  hx-post={url}>
                    {icon}
        </button>
}

const CounterComponenet = ({counter}) => {
  return <div id={'counter'}
              class={counter > 0 ? 'bg-green-200':'bg-red-200'}
  >{counter}</div>

}

const app = new Elysia()
.use(html())
.get("/", () => (
  <html lang="en">
  <head>
      <title>DAT - Andon</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <script src="https://unpkg.com/htmx.org@2.0.3" integrity="sha384-0895/pl2MU10Hqc6jd4RvrthNlDiE9U1tWmX7WRESftEDRosgxNsQG/Ze9YMRzHq" crossorigin="anonymous"></script>
  </head>
  <body>
    <div class={'container mx-auto'}>
    <h1 class="text-3xl font-bold underline">HTMX Counter</h1>

    <div class={'mt-10 gap-5 flex items-center'}>
      <CounterButtonComponent url={'/dec'} target={'#counter'} icon={'-'}></CounterButtonComponent>
      <CounterComponenet counter={counter}/>
      <CounterButtonComponent url={'/inc'} target={'#counter'} icon={'+'}></CounterButtonComponent>
    </div>
    </div>

  </body>
</html>
))
.post('/dec',() =>{
  counter = counter - 1
  return <CounterComponenet counter={counter}/>
})
.post('/inc',() =>{
  counter = counter + 1
  return <CounterComponenet counter={counter}/>
})
.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
