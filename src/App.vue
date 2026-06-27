<script setup>
import { ref } from 'vue'

// 1. Eine reaktive Variable erstellen (Startwert ist 0 
const counter = ref(0)

// 2. Eine Funktion erstellen, die den Zähler um 1 erhöht
function increaseCounter() {
  counter.value = counter.value + 1
}

// 3. Eine Funktion erstellen, die den Zähler um 1 herunterzählt

function decreaseCounter() {
  counter.value = counter.value -1
}

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
</style>
