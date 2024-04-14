# How Do It

Usa este modulo para desplegar modales de ayuda o información dentro de tu aplicación de React

## Uso
Importa el Provider y luego envuelve tu appliacación en él
<code> import { HowDoitProvider } from 'how-do-it'</code>

<code>
const contentObj = {
  key: &lt;div>&lt;!-- Aqui el contenido -->&lt;/div>
}
</code>


<code>
&lt;HowDoitProvider content={contentObj}>
  // aquí va la app
  &lt;div data-howdoit="key">

  &lt;/div>
&lt;/HowDoitProvider>
</code>

## Código
![image](https://github.com/zenx5/how-do-it/assets/26119733/8ebd8ae7-965d-49d1-9926-8435648a30cb)

## Despliegue
![image](https://github.com/zenx5/how-do-it/assets/26119733/5461bc94-4a24-40ab-9ed7-37360bb8485d)
