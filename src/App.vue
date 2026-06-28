<script setup>
import { ref } from 'vue'

// 1. Eine reaktive Variable erstellen (Startwert ist 0 
const counter = ref(0)

// 2. Eine Funktion erstellen, die den Zähler um 1 erhöht
function increaseCounter() {
  counter.value++
}

// 3. Eine Funktion erstellen, die den Zähler um 1 herunterzählt
function decreaseCounter() {
  counter.value--
}

// NEU: Ein Array (eine Liste) mit deinen lieblings Programiersprachen
const languages = ref ([
  {id: 1, name: 'HTML & CSS'},
  {id: 2, name: 'JavaScript'},
  {id: 3, name: 'Vue 3'},
])

</script>

<template>
  <main>
  <h1>Mein erster Vue 3 Baustein</h1>

  <!-- Text-Interpolation: Zeigt den aktuellen Wert derVariable an -->
   <p>Aktuelle Klicks {{ counter }}</p>

   <!-- Ein Event-Klick: Löst die Funktion aus -->
    <button @click="increaseCounter">Plus (+)</button>

    <!-- Ein Event-Klick: Löst die Funktion aus -->
     <button @click="decreaseCounter">Minus (-)</button>

     <!-- Hierr startet das WENN/DANN Prinzip -->

     <div class="message-container">

      <!-- Wenn der Zähler größer oder gleich 5 ist -->
       <p v-if="counter >= 5" class="warning">
        Achtung: Du hast 5 oder mehr Klicks erreicht!
       </p>

       <!-- Wenn der Zähler kleiner 0 ist -->
        <p v-else-if="counter < 0" class="warning">
          Du bist im minus Bereich!
        </p>

       <!-- Wenn die obere Bedingung NICHT zutrifft -->
        <p v-else class="info">
          Alles im grünen Bereich. Klicke weiter!
        </p>

        <!-- Hier startet die Schleife -->
         <div class="list-container">
          <h2>Meine Tech-Stack Liste:</h2>
          <ul>
            <!-- Für 'jedes' lang in der Liste 'languages' erstelle ein <li> -->
            <li v-for="lang in languages" :key="lang.id">
              {{ lang.name }}
            </li>
          </ul>
         </div>

     </div>

  </main>
</template>

<style scoped>
main { font-family: sans-serif; text-align: center; margin-top: 5%; }
h1 { color: #42b883; }
p { font-size: 1.5rem; }
button { padding: 10px 20px; margin: 5px; font-size: 1rem; background-color: #42b883; color: white; border: none; border-radius: 5px; cursor: pointer; }
.message-container {margin-top: 30px; height: 50px;}
.warning {color: red; font-weight: bold;}
.info {color: #666; font-style: italic;}

/* Styles für die neue Liste */
.list-container {margin-top: 40px; text-align: left; display: inline-block;}
ul {list-style: none; padding: 0;}
li {font-size: 1.2rem; padding: 5px 0; color: #2c3e50;}
</style>
